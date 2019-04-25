const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("../routers/userRouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan("combined"));

server.get("/", (req, res) => {
  res.status(200).send("Server is up and running");
});
server.use("/api/users", userRouter);

module.exports = server;
