const { randomBytes, randomUUID } = require("node:crypto");

const CHARACTER_COUNT = 17;
const MODES = new Set(["solo", "squad", "x1"]);

function createMatchmaker(io, options = {}) {
    const waitMs = options.waitMs ?? 15_000;
    const maxPlayers = options.maxPlayers ?? 10;
    const totalPlayers = options.totalPlayers ?? 50;
    const setTimer = options.setTimeout ?? setTimeout;
    const clearTimer = options.clearTimeout ?? clearTimeout;
    const waitingRooms = new Map();
    const activeRooms = new Map();
    const roomsById = new Map();
    const socketRooms = new Map();

    function status(room) {
        io.to(room.id).emit("matchmaking:waiting", {
            roomId: room.id,
            mode: room.mode,
            count: room.members.length,
            maxPlayers: room.mode === "x1" ? 2 : maxPlayers,
            remainingMs: room.mode === "x1" ? null : Math.max(0, room.deadline - Date.now())
        });
    }

    function cleanupWaitingRoom(room) {
        if (room.timer) clearTimer(room.timer);
        const key = `${room.mode}:${room.scene}`;
        if (waitingRooms.get(key) === room) waitingRooms.delete(key);
        if (!room.started) roomsById.delete(room.id);
    }

    function startRoom(room) {
        if (room.started || room.members.length === 0) return;
        if (room.mode === "x1" && room.members.length < 2) return;
        room.started = true;
        cleanupWaitingRoom(room);
        activeRooms.set(room.id, room);

        const players = room.members.map((member, slot) => {
            member.slot = slot;
            member.hp = 100;
            member.alive = true;
            member.state = {
                x: Math.cos(slot * 2.4) * 35,
                y: 0,
                z: Math.sin(slot * 2.4) * 35,
                yaw: 0,
                pitch: 0,
                tf: false
            };
            return {
                id: member.id,
                slot,
                name: `Lutador ${slot + 1}`,
                character: member.character,
                x: member.state.x,
                y: member.state.y,
                z: member.state.z
            };
        });
        room.hostId = room.members[0].id;
        const roomTotalPlayers = room.mode === "x1" ? 2 : totalPlayers;
        room.botSlots = Array.from({ length: roomTotalPlayers }, (_, slot) => slot)
            .filter(slot => !room.members.some(member => member.slot === slot));
        room.bots = new Map(room.botSlots.map(slot => [slot, {
            slot,
            hp: 100,
            alive: true,
            state: { x: 0, y: 0, z: 0, yaw: 0, tf: false }
        }]));
        const seed = randomBytes(4).readUInt32LE(0);

        for (const member of room.members) {
            member.socket.emit("matchmaking:started", {
                roomId: room.id,
                playerId: member.id,
                hostId: room.hostId,
                mode: room.mode,
                scene: room.scene,
                seed,
                totalPlayers: roomTotalPlayers,
                players
            });
        }
    }

    function changeHost(room) {
        if (room.hostId && room.members.some(member =>
            member.id === room.hostId && member.alive && !member.left && member.socket.connected)) return;
        const host = room.members.find(member => member.alive && !member.left && member.socket.connected);
        room.hostId = host ? host.id : null;
        if (host) io.to(room.id).emit("room:host", { hostId: host.id });
    }

    function leave(socket, reason = "cancelled") {
        const roomId = socketRooms.get(socket.id);
        const room = roomId && roomsById.get(roomId);
        if (!room) return;

        socketRooms.delete(socket.id);
        socket.leave(room.id);
        const member = room.members.find(item => item.id === socket.id);
        if (member) member.left = true;

        if (room.started) {
            if (member) member.alive = false;
            io.to(room.id).emit("player:left", { playerId: socket.id, reason });
            changeHost(room);
            if (room.members.every(item => item.left || !item.socket.connected)) {
                activeRooms.delete(room.id);
                roomsById.delete(room.id);
                for (const item of room.members) socketRooms.delete(item.id);
            }
            return;
        }

        room.members = room.members.filter(item => item.id !== socket.id);
        if (room.members.length === 0) {
            cleanupWaitingRoom(room);
        } else {
            status(room);
        }
    }

    function join(socket, data, acknowledge) {
        if (socketRooms.has(socket.id)) {
            acknowledge?.({ ok: false, error: "Você já está em uma fila ou partida." });
            return;
        }
        const mode = data?.mode;
        const scene = Number(data?.scene);
        const character = Number(data?.character);
        if (!MODES.has(mode) || !Number.isInteger(scene) || scene < 0 || scene > 3 ||
            !Number.isInteger(character) || character < 0 || character >= CHARACTER_COUNT) {
            acknowledge?.({ ok: false, error: "Configuração de partida inválida." });
            return;
        }

        const roomMaxPlayers = mode === "x1" ? 2 : maxPlayers;
        const key = `${mode}:${scene}`;
        let room = waitingRooms.get(key);
        if (!room || room.started || room.members.length >= roomMaxPlayers) {
            room = {
                id: randomUUID(),
                mode,
                scene,
                members: [],
                started: false,
                deadline: mode === "x1" ? null : Date.now() + waitMs,
                timer: null
            };
            if (mode !== "x1") room.timer = setTimer(() => startRoom(room), waitMs);
            waitingRooms.set(key, room);
            roomsById.set(room.id, room);
        }

        const member = { id: socket.id, socket, character, hp: 100, alive: true };
        room.members.push(member);
        socketRooms.set(socket.id, room.id);
        socket.join(room.id);
        acknowledge?.({ ok: true, roomId: room.id });
        status(room);
        if (room.members.length >= roomMaxPlayers) startRoom(room);
    }

    function state(socket, payload) {
        const roomId = socketRooms.get(socket.id);
        const room = roomId && activeRooms.get(roomId);
        if (!room || !room.started) return;
        const member = room.members.find(item => item.id === socket.id && item.alive);
        if (!member || Date.now() - (member.lastStateAt || 0) < 30) return;
        const values = [payload?.x, payload?.y, payload?.z, payload?.yaw, payload?.pitch];
        if (!values.every(Number.isFinite)) return;

        member.lastStateAt = Date.now();
        member.state = {
            x: Math.max(-220, Math.min(220, payload.x)),
            y: Math.max(-35, Math.min(50, payload.y)),
            z: Math.max(-220, Math.min(220, payload.z)),
            yaw: Math.max(-Math.PI * 2, Math.min(Math.PI * 2, payload.yaw)),
            pitch: Math.max(-1, Math.min(1, payload.pitch)),
            tf: payload.tf === true
        };
        socket.to(room.id).emit("player:state", { playerId: socket.id, state: member.state });
    }

    function botStates(socket, payload) {
        const roomId = socketRooms.get(socket.id);
        const room = roomId && activeRooms.get(roomId);
        if (!room || !room.started || room.hostId !== socket.id ||
            !Array.isArray(payload?.bots) || payload.bots.length > totalPlayers) return;
        const now = Date.now();
        if (now - (room.lastBotStateAt || 0) < 70) return;
        room.lastBotStateAt = now;

        for (const item of payload.bots) {
            const bot = room.bots.get(item?.slot);
            const values = [item?.x, item?.y, item?.z, item?.yaw];
            if (!bot || !bot.alive || !values.every(Number.isFinite)) continue;
            bot.state = {
                x: Math.max(-220, Math.min(220, item.x)),
                y: Math.max(-35, Math.min(50, item.y)),
                z: Math.max(-220, Math.min(220, item.z)),
                yaw: Math.max(-Math.PI * 2, Math.min(Math.PI * 2, item.yaw)),
                tf: item.tf === true
            };
        }

        socket.to(room.id).emit("bots:state", Array.from(room.bots.values(), bot => ({
            slot: bot.slot,
            ...bot.state,
            hp: bot.hp,
            alive: bot.alive
        })));
    }

    function botHit(socket, payload) {
        const roomId = socketRooms.get(socket.id);
        const room = roomId && activeRooms.get(roomId);
        if (!room || !room.started) return;
        const attacker = room.members.find(member => member.id === socket.id && member.alive);
        const bot = room.bots.get(payload?.slot);
        const source = payload?.sourceBotSlot == null ? null : room.bots.get(payload.sourceBotSlot);
        if (!attacker || !bot || !bot.alive) return;
        if (source && (socket.id !== room.hostId || !source.alive)) return;
        if (payload?.sourceBotSlot != null && !source) return;

        const from = source ? source.state : attacker.state;
        if (Math.hypot(from.x - bot.state.x, from.y - bot.state.y, from.z - bot.state.z) > 100) return;
        if (source && room.mode === "squad" && Math.floor(source.slot / 5) === Math.floor(bot.slot / 5)) return;

        const rawDamage = Number(payload.damage);
        if (!Number.isFinite(rawDamage) || rawDamage <= 0) return;
        const damage = Math.max(1, Math.min(75, rawDamage));
        bot.hp = Math.max(0, bot.hp - damage);
        bot.alive = bot.hp > 0;
        io.to(room.id).emit("bot:health", {
            slot: bot.slot,
            hp: bot.hp,
            alive: bot.alive,
            attackerId: source ? `bot:${source.slot}` : attacker.id,
            damage
        });
    }

    function botHitPlayer(socket, payload) {
        const roomId = socketRooms.get(socket.id);
        const room = roomId && activeRooms.get(roomId);
        if (!room || !room.started || room.hostId !== socket.id) return;
        const target = room.members.find(member => member.id === payload?.targetId && member.alive);
        const source = room.bots.get(payload?.sourceBotSlot);
        if (!target || !source || !source.alive) return;
        if (room.mode === "squad" && Math.floor(source.slot / 5) === Math.floor(target.slot / 5)) return;
        if (Math.hypot(source.state.x - target.state.x, source.state.y - target.state.y, source.state.z - target.state.z) > 100) return;

        const rawDamage = Number(payload.damage);
        if (!Number.isFinite(rawDamage) || rawDamage <= 0) return;
        const damage = Math.max(1, Math.min(75, rawDamage));
        target.hp = Math.max(0, target.hp - damage);
        target.alive = target.hp > 0;
        changeHost(room);
        io.to(room.id).emit("combat:state", {
            playerId: target.id,
            hp: target.hp,
            alive: target.alive,
            attackerId: `bot:${source.slot}`,
            damage
        });
    }

    function eliminateBot(socket, payload) {
        const roomId = socketRooms.get(socket.id);
        const room = roomId && activeRooms.get(roomId);
        const bot = room?.bots.get(payload?.slot);
        if (!room || !room.started || room.hostId !== socket.id || !bot || !bot.alive) return;
        bot.hp = 0;
        bot.alive = false;
        io.to(room.id).emit("bot:health", {
            slot: bot.slot,
            hp: 0,
            alive: false,
            attackerId: payload?.attackerId || null,
            damage: 0
        });
    }

    function hit(socket, payload) {
        const roomId = socketRooms.get(socket.id);
        const room = roomId && activeRooms.get(roomId);
        if (!room || !room.started) return;
        const attacker = room.members.find(item => item.id === socket.id && item.alive);
        const target = room.members.find(item => item.id === payload?.targetId && item.alive);
        if (!attacker || !target || attacker === target) return;
        if (room.mode === "squad" && Math.floor(attacker.slot / 5) === Math.floor(target.slot / 5)) return;

        const now = Date.now();
        attacker.hitTimes = (attacker.hitTimes || []).filter(time => now - time < 1000);
        if (attacker.hitTimes.length >= 20) return;
        const a = attacker.state;
        const b = target.state;
        if (Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) > 100) return;

        const rawDamage = Number(payload.damage);
        if (!Number.isFinite(rawDamage) || rawDamage <= 0) return;
        const damage = Math.max(1, Math.min(75, rawDamage));
        attacker.hitTimes.push(now);
        target.hp = Math.max(0, target.hp - damage);
        target.alive = target.hp > 0;
        changeHost(room);
        io.to(room.id).emit("combat:state", {
            playerId: target.id,
            hp: target.hp,
            alive: target.alive,
            attackerId: attacker.id,
            damage
        });
    }

    function eliminate(socket) {
        const roomId = socketRooms.get(socket.id);
        const room = roomId && activeRooms.get(roomId);
        const member = room && room.members.find(item => item.id === socket.id && item.alive);
        if (!member) return;
        member.alive = false;
        member.hp = 0;
        changeHost(room);
        io.to(room.id).emit("player:eliminated", { playerId: member.id });
    }

    function attach(socket) {
        socket.on("matchmaking:join", (data, acknowledge) => join(socket, data, acknowledge));
        socket.on("matchmaking:cancel", () => leave(socket));
        socket.on("room:leave", () => leave(socket, "left"));
        socket.on("player:state", payload => state(socket, payload));
        socket.on("bots:state", payload => botStates(socket, payload));
        socket.on("combat:hit", payload => hit(socket, payload));
        socket.on("bot:hit", payload => botHit(socket, payload));
        socket.on("bot:playerHit", payload => botHitPlayer(socket, payload));
        socket.on("bot:eliminated", payload => eliminateBot(socket, payload));
        socket.on("player:eliminated", () => eliminate(socket));
        socket.on("disconnect", () => leave(socket, "disconnected"));
    }

    return { attach, startRoom, waitingRooms, activeRooms };
}

module.exports = { createMatchmaker };
