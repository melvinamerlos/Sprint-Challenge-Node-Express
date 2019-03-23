const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

 server.get("/", (req, res) => {
  res.send(`
    <h2>Sprint-Challenge-Node-Express</h2>
  `);
});

 module.exports = server;