"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

const PROFILE_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function sanitizeName(value) {
    const name = typeof value === "string"
        ? value.replace(/[\u0000-\u001f\u007f<>]/g, "").trim().replace(/\s+/g, " ").slice(0, 24)
        : "";
    return name || "Jogador";
}

function validIdList(value, field, profileId) {
    if (!Array.isArray(value) || value.some(id => typeof id !== "string" || !PROFILE_ID_RE.test(id))) {
        throw new Error(`Lista ${field} inválida para o perfil ${profileId}.`);
    }
    return [...new Set(value.map(id => id.toLowerCase()))];
}

function readProfiles(filePath) {
    let data;
    try {
        data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
        if (error.code === "ENOENT") return new Map();
        throw error;
    }

    if (!data || data.version !== 1 || !data.profiles ||
        typeof data.profiles !== "object" || Array.isArray(data.profiles)) {
        throw new Error("O arquivo de parceiros está inválido.");
    }

    return new Map(Object.entries(data.profiles).map(([id, profile]) => {
        if (!PROFILE_ID_RE.test(id) || !profile || typeof profile !== "object" ||
            typeof profile.name !== "string") {
            throw new Error(`Perfil inválido no arquivo de parceiros: ${id}.`);
        }
        return [id.toLowerCase(), {
            name: sanitizeName(profile.name),
            friends: validIdList(profile.friends, "parceiros", id),
            incoming: validIdList(profile.incoming, "convites", id)
        }];
    }));
}

function cloneProfiles(profiles) {
    return new Map([...profiles].map(([id, profile]) => [id, {
        name: profile.name,
        friends: [...profile.friends],
        incoming: [...profile.incoming]
    }]));
}

