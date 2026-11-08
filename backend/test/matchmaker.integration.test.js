const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const { Server } = require("socket.io");
const { io: connect } = require("socket.io-client");
const { createMatchmaker } = require("../matchmaker");

test("real Socket.IO clients join the same room and receive live combat updates", { timeout: 5000 }, async t => {
    const server = http.createServer();
    const io = new Server(server);
    const matchmaker = createMatchmaker(io, { waitMs: 150 });
    io.on("connection", socket => matchmaker.attach(socket));
    await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    const url = `http://127.0.0.1:${address.port}`;
    const first = connect(url, { reconnection: false });
    const second = connect(url, { reconnection: false });
    t.after(async () => {
        first.close();
        second.close();
        await new Promise(resolve => io.close(resolve));
    });

    await Promise.all([
        new Promise((resolve, reject) => {
            first.once("connect", resolve);
            first.once("connect_error", reject);
        }),
        new Promise((resolve, reject) => {
            second.once("connect", resolve);
            second.once("connect_error", reject);
        })
    ]);

    const started = Promise.all([
        new Promise(resolve => first.once("matchmaking:started", resolve)),
        new Promise(resolve => second.once("matchmaking:started", resolve))
    ]);
    const options = { mode: "solo", scene: 0, character: 0 };
    first.emit("matchmaking:join", options);
    second.emit("matchmaking:join", options);
    const [firstMatch, secondMatch] = await started;

    assert.equal(firstMatch.roomId, secondMatch.roomId);
    assert.equal(firstMatch.players.length, 2);
    assert.equal(firstMatch.totalPlayers, 50);

    const receivedPosition = new Promise(resolve => second.once("player:state", resolve));
    first.emit("player:state", { x: 0, y: 0, z: 0, yaw: 0, pitch: 0, tf: false });
    assert.equal((await receivedPosition).playerId, first.id);

    const receivedDamage = new Promise(resolve => second.once("combat:state", resolve));
    first.emit("combat:hit", { targetId: second.id, damage: 20 });
    const damage = await receivedDamage;
    assert.equal(damage.hp, 80);
    assert.equal(damage.attackerId, first.id);
});
