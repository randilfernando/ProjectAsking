var express = require('express');
var Question = require('./../model/question.model').Question;
var answerController = require('./../controllers/answer.controller.js')(Question);

var answerRouter = express.Router();

answerRouter.route('')
  .post(answerController.add)
  .put(answerController.put)
  .delete(answerController.del);

module.exports = answerRouter;
