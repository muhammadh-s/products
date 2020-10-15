const logger = require('../../loaders/winston');
/**
 * A response handler
 *
 * @param {Object} responseObject - An express response object
 * @param {Object} ErrorFailObject - An Error or Fail Object
 * @param {Number} httpCode - Http Code
 * @param {Boolean} ok - API is working?
 * @param {Object} payload - Data
 *
 * @returns {*} Returns the response to be sent
*/

function ResponseHandler (responseObject, ErrorFailObject, ok, httpCode, payload) {
  if (ErrorFailObject && ErrorFailObject.stack) {
    logger.error(ErrorFailObject.stack);
  } else if (ErrorFailObject && ErrorFailObject.details) {
    logger.warn(ErrorFailObject.details);
  }
  const responseTemplate = {
    OK: ok || ErrorFailObject.ok,
    PAYLOAD: [payload] || null,
    MESSAGE: ErrorFailObject ? ErrorFailObject.message : null
  };
  return (responseObject.status(httpCode || ErrorFailObject.httpCode).json(responseTemplate));
};

module.exports = ResponseHandler;