function createFriendService(options = {}) {
    const filePath = path.resolve(options.storePath || process.env.FRIENDS_STORE_PATH ||
        path.join(__dirname, "data", "friends.json"));
    const accounts = options.accounts || null;
    let profiles = readProfiles(filePath);
    const socketsByProfile = new Map();
    const profileBySocket = new Map();

    function persist(nextProfiles) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        const temporaryPath = `${filePath}.${process.pid}.${randomUUID()}.tmp`;
        const contents = JSON.stringify({
            version: 1,
            profiles: Object.fromEntries(nextProfiles)
        });
        try {
            fs.writeFileSync(temporaryPath, contents, { encoding: "utf8", flag: "wx" });
            fs.renameSync(temporaryPath, filePath);
        } catch (error) {
            try {
                fs.unlinkSync(temporaryPath);
            } catch (cleanupError) {
                if (cleanupError.code !== "ENOENT") {
                    console.error("Não foi possível limpar o arquivo temporário de parceiros.", cleanupError);
                }
            }
            throw error;
        }
    }

    function commit(change) {
        const nextProfiles = cloneProfiles(profiles);
        const result = change(nextProfiles);
        persist(nextProfiles);
        profiles = nextProfiles;
        return result;
    }

    function sendState(profileId) {
        const profile = profiles.get(profileId);
        if (!profile) return;
        const partners = profile.friends
            .map(id => profiles.get(id) && ({
                profileId: id,
                name: profiles.get(id).name,
                online: socketsByProfile.has(id)
            }))
            .filter(Boolean)
            .sort((a, b) => a.name.localeCompare(b.name));
        const incoming = profile.incoming
            .map(id => profiles.get(id) && ({
                profileId: id,
                name: profiles.get(id).name
            }))
            .filter(Boolean);
        const outgoing = [...profiles]
            .filter(([, candidate]) => candidate.incoming.includes(profileId))
            .map(([id]) => id);
        const state = { friends: partners, incoming, outgoing };
        for (const socket of socketsByProfile.get(profileId) || []) {
            socket.emit("friends:state", state);
        }
    }

    function refreshStates(profileIds) {
        for (const profileId of new Set(profileIds)) sendState(profileId);
    }

    function acknowledgeError(acknowledge, message, error, code) {
        if (error) console.error(message, error);
        acknowledge?.(code ? { ok: false, error: message, code } : { ok: false, error: message });
    }

    function register(socket, data, acknowledge) {
        const requestedId = typeof data?.profileId === "string" ? data.profileId.toLowerCase() : "";
        let name = sanitizeName(data?.name);
        if (!PROFILE_ID_RE.test(requestedId)) {
            acknowledgeError(acknowledge, "ID de perfil inválido.");
            return;
        }
        if (accounts) {
            const account = accounts.verifyToken(requestedId, data?.token);
            if (!account) {
                acknowledgeError(acknowledge, "Sessão expirada. Entre na sua conta novamente.", null, "auth");
                return;
            }
            name = account.name;
        }

        const currentId = profileBySocket.get(socket.id);
        const profileId = requestedId;

        try {
            commit(nextProfiles => {
                const current = nextProfiles.get(profileId) || { name, friends: [], incoming: [] };
                nextProfiles.set(profileId, { ...current, name });
            });
        } catch (error) {
            acknowledgeError(acknowledge, "Não foi possível salvar o perfil no servidor.", error);
            return;
        }

        if (currentId && currentId !== profileId) {
            const previousSockets = socketsByProfile.get(currentId);
            previousSockets?.delete(socket);
            if (previousSockets?.size === 0) socketsByProfile.delete(currentId);
        }
        profileBySocket.set(socket.id, profileId);
        if (!socketsByProfile.has(profileId)) socketsByProfile.set(profileId, new Set());
        socketsByProfile.get(profileId).add(socket);

        acknowledge?.({ ok: true, profileId, name });
        refreshStates([profileId, ...profiles.get(profileId).friends]);
    }

    function search(socket, data, acknowledge) {
        const profileId = profileBySocket.get(socket.id);
        const profile = profileId && profiles.get(profileId);
        if (!profile) {
            acknowledgeError(acknowledge, "Conecte seu perfil antes de buscar parceiros.");
            return;
        }
        const query = typeof data?.query === "string" ? data.query.trim().slice(0, 100) : "";
        if (!query) {
            acknowledge?.({ ok: true, results: [] });
            return;
        }
        const normalizedQuery = query.toLocaleLowerCase();
        const results = [...profiles]
            .filter(([id, candidate]) => id !== profileId &&
                (id.includes(normalizedQuery) || candidate.name.toLocaleLowerCase().includes(normalizedQuery)))
            .map(([id, candidate]) => ({
                profileId: id,
                name: candidate.name,
                online: socketsByProfile.has(id),
                isFriend: profile.friends.includes(id),
                outgoingPending: candidate.incoming.includes(profileId),
                incomingPending: profile.incoming.includes(id)
            }))
            .sort((a, b) => Number(b.online) - Number(a.online) || a.name.localeCompare(b.name))
            .slice(0, 10);
        acknowledge?.({ ok: true, results });
    }

    function invite(socket, data, acknowledge) {
        const profileId = profileBySocket.get(socket.id);
        const targetId = typeof data?.profileId === "string" ? data.profileId.toLowerCase() : "";
        if (!profileId || !PROFILE_ID_RE.test(targetId) || !profiles.has(targetId)) {
            acknowledgeError(acknowledge, "Esse jogador não foi encontrado no jogo.");
            return;
        }
        if (profileId === targetId) {
            acknowledgeError(acknowledge, "Você não pode adicionar seu próprio perfil.");
            return;
        }
        const sender = profiles.get(profileId);
        const target = profiles.get(targetId);
        if (sender.friends.includes(targetId)) {
            acknowledgeError(acknowledge, "Esse jogador já está na sua lista de parceiros.");
            return;
        }
        if (target.incoming.includes(profileId)) {
            acknowledge?.({ ok: true, status: "pending" });
            return;
        }
        if (sender.incoming.includes(targetId)) {
            acknowledge?.({ ok: true, status: "incoming" });
            return;
        }

        try {
            commit(nextProfiles => {
                const recipient = nextProfiles.get(targetId);
                recipient.incoming.push(profileId);
            });
        } catch (error) {
            acknowledgeError(acknowledge, "Não foi possível salvar o convite.", error);
            return;
        }

        acknowledge?.({ ok: true, status: "pending" });
        refreshStates([profileId, targetId]);
    }

    function respond(socket, data, acknowledge) {
        const profileId = profileBySocket.get(socket.id);
        const senderId = typeof data?.profileId === "string" ? data.profileId.toLowerCase() : "";
        const accept = data?.accept === true;
        const profile = profileId && profiles.get(profileId);
        if (!profile || !PROFILE_ID_RE.test(senderId) || !profile.incoming.includes(senderId)) {
            acknowledgeError(acknowledge, "Esse convite não está mais disponível.");
            return;
        }

        try {
            commit(nextProfiles => {
                const recipient = nextProfiles.get(profileId);
                recipient.incoming = recipient.incoming.filter(id => id !== senderId);
                if (accept) {
                    const sender = nextProfiles.get(senderId);
                    recipient.friends = [...new Set([...recipient.friends, senderId])];
                    sender.friends = [...new Set([...sender.friends, profileId])];
                }
            });
        } catch (error) {
            acknowledgeError(acknowledge, "Não foi possível salvar sua resposta ao convite.", error);
            return;
        }

        acknowledge?.({ ok: true, accepted: accept });
        refreshStates([profileId, senderId]);
    }

    function disconnect(socket) {
        const profileId = profileBySocket.get(socket.id);
        if (!profileId) return;
        profileBySocket.delete(socket.id);
        const sockets = socketsByProfile.get(profileId);
        sockets?.delete(socket);
        if (sockets?.size === 0) {
            socketsByProfile.delete(profileId);
            refreshStates(profiles.get(profileId)?.friends || []);
        }
    }

    function attach(socket) {
        socket.on("friends:register", (data, acknowledge) => register(socket, data, acknowledge));
        socket.on("friends:search", (data, acknowledge) => search(socket, data, acknowledge));
        socket.on("friends:invite", (data, acknowledge) => invite(socket, data, acknowledge));
        socket.on("friends:respond", (data, acknowledge) => respond(socket, data, acknowledge));
        socket.on("disconnect", () => disconnect(socket));
    }

    function getProfileId(socket) {
        return profileBySocket.get(socket.id) || null;
    }

    function getProfileName(profileId) {
        return profiles.get(profileId)?.name || null;
    }

    function getOnlineSockets(profileId) {
        return [...(socketsByProfile.get(profileId) || [])];
    }

    function areFriends(firstId, secondId) {
        return profiles.get(firstId)?.friends.includes(secondId) === true;
    }

    return { attach, getProfileId, getProfileName, getOnlineSockets, areFriends };
}

module.exports = { createFriendService };
