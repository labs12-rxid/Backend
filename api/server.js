const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const usersRouter = require('../routers/userRouter.js');
const medsRouter = require('../routers/medsRouter.js');
const diaryRouter = require('../routers/diaryRouter.js');
const remsRouter = require('../routers/remsRouter.js');

const authRouter = require('../routers/authRouter');

const uploadRouter = require('../routers/uploadRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan('combined'));

server.get('/api', (req, res) => {
  res.status(200).send('Server is up and running');
});

server.get('/', (req, res) => {
  res.status(200).send('Server is up and running');
});

server.use('/api/meds', medsRouter);
server.use('/api/diaries', diaryRouter);
server.use('/api/users', usersRouter);
server.use('/api/rems', remsRouter);
server.use('/api/auth', authRouter);
server.use('/api/upload', uploadRouter);

module.exports = server;
