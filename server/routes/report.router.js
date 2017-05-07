var express = require('express');
var Question = require('./../model/question.model').Question;
var Module = require('./../model/module.model').Module;
var reportController = require('./../controllers/report.controller')(Question, Module);
var accessMiddleware = require('./../middleware/access.middleware');

var reportRouter = express.Router();

reportRouter.route('')
  .get(accessMiddleware([1,2]), reportController.getAll);

reportRouter.route('/unanswered')
  .get(accessMiddleware([1,2]), reportController.getUnanswered);

module.exports = reportRouter;
