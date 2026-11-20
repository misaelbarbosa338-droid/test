
const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const { createMatchmaker } = require("./matchmaker");
const { createFriendService } = require("./friends");
const { createPartyService } = require("./parties");
const { createAccountService } = require("./accounts");

const app = express();
const server = http.createServer(app);
const frontend = path.resolve(__dirname, "..");

const io = new Server(server);
const matchmaker = createMatchmaker(io);
const accounts = createAccountService();
const friends = createFriendService({ accounts });
const parties = createPartyService({ friends, matchmaker });

app.get("/", (req, res) => {
    res.sendFile(path.join(frontend, "index.html"));
});

for (const asset of ["game.js", "style.css"]) {
    app.get(`/${asset}`, (req, res) => {
        res.sendFile(path.join(frontend, asset));
    });
}

function accountRoute(action) {
    return async (req, res) => {
        try {
            const result = await action(req.body || {}, req.ip || "");
            res.status(result.ok ? 200 : 400).json(result);
        } catch (error) {
            console.error("Falha na rota de conta.", error);
            res.status(500).json({ ok: false, error: "Erro no servidor. Tente novamente." });
        }
    };
}

app.post("/api/account/register", express.json({ limit: "2mb" }), accountRoute(data => accounts.register(data)));
app.post("/api/account/login", express.json({ limit: "2mb" }), accountRoute((data, source) => accounts.login(data, source)));

io.on("connection", (socket) => {
    console.log("Jogador conectado:", socket.id);
    socket.use(([event, data, acknowledge], next) => {
        if (event !== "matchmaking:join") {
            next();
            return;
        }
        const profileId = friends.getProfileId(socket);
        if (!profileId) {
            if (typeof acknowledge === "function") {
                acknowledge({ ok: false, error: "Entre na sua conta antes de procurar uma partida." });
            }
            return;
        }
        if (data && typeof data === "object") {
            data.profileId = profileId;
            data.name = friends.getProfileName(profileId);
        }
        next();
    });
    matchmaker.attach(socket);
    parties.attach(socket);
    friends.attach(socket);
});

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`ORIGEN ZERO online na porta ${PORT}`);
    });
}

module.exports = { app, server, io, matchmaker, friends, parties };
