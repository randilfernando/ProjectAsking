var express = require('express');
var Question = require('./../model/question.model').Question;
var Module = require('./../model/module.model').Module;
var reportController = require('./../controllers/report.controller')(Question, Module);
var lecturerMiddleware = require('./../middleware/lecturer.middleware');

var reportRouter = express.Router();

reportRouter.route('')
  .get(lecturerMiddleware, reportController.getAll)

reportRouter.route('/unanswered')
  .get(lecturerMiddleware, reportController.getUnanswered)

module.exports = reportRouter;
