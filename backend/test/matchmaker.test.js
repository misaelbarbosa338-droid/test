const test = require("node:test");
const assert = require("node:assert/strict");
const { EventEmitter } = require("node:events");
const { createMatchmaker } = require("../matchmaker");

class FakeSocket extends EventEmitter {
    constructor(id, io) {
        super();
        this.id = id;
        this.io = io;
        this.rooms = new Set();
        this.connected = true;
    }

    join(room) {
        this.rooms.add(room);
    }

    leave(room) {
        this.rooms.delete(room);
    }

    to(room) {
        return this.io.to(room).except(this.id);
    }
}

class FakeIO {
    constructor() {
        this.sockets = new Map();
    }

    add(socket) {
        this.sockets.set(socket.id, socket);
    }

    to(room) {
        let excluded = null;
        return {
            except(id) {
                excluded = id;
                return this;
            },
            emit: (event, data) => {
                for (const socket of this.sockets.values()) {
                    if (socket.id !== excluded && socket.rooms.has(room)) socket.emit(event, data);
                }
            }
        };
    }
}

function harness(options = {}) {
    const io = new FakeIO();
    const timers = [];
    const matchmaker = createMatchmaker(io, {
        setTimeout(callback, ms) {
            const timer = { callback, ms, cleared: false };
            timers.push(timer);
            return timer;
        },
        clearTimeout(timer) {
            timer.cleared = true;
        },
        ...options
    });

    function connect(id) {
        const socket = new FakeSocket(id, io);
        io.add(socket);
        matchmaker.attach(socket);
        return socket;
    }

    return { connect, matchmaker, timers };
}

function queue(socket, data = {}) {
    let response;
    socket.emit("matchmaking:join", {
        mode: "solo",
        scene: 0,
        character: 0,
        form: 0,
        ...data
    }, result => {
        response = result;
    });
    return response;
}

test("keeps independent queues and starts a room with its roster after the timer", () => {
    const { connect, matchmaker, timers } = harness();
    const first = connect("first");
    const second = connect("second");
    const third = connect("third");
    let firstMatch;
    let secondMatch;
    first.on("matchmaking:started", data => { firstMatch = data; });
    second.on("matchmaking:started", data => { secondMatch = data; });

    queue(first);
    queue(second);
    queue(third, { mode: "squad" });

    assert.equal(timers[0].ms, 15_000);
    assert.equal(matchmaker.waitingRooms.size, 2);
    const room = matchmaker.waitingRooms.get("solo:0");
    matchmaker.startRoom(room);

    assert.equal(firstMatch.roomId, secondMatch.roomId);
    assert.equal(firstMatch.players.length, 2);
    assert.equal(firstMatch.players[0].slot, 0);
    assert.equal(firstMatch.players[1].slot, 1);
    assert.equal(firstMatch.totalPlayers, 50);
    assert.equal(room.botSlots.length, 48);
    assert.equal(firstMatch.players.length + room.botSlots.length, 50);
    assert.equal(matchmaker.waitingRooms.has("squad:0"), true);
});

test("accepts the Black, Guardiã and Chablau character indexes in matchmaking", () => {
    const { connect, matchmaker } = harness();
    queue(connect("black"), { character: 15 });
    queue(connect("guardian"), { character: 16 });
    queue(connect("chablau"), { character: 17 });
    const room = matchmaker.waitingRooms.get("solo:0");

    matchmaker.startRoom(room);

    assert.deepEqual(room.members.map(member => member.character), [15, 16, 17]);
});

test("starts full rooms at thirty real players and puts the next player in a new room", () => {
    const { connect, matchmaker } = harness();
    const sockets = Array.from({ length: 31 }, (_, i) => connect(`player-${i}`));
    const started = [];
    for (const socket of sockets) socket.on("matchmaking:started", data => started.push(data));
    sockets.forEach(socket => queue(socket));

    assert.equal(started.length, 30);
    assert.equal(started[0].players.length, 30);
    assert.equal(started[0].totalPlayers, 50);
    assert.equal(matchmaker.activeRooms.get(started[0].roomId).botSlots.length, 20);
    assert.equal(matchmaker.waitingRooms.get("solo:0").members.length, 1);
});

