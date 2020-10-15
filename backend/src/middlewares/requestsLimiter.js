const rateLimit = require('express-rate-limit');
const FailHandler = require('../middlewares/handlers/FailHandler');
const responseHandler = require('../middlewares/handlers/ResponseHandler');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // number of requests
  handler: function (req, res /*, next */) {
    responseHandler(res, new FailHandler(429, 'Too many requests, please try again later.', 'Requests limit reached.'));
  }
});
