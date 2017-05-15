"use strict";

const express = require('express');
const passport = require('passport');
const User = require('./../model/user.model').User;
const TempUser = require('./../model/tempUser.model').TempUser;
const Module = require('./../model/module.model').Module;
const userController = require('./../controllers/user.controller')(User, TempUser, Module);
const authMiddleware = require('./../middleware/auth.middleware');
const accessMiddleware = require('./../middleware/access.middleware');

let usersRouter = express.Router();

usersRouter.route('/register')
  .post(userController.register);

usersRouter.route('/login')
  .post(userController.login);

usersRouter.route('/verification/:id')
  .get(userController.verification);

usersRouter.route('/reset')
  .post(userController.resetPassword);

usersRouter.route('/profile')
  .get(authMiddleware, userController.getByEmail)
  .patch(authMiddleware, userController.update);

usersRouter.route('/subscribe')
  .post(authMiddleware, accessMiddleware([0,1]), userController.subscribe);

usersRouter.route('/unsubscribe')
  .post(authMiddleware, accessMiddleware([0,1]), userController.unsubscribe);

module.exports = usersRouter;
