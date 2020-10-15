/* eslint-disable no-unused-vars */
const mongooseConnect = require('./mongoose');

async function loaders () {
  await mongooseConnect;
};

module.exports = loaders;
