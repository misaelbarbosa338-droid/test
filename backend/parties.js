"use strict";

const { randomUUID } = require("node:crypto");

const PROFILE_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const CHARACTER_COUNT = 18;
const FORM_COUNT = 4;
const SQUAD_SIZE = 4;

function validSelection(data) {
    const character = Number(data?.character);
    const form = data?.form == null ? 0 : Number(data.form);
    if (!Number.isInteger(character) || character < 0 || character >= CHARACTER_COUNT ||
        !Number.isInteger(form) || form < 0 || form >= FORM_COUNT) return null;
    return { character, form };
}

function createPartyService({ friends, matchmaker }) {
    const parties = new Map();
    const partyByProfile = new Map();
    const invitationsByProfile = new Map();

    function profileName(profileId) {
        return friends.getProfileName(profileId) || "Jogador";
    }

    function sendState(profileId) {
        const partyId = partyByProfile.get(profileId);
        const party = partyId && parties.get(partyId);
        const invitations = [...(invitationsByProfile.get(profileId) || [])]
            .map(([leaderId, invitedPartyId]) => {
                const invitingParty = parties.get(invitedPartyId);
                return invitingParty && {
                    leaderId,
                    leaderName: profileName(leaderId),
                    memberCount: invitingParty.members.length,
                    scene: invitingParty.scene
                };
            })
            .filter(Boolean);
        const currentParty = party ? {
            id: party.id,
            leaderId: party.leaderId,
            scene: party.scene,
            allReady: party.members.length >= 2 && party.members.every(member => member.ready),
            members: party.members.map(member => ({
                profileId: member.profileId,
                name: profileName(member.profileId),
                character: member.character,
                form: member.form,
                ready: member.ready,
                online: friends.getOnlineSockets(member.profileId).length > 0,
                isLeader: member.profileId === party.leaderId
            })),
            pending: party.leaderId === profileId
                ? [...party.pending].map(id => ({ profileId: id, name: profileName(id) }))
                : [],
            isLeader: party.leaderId === profileId
        } : null;
        const state = { party: currentParty, invitations };
        for (const socket of friends.getOnlineSockets(profileId)) socket.emit("party:state", state);
    }

    function refreshParty(party) {
        for (const member of party.members) sendState(member.profileId);
        for (const profileId of party.pending) sendState(profileId);
    }

    function clearInvitation(targetId, leaderId, invitedPartyId) {
        const invitations = invitationsByProfile.get(targetId);
        if (invitations?.get(leaderId) !== invitedPartyId) return false;
        invitations.delete(leaderId);
        if (invitations.size === 0) invitationsByProfile.delete(targetId);
        parties.get(invitedPartyId)?.pending.delete(targetId);
        sendState(targetId);
        return true;
    }

    function clearPartyInvitations(party) {
        for (const targetId of [...party.pending]) clearInvitation(targetId, party.leaderId, party.id);
        party.pending.clear();
    }

    function findPartyFor(socket, acknowledge) {
        const profileId = friends.getProfileId(socket);
        const partyId = profileId && partyByProfile.get(profileId);
        const party = partyId && parties.get(partyId);
        if (!party) {
            acknowledge?.({ ok: false, error: "Você não está em um esquadrão." });
            return null;
        }
        return { profileId, party };
    }

    function invite(socket, data, acknowledge) {
        const leaderId = friends.getProfileId(socket);
        const targetId = typeof data?.profileId === "string" ? data.profileId.toLowerCase() : "";
        const selection = validSelection(data);
        const scene = Number(data?.scene);
        if (!leaderId || !PROFILE_ID_RE.test(targetId) || !selection ||
            !Number.isInteger(scene) || scene < 0 || scene > 3) {
            acknowledge?.({ ok: false, error: "Convite para esquadrão inválido." });
            return;
        }
        if (leaderId === targetId || !friends.areFriends(leaderId, targetId)) {
            acknowledge?.({ ok: false, error: "Só é possível convidar um parceiro adicionado." });
            return;
        }
        if (friends.getOnlineSockets(targetId).length === 0) {
            acknowledge?.({ ok: false, error: "Esse parceiro não está online." });
            return;
        }
        if (partyByProfile.has(targetId)) {
            acknowledge?.({ ok: false, error: "Esse parceiro já está em um esquadrão." });
            return;
        }

        let partyId = partyByProfile.get(leaderId);
        let party = partyId && parties.get(partyId);
        if (party && party.leaderId !== leaderId) {
            acknowledge?.({ ok: false, error: "Somente o líder pode convidar jogadores." });
            return;
        }
        if (party && (party.pending.has(targetId) || party.members.some(member => member.profileId === targetId))) {
            acknowledge?.({ ok: false, error: "Esse parceiro já foi convidado." });
            return;
        }
        if (party && party.members.length + party.pending.size >= SQUAD_SIZE) {
            acknowledge?.({ ok: false, error: "O esquadrão já está com quatro jogadores." });
            return;
        }

        if (!party) {
            party = {
                id: randomUUID(),
                leaderId,
                scene,
                status: "lobby",
                members: [{ profileId: leaderId, ...selection, ready: false }],
                pending: new Set()
            };
            parties.set(party.id, party);
            partyByProfile.set(leaderId, party.id);
        }
        party.pending.add(targetId);
        if (!invitationsByProfile.has(targetId)) invitationsByProfile.set(targetId, new Map());
        invitationsByProfile.get(targetId).set(leaderId, party.id);

        acknowledge?.({ ok: true, partyId: party.id });
        refreshParty(party);
    }

    function respond(socket, data, acknowledge) {
        const profileId = friends.getProfileId(socket);
        const leaderId = typeof data?.leaderId === "string" ? data.leaderId.toLowerCase() : "";
        const invitedPartyId = invitationsByProfile.get(profileId)?.get(leaderId);
        const party = invitedPartyId && parties.get(invitedPartyId);
        if (!profileId || !PROFILE_ID_RE.test(leaderId) || !party || !party.pending.has(profileId)) {
            acknowledge?.({ ok: false, error: "Esse convite para esquadrão não está mais disponível." });
            return;
        }
        if (typeof data.accept !== "boolean") {
            acknowledge?.({ ok: false, error: "Resposta ao convite inválida." });
            return;
        }
        if (data.accept === true) {
            const selection = validSelection(data);
            if (!selection || party.members.length >= SQUAD_SIZE || partyByProfile.has(profileId) ||
                friends.getOnlineSockets(profileId).length === 0 || !friends.areFriends(leaderId, profileId)) {
                acknowledge?.({ ok: false, error: "Não foi possível entrar nesse esquadrão." });
                return;
            }
            party.members.push({ profileId, ...selection, ready: false });
            partyByProfile.set(profileId, party.id);
            clearInvitation(profileId, leaderId, party.id);
            respondToInvitations(profileId);
            acknowledge?.({ ok: true, accepted: true });
            refreshParty(party);
            return;
        }

        clearInvitation(profileId, leaderId, party.id);
        acknowledge?.({ ok: true, accepted: false });
        refreshParty(party);
    }

    function ready(socket, data, acknowledge) {
        const context = findPartyFor(socket, acknowledge);
        if (!context) return;
        const member = context.party.members.find(item => item.profileId === context.profileId);
        const selection = validSelection(data);
        if (!selection || typeof data?.ready !== "boolean") {
            acknowledge?.({ ok: false, error: "Prontidão ou personagem inválido." });
            return;
        }
        if (member.character !== selection.character || member.form !== selection.form) {
            member.ready = false;
            Object.assign(member, selection);
        }
        member.ready = data.ready;
        acknowledge?.({ ok: true });
        refreshParty(context.party);
    }

    function selection(socket, data) {
        const profileId = friends.getProfileId(socket);
        const partyId = profileId && partyByProfile.get(profileId);
        const party = partyId && parties.get(partyId);
        const member = party && party.members.find(item => item.profileId === profileId);
        const selected = validSelection(data);
        if (!member || !selected) return;
        if (member.character !== selected.character || member.form !== selected.form) {
            member.ready = false;
            Object.assign(member, selected);
            refreshParty(party);
        }
    }

    function updateSettings(socket, data, acknowledge) {
        const context = findPartyFor(socket, acknowledge);
        if (!context) return;
        if (context.party.leaderId !== context.profileId) {
            acknowledge?.({ ok: false, error: "Somente o líder pode mudar o cenário." });
            return;
        }
        const scene = Number(data?.scene);
        if (!Number.isInteger(scene) || scene < 0 || scene > 3) {
            acknowledge?.({ ok: false, error: "Cenário inválido para o esquadrão." });
            return;
        }
        if (context.party.scene !== scene) {
            context.party.scene = scene;
            for (const member of context.party.members) member.ready = false;
        }
        acknowledge?.({ ok: true });
        refreshParty(context.party);
    }

    function leaveParty(profileId) {
        const partyId = partyByProfile.get(profileId);
        const party = partyId && parties.get(partyId);
        if (!party) return;
        party.members = party.members.filter(member => member.profileId !== profileId);
        partyByProfile.delete(profileId);
        if (party.members.length === 0) {
            clearPartyInvitations(party);
            parties.delete(party.id);
            sendState(profileId);
            return;
        }
        if (party.leaderId === profileId) {
            clearPartyInvitations(party);
            party.leaderId = party.members[0].profileId;
        }
        for (const member of party.members) member.ready = false;
        sendState(profileId);
        refreshParty(party);
    }

    function respondToInvitations(profileId) {
        const invitations = invitationsByProfile.get(profileId);
        if (!invitations) return;
        for (const [leaderId, partyId] of [...invitations]) {
            clearInvitation(profileId, leaderId, partyId);
            const party = parties.get(partyId);
            if (party) refreshParty(party);
        }
    }

    function start(socket, acknowledge) {
        const context = findPartyFor(socket, acknowledge);
        if (!context) return;
        const { profileId, party } = context;
        if (party.leaderId !== profileId || party.members.length < 2 ||
            party.members.length > SQUAD_SIZE || !party.members.every(member => member.ready)) {
            acknowledge?.({ ok: false, error: "Todos os integrantes precisam estar prontos antes de iniciar." });
            return;
        }
        const members = [];
        for (const member of party.members) {
            const playerSocket = friends.getOnlineSockets(member.profileId)[0];
            if (!playerSocket) {
                acknowledge?.({ ok: false, error: "Todos os integrantes precisam estar online." });
                return;
            }
            members.push({
                socket: playerSocket,
                profileId: member.profileId,
                name: profileName(member.profileId),
                character: member.character,
                form: member.form
            });
        }

        const result = matchmaker.joinParty(members, { mode: "squad", scene: party.scene });
        if (!result.ok) {
            acknowledge?.(result);
            return;
        }

        // o esquadrão continua formado durante a busca e depois da partida
        party.status = "queued";
        clearPartyInvitations(party);
        for (const member of party.members) member.ready = false;
        refreshParty(party);
        acknowledge?.({ ok: true, roomId: result.roomId });
    }

    function attach(socket) {
        socket.on("friends:register", () => {
            setImmediate(() => {
                const profileId = friends.getProfileId(socket);
                if (profileId) sendState(profileId);
            });
        });
        socket.on("party:invite", (data, acknowledge) => invite(socket, data, acknowledge));
        socket.on("party:respond", (data, acknowledge) => respond(socket, data, acknowledge));
        socket.on("party:ready", (data, acknowledge) => ready(socket, data, acknowledge));
        socket.on("party:selection", data => selection(socket, data));
        socket.on("party:update-settings", (data, acknowledge) => updateSettings(socket, data, acknowledge));
        socket.on("party:leave", () => {
            const profileId = friends.getProfileId(socket);
            if (profileId) leaveParty(profileId);
        });
        socket.on("party:start", acknowledge => start(socket, acknowledge));
        socket.on("disconnect", () => {
            const profileId = friends.getProfileId(socket);
            if (!profileId) return;
            if (friends.getOnlineSockets(profileId).length <= 1) leaveParty(profileId);
            respondToInvitations(profileId);
        });
    }

    return { attach };
}

module.exports = { createPartyService };
