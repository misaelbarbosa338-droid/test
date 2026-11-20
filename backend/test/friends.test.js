const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { EventEmitter } = require("node:events");
const http = require("node:http");
const { Server } = require("socket.io");
const { io: connect } = require("socket.io-client");
const { createFriendService } = require("../friends");

const SENDER_ID = "94f1f2df-8a3c-4c79-9e45-53ab8851bb6a";
const RECIPIENT_ID = "0ce2c775-4a2d-44a5-b363-455a54c55719";

class FakeSocket extends EventEmitter {
    constructor(id) {
        super();
        this.id = id;
    }
}

function harness(storePath) {
    const service = createFriendService({ storePath });
    return {
        connect(id) {
            const socket = new FakeSocket(id);
            service.attach(socket);
            return socket;
        }
    };
}

function register(socket, profileId, name) {
    let response;
    socket.emit("friends:register", { profileId, name }, result => { response = result; });
    return response;
}

function request(socket, event, data) {
    let response;
    socket.emit(event, data, result => { response = result; });
    return response;
}

function temporaryStore(t) {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "dbr3-friends-"));
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    return path.join(directory, "friends.json");
}

function waitForState(socket, predicate) {
    return new Promise(resolve => {
        const handler = state => {
            if (!predicate(state)) return;
            socket.off("friends:state", handler);
            resolve(state);
        };
        socket.on("friends:state", handler);
    });
}

test("searches registered players and accepts friend requests", t => {
    const storePath = temporaryStore(t);
    const { connect } = harness(storePath);
    const sender = connect("sender");
    const recipient = connect("recipient");
    let senderState;
    let recipientState;
    sender.on("friends:state", state => { senderState = state; });
    recipient.on("friends:state", state => { recipientState = state; });

    assert.equal(register(sender, SENDER_ID, "Jogador Azul").ok, true);
    assert.equal(register(recipient, RECIPIENT_ID, "Jogador Verde").ok, true);
    const found = request(sender, "friends:search", { query: "jogador verde" });
    assert.deepEqual(found.results.map(item => ({
        profileId: item.profileId,
        online: item.online
    })), [{ profileId: RECIPIENT_ID, online: true }]);

    assert.equal(request(sender, "friends:invite", { profileId: RECIPIENT_ID }).status, "pending");
    assert.deepEqual(recipientState.incoming.map(item => item.profileId), [SENDER_ID]);
    assert.equal(request(recipient, "friends:respond", { profileId: SENDER_ID, accept: true }).accepted, true);
    assert.deepEqual(senderState.friends.map(item => item.profileId), [RECIPIENT_ID]);
    assert.deepEqual(recipientState.friends.map(item => item.profileId), [SENDER_ID]);
});

test("keeps a profile ID stable while multiple tabs are connected", t => {
    const { connect } = harness(temporaryStore(t));
    const firstTab = connect("first-tab");
    const secondTab = connect("second-tab");
    const observer = connect("observer");
    assert.equal(register(firstTab, SENDER_ID, "Jogador Azul").profileId, SENDER_ID);
    assert.equal(register(secondTab, SENDER_ID, "Jogador Azul").profileId, SENDER_ID);
    register(observer, RECIPIENT_ID, "Jogador Verde");
    firstTab.emit("disconnect");
    const found = request(observer, "friends:search", { query: SENDER_ID });
    assert.equal(found.results[0].online, true);
});

test("declines incoming invitations without creating a friendship", t => {
    const { connect } = harness(temporaryStore(t));
    const sender = connect("sender");
    const recipient = connect("recipient");
    let senderState;
    let recipientState;
    sender.on("friends:state", state => { senderState = state; });
    recipient.on("friends:state", state => { recipientState = state; });
    register(sender, SENDER_ID, "Jogador Azul");
    register(recipient, RECIPIENT_ID, "Jogador Verde");
    request(sender, "friends:invite", { profileId: RECIPIENT_ID });

    assert.equal(request(recipient, "friends:respond", { profileId: SENDER_ID, accept: false }).accepted, false);
    assert.deepEqual(recipientState.incoming, []);
    assert.deepEqual(senderState.friends, []);
    assert.deepEqual(request(sender, "friends:search", { query: RECIPIENT_ID }).results[0].outgoingPending, false);
});

test("delivers searches and friend invitations through real Socket.IO clients", { timeout: 5000 }, async t => {
    const server = http.createServer();
    const io = new Server(server);
    const friends = createFriendService({ storePath: temporaryStore(t) });
    io.on("connection", socket => friends.attach(socket));
    await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
    const url = `http://127.0.0.1:${server.address().port}`;
    const sender = connect(url, { reconnection: false });
    const recipient = connect(url, { reconnection: false });
    t.after(async () => {
        sender.close();
        recipient.close();
        await new Promise(resolve => io.close(resolve));
    });
    await Promise.all([sender, recipient].map(socket => new Promise((resolve, reject) => {
        socket.once("connect", resolve);
        socket.once("connect_error", reject);
    })));

    const emitAck = (socket, event, data) => new Promise(resolve => socket.emit(event, data, resolve));
    assert.equal((await emitAck(sender, "friends:register", {
        profileId: SENDER_ID,
        name: "Jogador Azul"
    })).ok, true);
    assert.equal((await emitAck(recipient, "friends:register", {
        profileId: RECIPIENT_ID,
        name: "Jogador Verde"
    })).ok, true);
    const search = await emitAck(sender, "friends:search", { query: RECIPIENT_ID });
    assert.equal(search.results[0].online, true);

    const incoming = waitForState(recipient, state => state.incoming.some(item => item.profileId === SENDER_ID));
    assert.equal((await emitAck(sender, "friends:invite", { profileId: RECIPIENT_ID })).ok, true);
    await incoming;

    const acceptedForSender = waitForState(sender, state => state.friends.some(item => item.profileId === RECIPIENT_ID));
    const acceptedForRecipient = waitForState(recipient, state => state.friends.some(item => item.profileId === SENDER_ID));
    assert.equal((await emitAck(recipient, "friends:respond", { profileId: SENDER_ID, accept: true })).accepted, true);
    await Promise.all([acceptedForSender, acceptedForRecipient]);
});

test("delivers offline invitations after a server restart and persists accepted partners", t => {
    const storePath = temporaryStore(t);
    const firstRun = harness(storePath);
    const sender = firstRun.connect("sender");
    const recipient = firstRun.connect("recipient");
    register(sender, SENDER_ID, "Jogador Azul");
    register(recipient, RECIPIENT_ID, "Jogador Verde");
    recipient.emit("disconnect");
    assert.equal(request(sender, "friends:invite", { profileId: RECIPIENT_ID }).ok, true);
    sender.emit("disconnect");

    const secondRun = harness(storePath);
    const returningRecipient = secondRun.connect("recipient-returning");
    let recipientState;
    returningRecipient.on("friends:state", state => { recipientState = state; });
    register(returningRecipient, RECIPIENT_ID, "Jogador Verde");
    assert.deepEqual(recipientState.incoming.map(item => item.profileId), [SENDER_ID]);
    assert.equal(request(returningRecipient, "friends:respond", { profileId: SENDER_ID, accept: true }).accepted, true);
    returningRecipient.emit("disconnect");

    const thirdRun = harness(storePath);
    const returningSender = thirdRun.connect("sender-returning");
    let senderState;
    returningSender.on("friends:state", state => { senderState = state; });
    register(returningSender, SENDER_ID, "Jogador Azul");
    assert.deepEqual(senderState.friends.map(item => item.profileId), [RECIPIENT_ID]);
});
