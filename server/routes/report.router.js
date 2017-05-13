"use strict";

const express = require('express');
const Question = require('./../model/question.model').Question;
const Module = require('./../model/module.model').Module;
const reportController = require('./../controllers/report.controller')(Question, Module);
const accessMiddleware = require('./../middleware/access.middleware');

let reportRouter = express.Router();

reportRouter.route('')
  .get(accessMiddleware([1,2]), reportController.getAll);

reportRouter.route('/unanswered')
  .get(accessMiddleware([1,2]), reportController.getUnanswered);

module.exports = reportRouter;
