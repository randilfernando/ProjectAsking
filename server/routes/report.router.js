"use strict";

const express = require('express');
const Question = require('./../model/question.model').Question;
const Module = require('./../model/module.model').Module;
const reportController = require('./../controllers/report.controller')(Question, Module);
const accessMiddleware = require('./../middleware/access.middleware');

let reportRouter = express.Router();

reportRouter.route('')
  .get(accessMiddleware([1,2]), reportController.get);

reportRouter.route('/:moduleCode')
  .get(accessMiddleware([1,2]), reportController.getByModule);

module.exports = reportRouter;
