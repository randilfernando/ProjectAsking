"use strict";

const express = require('express');
const Question = require('./../model/question.model').Question;
const answerController = require('./../controllers/answer.controller.js')(Question);
const accessMiddleware = require('./../middleware/access.middleware');

let answerRouter = express.Router();

answerRouter.route('')
  .post(answerController.add)
  .put(accessMiddleware([1,2]), answerController.put)
  .patch(answerController.patch)
  .delete(answerController.del);

module.exports = answerRouter;
