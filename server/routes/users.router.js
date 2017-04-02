var express = require('express');
var passport = require('passport');
var User = require('./../model/user.model').User;
var userController = require('./../controllers/user.controller')(User, passport);

var usersRouter = express.Router();

usersRouter.route('/register')
    .post(userController.register);

usersRouter.route('/login')
    .post(userController.login);

usersRouter.route('/profile/:id')
    .get(userController.getById);

module.exports = usersRouter;