test("x1 waits for two real players and starts without bots", () => {
    const { connect, matchmaker, timers } = harness();
    const first = connect("first");
    const second = connect("second");
    const third = connect("third");
    let firstMatch;
    let secondMatch;
    first.on("matchmaking:started", data => { firstMatch = data; });
    second.on("matchmaking:started", data => { secondMatch = data; });

    queue(first, { mode: "x1" });
    const room = matchmaker.waitingRooms.get("x1:0");
    assert.equal(room.members.length, 1);
    assert.equal(room.started, false);
    assert.equal(timers.length, 0);
    matchmaker.startRoom(room);
    assert.equal(firstMatch, undefined);

    queue(second, { mode: "x1" });
    assert.equal(firstMatch.roomId, secondMatch.roomId);
    assert.equal(firstMatch.players.length, 2);
    assert.equal(firstMatch.totalPlayers, 2);
    assert.deepEqual(room.botSlots, []);
    assert.equal(room.bots.size, 0);

    queue(third, { mode: "x1" });
    assert.equal(matchmaker.waitingRooms.get("x1:0").members.length, 1);
});

test("cancelling matchmaking removes only that player from the waiting room", () => {
    const { connect, matchmaker } = harness();
    const first = connect("first");
    const second = connect("second");
    let secondMatch;
    second.on("matchmaking:started", data => { secondMatch = data; });
    queue(first);
    queue(second);

    first.emit("matchmaking:cancel");
    const room = matchmaker.waitingRooms.get("solo:0");
    assert.equal(room.members.length, 1);
    assert.equal(first.rooms.has(room.id), false);
    assert.equal(second.rooms.has(room.id), true);

    matchmaker.startRoom(room);
    assert.equal(secondMatch.players.length, 1);
});

test("relays player positions and applies bounded damage to opponents", () => {
    const { connect, matchmaker } = harness();
    const attacker = connect("attacker");
    const target = connect("target");
    let targetHealth;
    target.on("combat:state", data => { targetHealth = data; });
    queue(attacker);
    queue(target);
    matchmaker.startRoom(matchmaker.waitingRooms.get("solo:0"));

    attacker.emit("player:state", { x: 0, y: 0, z: 0, yaw: 0, pitch: 0, tf: false });
    target.emit("player:state", { x: 10, y: 0, z: 0, yaw: 0, pitch: 0, tf: false });
    attacker.emit("combat:hit", { targetId: "target", damage: 20 });

    assert.equal(targetHealth.playerId, "target");
    assert.equal(targetHealth.hp, 80);
    assert.equal(targetHealth.damage, 20);
});

test("allows a dead player to respawn at the original position during the first 50 seconds", () => {
    const { connect, matchmaker } = harness();
    const player = connect("player");
    const opponent = connect("opponent");
    let respawned;
    player.on("player:respawned", data => { respawned = data; });
    queue(player);
    queue(opponent);
    const room = matchmaker.waitingRooms.get("solo:0");
    matchmaker.startRoom(room);
    player.emit("player:eliminated");

    let response;
    player.emit("player:respawn", result => { response = result; });

    assert.deepEqual(response, { ok: true });
    assert.equal(respawned.playerId, "player");
    assert.equal(respawned.hp, 100);
    assert.deepEqual(respawned.state, room.members[0].spawnState);
    assert.equal(room.members[0].alive, true);
});

test("rejects respawn after the first 50 seconds", () => {
    const { connect, matchmaker } = harness();
    const player = connect("player");
    const opponent = connect("opponent");
    queue(player);
    queue(opponent);
    const room = matchmaker.waitingRooms.get("solo:0");
    matchmaker.startRoom(room);
    player.emit("player:eliminated");
    room.respawnUntil = Date.now() - 1;

    let response;
    player.emit("player:respawn", result => { response = result; });

    assert.equal(response.ok, false);
    assert.equal(room.members[0].alive, false);
});

test("syncs host bot positions and validates bot damage from room players", () => {
    const { connect, matchmaker } = harness();
    const host = connect("host");
    const attacker = connect("attacker");
    let botHealth;
    attacker.on("bot:health", data => { botHealth = data; });
    queue(host);
    queue(attacker);
    matchmaker.startRoom(matchmaker.waitingRooms.get("solo:0"));

    host.emit("player:state", { x: 0, y: 0, z: 0, yaw: 0, pitch: 0, tf: false });
    attacker.emit("player:state", { x: 5, y: 0, z: 0, yaw: 0, pitch: 0, tf: false });
    host.emit("bots:state", {
        bots: [{ slot: 2, x: 1, y: 0, z: 0, yaw: 0, tf: false }]
    });
    attacker.emit("bot:hit", { slot: 2, damage: 30 });

    assert.equal(botHealth.slot, 2);
    assert.equal(botHealth.hp, 70);
    assert.equal(botHealth.attackerId, "attacker");
});

