const responseHandler = require('../middlewares/handlers/ResponseHandler');
const authService = require('../services/authService');
const utilService = require('../services/utilService');

const authControllers = {
  register: async function (req, res) {
    await authService.checkUser(req.body.userId)
      .then(() => utilService.hash(req.body.password))
      .then(hashedPassword => authService.addUser(req.body.userId, req.body.role, hashedPassword))
      .then(user => utilService.getJWT(user))
      .then(result => responseHandler(res, null, true, 200, result))
      .catch(errorAndFail => {
        responseHandler(res, errorAndFail);
      });
  },
  login: async function (req, res) {
    await utilService.validate(req.body)
      .then(() => authService.checkUserLogin(req.body.userId))
      .then((user) => utilService.checkPassword(req.body.password, user)
        .then(() => utilService.getJWT(user))
      )
      .then(result => responseHandler(res, null, true, 200, result))
      .catch(errorAndFail => {
        responseHandler(res, errorAndFail);
      });
  }

};

module.exports = authControllers;
