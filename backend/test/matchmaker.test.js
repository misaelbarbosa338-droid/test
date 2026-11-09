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
    assert.equal(matchmaker.waitingRooms.has("squad:0"), true);
});

test("starts full rooms at ten real players and puts the next player in a new room", () => {
    const { connect, matchmaker } = harness();
    const sockets = Array.from({ length: 11 }, (_, i) => connect(`player-${i}`));
    const started = [];
    for (const socket of sockets) socket.on("matchmaking:started", data => started.push(data));
    sockets.forEach(socket => queue(socket));

    assert.equal(started.length, 10);
    assert.equal(started[0].players.length, 10);
    assert.equal(started[0].totalPlayers, 50);
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

test("rejects invalid matchmaking options", () => {
    const { connect } = harness();
    const socket = connect("bad");
    assert.deepEqual(queue(socket, { scene: 9 }), {
        ok: false,
        error: "Configuração de partida inválida."
    });
});
