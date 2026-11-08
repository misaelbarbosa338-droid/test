
const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const { createMatchmaker } = require("./matchmaker");

const app = express();
const server = http.createServer(app);
const frontend = path.resolve(__dirname, "..");

const io = new Server(server);
const matchmaker = createMatchmaker(io);

app.get("/", (req, res) => {
    res.sendFile(path.join(frontend, "index.html"));
});

for (const asset of ["game.js", "style.css"]) {
    app.get(`/${asset}`, (req, res) => {
        res.sendFile(path.join(frontend, asset));
    });
}

io.on("connection", (socket) => {
    console.log("Jogador conectado:", socket.id);
    matchmaker.attach(socket);
});

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`ORIGEN ZERO online na porta ${PORT}`);
    });
}

module.exports = { app, server, io, matchmaker };
