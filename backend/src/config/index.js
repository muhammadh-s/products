const dotenv = require('dotenv');
const logger = require('../loaders/winston');
const path = require('path');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (!envFound) {
  // This error should crash whole process

  logger.error("⚠️ Couldn't find .env file ⚠️");
}

module.exports = {
  /**
   * logs folder
   */
  LogsFolder: path.join(__dirname, '../../logs'),

  /**
   * product service
   */
  // productService: process.env.PROD_SERV_URI,
  /**
   * Your favorite port
   */
  port: process.env.PORT || 5000,

  host: process.env.HOST || '0.0.0.0',

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * Used by winston logger
   */
  logs: {
    winstonLevel: process.env.WINSTON_LOG_LEVEL || 'silly',
    morganLevel: process.env.MORGAN_LOG_LEVEL || 'dev'
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api'
  }

};
