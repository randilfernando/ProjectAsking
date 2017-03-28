var express = require('express');
var userController = require('./../controllers/user.controller');

var usersRouter = express.Router();

usersRouter.route('/register')
    .post(userController.register);

usersRouter.route('/login')
    .post(userController.login);

usersRouter.route('/profile/:id')
    .get(userController.getById);

module.exports = usersRouter;