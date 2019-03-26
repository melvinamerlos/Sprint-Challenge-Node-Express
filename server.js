const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const projectsRouter = require("./data/routes/projectsRouter");
const actionsRouter = require("./data/routes/actionsRouter");
const server = express();

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);


server.use(express.json());
server.use(cors());
server.use(helmet());

 server.get("/", (req, res) => {
  res.send(`
    <h2>Sprint-Challenge-Node-Express</h2>
  `);
});

 module.exports = server;