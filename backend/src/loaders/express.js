const express = require('express');
const BodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./winston');
const level = require('../config').logs.morganLevel;
const cors = require('cors');
const path = require('path');

const app = express();
try {
  app.use(BodyParser.json());
  app.use(BodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan(level, { stream: logger.stream }));
  logger.info('Express loaded;');
} catch (error) {
  logger.error('Express loader error');
}

module.exports = app;
