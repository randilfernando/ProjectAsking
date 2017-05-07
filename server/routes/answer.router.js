var express = require('express');
var Question = require('./../model/question.model').Question;
var answerController = require('./../controllers/answer.controller.js')(Question);
var accessMiddleware = require('./../middleware/access.middleware');

var answerRouter = express.Router();

answerRouter.route('')
  .post(answerController.add)
  .put(accessMiddleware([1,2]), answerController.put)
  .delete(accessMiddleware([1,2]), answerController.del);

module.exports = answerRouter;
