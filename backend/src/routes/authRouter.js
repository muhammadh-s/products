const authController = require('../controllers/authController');
const express = require('express');
const authRouter = express.Router();
const reqLimiter = require('../middlewares/requestsLimiter');

authRouter.post('/register', authController.register);
authRouter.post('/login', reqLimiter, authController.login);

module.exports = authRouter;
