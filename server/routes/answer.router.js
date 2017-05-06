var express = require('express');
var Question = require('./../model/question.model').Question;
var answerController = require('./../controllers/answer.controller.js')(Question);
var lecturerMiddleware = require('./../middleware/lecturer.middleware');

var answerRouter = express.Router();

answerRouter.route('')
  .post(answerController.add)
  .put(lecturerMiddleware, answerController.put)
  .delete(lecturerMiddleware, answerController.del);

module.exports = answerRouter;
