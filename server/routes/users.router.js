var express = require('express');
var passport = require('passport');
var User = require('./../model/user.model').User;
var TempUser = require('./../model/tempUser.model').TempUser;
var Module = require('./../model/module.model').Module;
var userController = require('./../controllers/user.controller')(User, TempUser, Module, passport);
var authMiddleware = require('./../middleware/auth.middleware');

var usersRouter = express.Router();

usersRouter.route('/register')
  .post(userController.register);

usersRouter.route('/login')
  .post(userController.login);

usersRouter.route('/verification/:id')
  .get(userController.verification);

usersRouter.route('/reset')
  .post(userController.resetPassword);

usersRouter.route('/profile')
  .get(authMiddleware, userController.getByEmail);

usersRouter.route('/subscribe')
  .post(authMiddleware, userController.subscribe);

usersRouter.route('/unsubscribe')
  .post(authMiddleware, userController.unsubscribe);

module.exports = usersRouter;
