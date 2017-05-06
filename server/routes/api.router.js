var express = require('express');

var questionRouter = require('./questions.router');
var moduleRouter = require('./modules.router');
var userRouter = require('./users.router');
var answerRouter = require('./answer.router');
var reportRouter = require('./report.router');
var authMiddleware = require('./../middleware/auth.middleware');

var apiRouter = express.Router();

//define api routes
apiRouter.use('/question', authMiddleware, questionRouter);
apiRouter.use('/module', authMiddleware, moduleRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/answer', authMiddleware, answerRouter);
apiRouter.use('/report', authMiddleware, reportRouter);

module.exports = apiRouter;
