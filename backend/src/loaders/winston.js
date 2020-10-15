const level = require('../config').logs.winstonLevel;
const logsFolder = require('../config').LogsFolder;
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
// const fs = require('fs');
const path = require('path');

const transports = [];
const exceptionHandlers = [];
const logDirectory = path.join(__dirname, logsFolder);

// if (!fs.existsSync(logDirectory)) {
//   fs.mkdirSync(logDirectory);
// }

if (process.env.NODE_ENV !== 'development') {
  transports.push(
    new DailyRotateFile({
      filename: `${logDirectory}/error/%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      frequency: '24h',
      level: 'error'
    }),
    new DailyRotateFile({
      filename: `${logDirectory}/info/%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      frequency: '24h',
      level: 'info'
    }),
    new DailyRotateFile({
      filename: `${logDirectory}/warn/%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      frequency: '24h',
      level: 'warn'
    })
  );
  exceptionHandlers.push(
    new DailyRotateFile({
      filename: `${logDirectory}/exception/%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      frequency: '24h'
    })
  );
} else {
  exceptionHandlers.push(
    new winston.transports.Console()
  );
  transports.push(
    new winston.transports.Console()
  );
};

const logger = winston.createLogger({
  level: level,
  exceptionHandlers,
  transports,
  exitOnError: false,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.colorize(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
    winston.format.printf((info) => {
      return `${info.timestamp} - [${info.level}]: ${info.message}`;
    })
  )
});

logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports
    logger.info(message);
  }
};

module.exports = logger;
