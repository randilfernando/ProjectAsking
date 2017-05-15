"use strict";

const express = require('express');
const Question = require('./../model/question.model').Question;
const Module = require('./../model/module.model').Module;
const questionsController = require('./../controllers/question.controller.js')(Question, Module);
const accessMiddleware = require('./../middleware/access.middleware');

let questionRouter = express.Router();

questionRouter.route('')
  .get(questionsController.get)
  .post(accessMiddleware([0]), questionsController.add)
  .delete(accessMiddleware([1, 2]), questionsController.del);

questionRouter.route('/user')
  .get(questionsController.getByUser);

questionRouter.route('/:id')
  .get(questionsController.getById)
  .patch(questionsController.patch); //check for same user

questionRouter.route('/module/:code')
  .get(questionsController.getByModule);

questionRouter.route('/search/:keyword')
  .get(questionsController.getByKeyword);

module.exports = questionRouter;
