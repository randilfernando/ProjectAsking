var express = require('express');
var passport = require('passport');
var User = require('./../model/user.model').User;
var Module = require('./../model/module.model').Module;
var userController = require('./../controllers/user.controller')(User, Module, passport);
var authMiddleware = require('./../middleware/auth.middleware');

var usersRouter = express.Router();

usersRouter.route('/register')
  .post(userController.register);

usersRouter.route('/login')
  .post(userController.login);

usersRouter.route('/profile/:email')
  .get(authMiddleware, userController.getByEmail);

usersRouter.route('/subscribe')
  .post(authMiddleware, userController.subscribe);

usersRouter.route('/unsubscribe')
  .post(authMiddleware, userController.unsubscribe);

module.exports = usersRouter;
