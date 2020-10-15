/**
 * An Error handler
 *
 * @param {Number} httpCode - HTTP code
 * @param {String} message - error message
 *
 * @returns {*} Creates a new Error object
*/

class ErrorHandler extends Error {
  constructor (httpCode, message) {
    super();
    this.ok = false;
    this.httpCode = httpCode;
    this.message = message;
  }
};

module.exports = ErrorHandler;
