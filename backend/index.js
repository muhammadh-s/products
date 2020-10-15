/* eslint-disable no-unused-vars */
const logger = require('./src/loaders/winston'); // do not move
const loader = require('./src/loaders/');
const express = require('./src/loaders/express');
const routes = require('./src/routes');
const config = require('./src/config');

(async function startServer () {
  await loader;
  express.listen(config.port, config.host, function () {
    logger.info(`${process.env.NODE_ENV} server listening on port: ${config.port}`);
  });
})();
