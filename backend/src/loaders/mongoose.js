const mongoose = require('mongoose');
const config = require('../config/index');
const logger = require('./winston');

const connectWithRetry = async () => {
  try {
    await mongoose.connect(config.databaseURL,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      }
    ).then(() => logger.info('Database connected;'));
  } catch (error) {
    logger.error('Connection to the Database could not be established, trying in 5 seconds');
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

const db = mongoose.connection;

module.exports = db;
