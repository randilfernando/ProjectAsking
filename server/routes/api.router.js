"use strict";

const express = require('express');

const questionRouter = require('./questions.router');
const moduleRouter = require('./modules.router');
const userRouter = require('./users.router');
const answerRouter = require('./answer.router');
const reportRouter = require('./report.router');
const authMiddleware = require('./../middleware/auth.middleware');

let apiRouter = express.Router();

//define api routes
apiRouter.use('/question', authMiddleware, questionRouter);
apiRouter.use('/module', authMiddleware, moduleRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/answer', authMiddleware, answerRouter);
apiRouter.use('/report', authMiddleware, reportRouter);

module.exports = apiRouter;
