/**
 * An Fail handler
 *
 * @param {Number} httpCode - HTTP code
 * @param {String} message - fail message
 * @param {String} details - details
 *
 * @returns {*} Creates a new Fail object
*/

class FailHandler {
  constructor (httpCode, message, details) {
    this.ok = true;
    this.httpCode = httpCode;
    this.message = message;
    this.details = details;
  }
};

module.exports = FailHandler;
