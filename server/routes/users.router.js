var express = require('express');
var passport = require('passport');
var User = require('./../model/user.model').User;
var Module = require('./../model/module.model').Module;
var userController = require('./../controllers/user.controller')(User, Module, passport);

var usersRouter = express.Router();

usersRouter.route('/register')
  .post(userController.register);

usersRouter.route('/login')
  .post(userController.login);

usersRouter.route('/profile/:email')
  .get(userController.getByEmail);

usersRouter.route('/subscribe')
  .post(userController.subscribe);

usersRouter.route('/unsubscribe')
  .post(userController.unsubscribe);

module.exports = usersRouter;
