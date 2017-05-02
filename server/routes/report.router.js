var express = require('express');
var Question = require('./../model/question.model').Question;
var Module = require('./../model/module.model').Module;
var reportController = require('./../controllers/report.controller')(Question, Module);

var reportRouter = express.Router();

reportRouter.route('')
  .get(reportController.getAll)

reportRouter.route('/unanswered')
  .get(reportController.getUnanswered)

module.exports = reportRouter;
