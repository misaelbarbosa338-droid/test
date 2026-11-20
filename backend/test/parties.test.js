const test = require("node:test");
const assert = require("node:assert/strict");
const { EventEmitter } = require("node:events");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { createFriendService } = require("../friends");
const { createMatchmaker } = require("../matchmaker");
const { createPartyService } = require("../parties");

const PROFILE_IDS = [
    "94f1f2df-8a3c-4c79-9e45-53ab8851bb6a",
    "0ce2c775-4a2d-44a5-b363-455a54c55719",
    "84226a72-6262-44e1-9c84-8a42dedf39a7",
    "bbbd98c3-e895-4eb6-995f-5537635d4fb8",
    "a18f9ca5-42ec-43ae-883f-fc87cb1a2437"
];

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
        const target = {
            except(id) {
                excluded = id;
                return target;
            },
            emit: (event, data) => {
                for (const socket of this.sockets.values()) {
                    if (socket.id !== excluded && socket.rooms.has(room)) socket.emit(event, data);
                }
            }
        };
        return target;
    }
}

function temporaryStore(t) {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "dbr3-parties-"));
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    return path.join(directory, "friends.json");
}

function request(socket, event, data) {
    let response;
    if (event === "party:start") {
        socket.emit(event, result => { response = result; });
        return response;
    }
    socket.emit(event, data, result => { response = result; });
    return response;
}

function setup(t) {
    const io = new FakeIO();
    const friends = createFriendService({ storePath: temporaryStore(t) });
    const matchmaker = createMatchmaker(io);
    const parties = createPartyService({ friends, matchmaker });
    const sockets = PROFILE_IDS.map((profileId, index) => {
        const socket = new FakeSocket(`player-${index}`, io);
        io.add(socket);
        matchmaker.attach(socket);
        parties.attach(socket);
        friends.attach(socket);
        assert.equal(request(socket, "friends:register", {
            profileId,
            name: `Jogador ${index}`
        }).ok, true);
        return socket;
    });

    for (let index = 1; index < sockets.length; index++) {
        assert.equal(request(sockets[0], "friends:invite", { profileId: PROFILE_IDS[index] }).ok, true);
        assert.equal(request(sockets[index], "friends:respond", {
            profileId: PROFILE_IDS[0],
            accept: true
        }).accepted, true);
    }

    return { sockets, matchmaker };
}

test("shares a four-player squad lobby and blocks starting until everyone is ready", t => {
    const { sockets, matchmaker } = setup(t);
    const [leader, ...members] = sockets;
    const partyStates = new Map();
    for (const socket of sockets) {
        socket.on("party:state", state => partyStates.set(socket.id, state));
    }

    for (let index = 0; index < 3; index++) {
        const result = request(leader, "party:invite", {
            profileId: PROFILE_IDS[index + 1],
            scene: 2,
            character: 1,
            form: 0
        });
        assert.equal(result.ok, true);
        const invite = partyStates.get(members[index].id).invitations[0];
        assert.equal(invite.memberCount, index + 1);
        assert.equal(request(members[index], "party:respond", {
            leaderId: PROFILE_IDS[0],
            accept: true,
            character: index + 2,
            form: 1
        }).accepted, true);
    }

    assert.deepEqual(partyStates.get(leader.id).party.members.map(member => member.name), [
        "Jogador 0", "Jogador 1", "Jogador 2", "Jogador 3"
    ]);
    assert.equal(partyStates.get(members[0].id).party.scene, 2);
    assert.equal(partyStates.get(members[0].id).party.members[1].character, 2);
    assert.equal(request(leader, "party:invite", {
        profileId: PROFILE_IDS[4],
        scene: 2,
        character: 1,
        form: 0
    }).ok, false);

    for (const socket of [leader, members[0], members[1]]) {
        assert.equal(request(socket, "party:ready", {
            ready: true,
            character: socket === leader ? 1 : sockets.indexOf(socket) + 1,
            form: 0
        }).ok, true);
    }
    assert.equal(request(leader, "party:start").ok, false);
    assert.equal(matchmaker.waitingRooms.size, 0);

    assert.equal(request(members[2], "party:ready", {
        ready: true,
        character: 4,
        form: 1
    }).ok, true);
    assert.equal(partyStates.get(leader.id).party.allReady, true);
    assert.equal(request(leader, "party:start").ok, true);

    const room = matchmaker.waitingRooms.get("squad:2");
    assert.equal(room.members.length, 4);
    assert.deepEqual(room.members.map(member => member.character), [1, 2, 3, 4]);
    matchmaker.startRoom(room);
    assert.deepEqual(room.members.map(member => Math.floor(member.slot / 4)), [0, 0, 0, 0]);
    assert.equal(partyStates.get(leader.id).party, null);
});