test("relays player shots and special beams only to active room opponents", () => {
    const { connect, matchmaker } = harness();
    const attacker = connect("attacker");
    const target = connect("target");
    let receivedShot;
    let receivedBeam;
    target.removeAllListeners("combat:shot");
    target.removeAllListeners("combat:beam");
    target.on("combat:shot", data => { receivedShot = data; });
    target.on("combat:beam", data => { receivedBeam = data; });
    queue(attacker);
    queue(target);
    matchmaker.startRoom(matchmaker.waitingRooms.get("solo:0"));

    const shot = {
        x: 1, y: 2, z: 3, vx: 0, vy: 0, vz: -50,
        style: "orb", scale: [0.5, 0.5, 0.5], color: 0xff8800, lifetime: 1.2
    };
    attacker.emit("combat:shot", shot);
    assert.deepEqual(receivedShot, { playerId: "attacker", ...shot });

    attacker.emit("combat:shot", { ...shot, style: "knife" });
    assert.deepEqual(receivedShot, { playerId: "attacker", ...shot, style: "knife" });

    attacker.emit("combat:shot", { ...shot, style: "arrow" });
    assert.deepEqual(receivedShot, { playerId: "attacker", ...shot, style: "arrow" });

    attacker.emit("combat:shot", { ...shot, style: "invalid" });
    assert.deepEqual(receivedShot, { playerId: "attacker", ...shot, style: "arrow" });

    const beam = {
        x: 1, y: 2, z: 3, dx: 0, dy: 0, dz: -1,
        length: 90, width: 7, duration: 0.9, color: 0x55aaff
    };
    attacker.emit("combat:beam", beam);
    assert.deepEqual(receivedBeam, { playerId: "attacker", ...beam });
});

test("broadcasts the White meteor and protects its caster during the cutscene", () => {
    const { connect, matchmaker } = harness();
    const attacker = connect("attacker");
    const white = connect("white");
    let receivedMeteor;
    let health;
    white.on("combat:state", data => { health = data; });
    attacker.on("combat:meteor", data => { receivedMeteor = data; });
    queue(attacker);
    queue(white, { character: 2 });
    const room = matchmaker.waitingRooms.get("solo:0");
    matchmaker.startRoom(room);

    white.emit("combat:meteor", { targetX: 12, targetZ: -8 });
    attacker.emit("combat:hit", { targetId: "white", damage: 30 });

    assert.equal(receivedMeteor.playerId, "white");
    assert.equal(receivedMeteor.targetX, 12);
    assert.equal(receivedMeteor.targetZ, -8);
    assert.equal(room.members[1].hp, 100);
    assert.equal(health, undefined);
});

test("rejects meteor casts from other characters and out-of-range targets", () => {
    const { connect, matchmaker } = harness();
    const player = connect("player");
    const white = connect("white");
    let meteorCount = 0;
    white.on("combat:meteor", () => { meteorCount++; });
    queue(player);
    queue(white, { character: 2 });
    const room = matchmaker.waitingRooms.get("solo:0");
    matchmaker.startRoom(room);

    player.emit("combat:meteor", { targetX: 1, targetZ: 1 });
    white.emit("combat:meteor", { targetX: 150, targetZ: 0 });

    assert.equal(meteorCount, 0);
    assert.equal(room.members[0].meteorCooldownUntil, undefined);
});

test("rejects invalid matchmaking options", () => {
    const { connect } = harness();
    const socket = connect("bad");
    assert.deepEqual(queue(socket, { scene: 9 }), {
        ok: false,
        error: "Configuração de partida inválida."
    });
    assert.deepEqual(queue(connect("bad-character"), { character: 18 }), {
        ok: false,
        error: "Configuração de partida inválida."
    });
    assert.deepEqual(queue(connect("bad-form"), { form: 4 }), {
        ok: false,
        error: "Configuração de partida inválida."
    });
});
