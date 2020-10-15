const jwt = require('jsonwebtoken');
const jwtSecret = require('../../config').jwtSecret;
const FailHandler = require('../Handlers/FailHandler');
const authService = require('../../services/authService');
const responseHandler = require('../Handlers/ResponseHandler');

module.exports = function (roles = []) {
  if (typeof roles === 'number') {
    roles = [roles];
  }
  return [
    async (req, res, next) => {
      let decoded;
      try {
        const token = req.header('Authorization');
        if (!token) {
          throw new FailHandler(401, 'Authorization Denied', 'The JWT was not provided in the request.');
        } else {
          try {
            const replace = token.replace('Bearer ', '');
            decoded = jwt.verify(replace, jwtSecret);
          } catch (error) {
            throw new FailHandler(401, 'Authorization Denied', 'The JWT provided is invalid or either expired.');
          }
        }
      } catch (error) {
        responseHandler(res, error);
      };
      if (typeof decoded !== 'undefined') {
        try {
          const user = await authService.checkUserRole(decoded.id);
          if (roles.length && roles.indexOf(user.role) === -1) {
            throw new FailHandler(401, 'Authorization Denied', 'The user is not allowed to access this route.');
          }
          req.user = user;
          next();
        } catch (error) {
          responseHandler(res, new FailHandler(error.httpCode, error.message, error.details));
        };
      }
    }
  ];
};
