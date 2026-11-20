"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { promisify } = require("node:util");
const {
    createHash, randomBytes, randomUUID, scrypt, timingSafeEqual
} = require("node:crypto");

const scryptAsync = promisify(scrypt);
const MAX_NAME_LENGTH = 10;
const MAX_TOKENS_PER_ACCOUNT = 20;
const MAX_FAILURES = 5;
const LOCK_MS = 60 * 1000;
const FAILURE_WINDOW_MS = 15 * 60 * 1000;

function normalizeName(value) {
    return typeof value === "string"
        ? value.replace(/[\u0000-\u001f\u007f<>]/g, "").trim().replace(/\s+/g, " ")
        : "";
}

function nameKey(name) {
    return name.toLocaleLowerCase();
}

function hashToken(token) {
    return createHash("sha256").update(token).digest("hex");
}

function safeEqual(first, second) {
    const a = Buffer.from(first, "hex");
    const b = Buffer.from(second, "hex");
    return a.length === b.length && timingSafeEqual(a, b);
}

function readAccounts(filePath) {
    let data;
    try {
        data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
        if (error.code === "ENOENT") return new Map();
        throw error;
    }
    if (!data || data.version !== 1 || !data.accounts ||
        typeof data.accounts !== "object" || Array.isArray(data.accounts)) {
        throw new Error("O arquivo de contas está inválido.");
    }
    return new Map(Object.entries(data.accounts).map(([key, account]) => {
        if (!account || typeof account.name !== "string" || typeof account.profileId !== "string" ||
            typeof account.salt !== "string" || typeof account.hash !== "string" ||
            !Array.isArray(account.tokens)) {
            throw new Error(`Conta inválida no arquivo de contas: ${key}.`);
        }
        return [key, account];
    }));
}

function createAccountService(options = {}) {
    const filePath = path.resolve(options.storePath || process.env.ACCOUNTS_STORE_PATH ||
        path.join(__dirname, "data", "accounts.json"));
    const accounts = readAccounts(filePath);
    const accountsByProfile = new Map([...accounts.values()].map(account => [account.profileId, account]));
    const failures = new Map();

    function persist() {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        const temporaryPath = `${filePath}.${process.pid}.${randomUUID()}.tmp`;
        const contents = JSON.stringify({ version: 1, accounts: Object.fromEntries(accounts) });
        try {
            fs.writeFileSync(temporaryPath, contents, { encoding: "utf8", flag: "wx" });
            fs.renameSync(temporaryPath, filePath);
        } catch (error) {
            try {
                fs.unlinkSync(temporaryPath);
            } catch (cleanupError) {
                if (cleanupError.code !== "ENOENT") {
                    console.error("Não foi possível limpar o arquivo temporário de contas.", cleanupError);
                }
            }
            throw error;
        }
    }

    async function hashPassword(password, salt) {
        return (await scryptAsync(password, Buffer.from(salt, "hex"), 64)).toString("hex");
    }

    function issueToken(account) {
        const token = randomBytes(32).toString("hex");
        account.tokens = [...account.tokens, hashToken(token)].slice(-MAX_TOKENS_PER_ACCOUNT);
        return token;
    }

    function session(account, token) {
        return { ok: true, profileId: account.profileId, name: account.name, token };
    }

    function lockedFor(key) {
        const entry = failures.get(key);
        if (!entry) return 0;
        const now = Date.now();
        if (now - entry.first > FAILURE_WINDOW_MS && now >= entry.lockedUntil) {
            failures.delete(key);
            return 0;
        }
        return Math.max(0, entry.lockedUntil - now);
    }

    function recordFailure(key) {
        const now = Date.now();
        const entry = failures.get(key) || { count: 0, first: now, lockedUntil: 0 };
        entry.count += 1;
        if (entry.count >= MAX_FAILURES) {
            entry.lockedUntil = now + LOCK_MS;
            entry.count = 0;
            entry.first = now;
        }
        failures.set(key, entry);
    }

    async function register(data) {
        const name = normalizeName(data?.name);
        const password = data?.password;
        if (!name) return { ok: false, error: "Digite um apelido." };
        if ([...name].length > MAX_NAME_LENGTH) {
            return { ok: false, error: `O apelido pode ter no máximo ${MAX_NAME_LENGTH} caracteres.` };
        }
        if (typeof password !== "string" || password.length === 0) {
            return { ok: false, error: "Digite uma senha." };
        }
        const key = nameKey(name);
        if (accounts.has(key)) return { ok: false, error: "Esse apelido já está em uso." };

        const salt = randomBytes(16).toString("hex");
        const hash = await hashPassword(password, salt);
        if (accounts.has(key)) return { ok: false, error: "Esse apelido já está em uso." };

        const account = { name, profileId: randomUUID(), salt, hash, tokens: [] };
        const token = issueToken(account);
        accounts.set(key, account);
        try {
            persist();
        } catch (error) {
            accounts.delete(key);
            console.error("Não foi possível salvar a conta.", error);
            return { ok: false, error: "Não foi possível criar a conta no servidor." };
        }
        accountsByProfile.set(account.profileId, account);
        return session(account, token);
    }

    async function login(data, source = "") {
        const name = normalizeName(data?.name);
        const password = data?.password;
        if (!name || typeof password !== "string" || password.length === 0) {
            return { ok: false, error: "Digite o apelido e a senha." };
        }
        const key = nameKey(name);
        const failureKey = `${source}|${key}`;
        const waitMs = lockedFor(failureKey);
        if (waitMs > 0) {
            return { ok: false, error: `Muitas tentativas. Aguarde ${Math.ceil(waitMs / 1000)}s e tente novamente.` };
        }

        const account = accounts.get(key);
        const salt = account ? account.salt : "00".repeat(16);
        const hash = await hashPassword(password, salt);
        if (!account || !safeEqual(hash, account.hash)) {
            recordFailure(failureKey);
            return { ok: false, error: "Apelido ou senha incorretos." };
        }

        failures.delete(failureKey);
        const previousTokens = account.tokens;
        const token = issueToken(account);
        try {
            persist();
        } catch (error) {
            account.tokens = previousTokens;
            console.error("Não foi possível salvar a sessão.", error);
            return { ok: false, error: "Não foi possível entrar agora. Tente novamente." };
        }
        return session(account, token);
    }

    function verifyToken(profileId, token) {
        const account = typeof profileId === "string" ? accountsByProfile.get(profileId.toLowerCase()) : null;
        if (!account || typeof token !== "string" || token.length === 0) return null;
        const hashed = hashToken(token);
        return account.tokens.some(stored => safeEqual(stored, hashed)) ? { name: account.name } : null;
    }

    return { register, login, verifyToken };
}

module.exports = { createAccountService, MAX_NAME_LENGTH };
