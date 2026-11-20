const test = require("node:test");
const assert = require("node:assert/strict");
const { EventEmitter } = require("node:events");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { createAccountService } = require("../accounts");
const { createFriendService } = require("../friends");

function temporaryDirectory(t) {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "dbr3-accounts-"));
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    return directory;
}

test("creates one account per nickname, enforces the 10 character limit and accepts any password length", async t => {
    const accounts = createAccountService({ storePath: path.join(temporaryDirectory(t), "accounts.json") });
    const longPassword = "senha com espaços ".repeat(2000);

    const created = await accounts.register({ name: "  Goku  ", password: longPassword });
    assert.equal(created.ok, true);
    assert.equal(created.name, "Goku");
    assert.match(created.profileId, /^[0-9a-f-]{36}$/);

    assert.equal((await accounts.register({ name: "goku", password: "outra" })).ok, false);
    assert.equal((await accounts.register({ name: "12345678901", password: "x" })).ok, false);
    assert.equal((await accounts.register({ name: "1234567890", password: "x" })).ok, true);
    assert.equal((await accounts.register({ name: "Vegeta", password: "" })).ok, false);

    const other = await accounts.login({ name: "GOKU", password: longPassword });
    assert.equal(other.ok, true);
    assert.equal(other.profileId, created.profileId);
    assert.notEqual(other.token, created.token);
    assert.equal((await accounts.login({ name: "Goku", password: longPassword.slice(1) })).ok, false);
});

test("keeps accounts after a restart and only accepts valid session tokens", async t => {
    const storePath = path.join(temporaryDirectory(t), "accounts.json");
    const first = createAccountService({ storePath });
    const created = await first.register({ name: "Broly", password: "lendario" });

    const restarted = createAccountService({ storePath });
    assert.deepEqual(restarted.verifyToken(created.profileId, created.token), { name: "Broly" });
    assert.equal(restarted.verifyToken(created.profileId, "token-falso"), null);
    assert.equal(restarted.verifyToken("0ce2c775-4a2d-44a5-b363-455a54c55719", created.token), null);
    assert.equal((await restarted.login({ name: "Broly", password: "lendario" })).profileId, created.profileId);
    assert.equal(fs.readFileSync(storePath, "utf8").includes("lendario"), false);
});

test("temporarily blocks repeated wrong passwords", async t => {
    const accounts = createAccountService({ storePath: path.join(temporaryDirectory(t), "accounts.json") });
    await accounts.register({ name: "Jiren", password: "forte" });

    for (let attempt = 0; attempt < 5; attempt++) {
        assert.equal((await accounts.login({ name: "Jiren", password: "errada" }, "ip")).ok, false);
    }
    const blocked = await accounts.login({ name: "Jiren", password: "forte" }, "ip");
    assert.equal(blocked.ok, false);
    assert.match(blocked.error, /Aguarde/);
    assert.equal((await accounts.login({ name: "Jiren", password: "forte" }, "outro-ip")).ok, true);
});

test("friend profiles require a valid account token and use the account nickname", async t => {
    const directory = temporaryDirectory(t);
    const accounts = createAccountService({ storePath: path.join(directory, "accounts.json") });
    const friends = createFriendService({ storePath: path.join(directory, "friends.json"), accounts });
    const created = await accounts.register({ name: "Freeza", password: "imperador" });

    const socket = new EventEmitter();
    socket.id = "socket-1";
    friends.attach(socket);
    const register = data => {
        let response;
        socket.emit("friends:register", data, result => { response = result; });
        return response;
    };

    const rejected = register({ profileId: created.profileId, name: "Falso" });
    assert.equal(rejected.ok, false);
    assert.equal(rejected.code, "auth");

    const accepted = register({ profileId: created.profileId, name: "Falso", token: created.token });
    assert.equal(accepted.ok, true);
    assert.equal(accepted.name, "Freeza");
    assert.equal(friends.getProfileName(created.profileId), "Freeza");
});
