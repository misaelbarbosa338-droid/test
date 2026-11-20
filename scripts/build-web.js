"use strict";

const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const webDirectory = path.join(projectRoot, "www");
const webFiles = ["index.html", "game.js", "style.css", "app-config.js"];

fs.mkdirSync(webDirectory, { recursive: true });
for (const file of webFiles) {
    fs.copyFileSync(path.join(projectRoot, file), path.join(webDirectory, file));
}
