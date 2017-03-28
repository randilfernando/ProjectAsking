var express = require('express');

var questionRouter = require('./questions.router');
var moduleRouter = require('./modules.router');
var userRouter = require('./users.router');

var apiRouter = express.Router();

//define api routes
apiRouter.use('/question', questionRouter);
apiRouter.use('/module', moduleRouter);
apiRouter.use('/user', userRouter);

module.exports = apiRouter;