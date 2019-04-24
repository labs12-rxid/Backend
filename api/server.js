const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// const usersRouter = require("../routers/userRouter.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("Server is up and running");
});
// server.use("/api/users", usersRouter);

module.exports = server;
