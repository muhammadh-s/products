const express = require('../loaders/express');
const prefix = require('../config').api.prefix;
const commonRouter = require('./commonRouter');
const authRouter = require('./authRouter');

express.use(`${prefix}/common`, commonRouter);
express.use(`${prefix}/auth`, authRouter);
