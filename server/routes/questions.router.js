var express = require('express');
var Question = require('./../model/question.model').Question;
var Module = require('./../model/module.model').Module;
var questionsController = require('./../controllers/question.controller.js')(Question, Module);
var accessMiddleware = require('./../middleware/access.middleware');

var questionRouter = express.Router();

questionRouter.route('')
    .get(questionsController.get)
    .post(accessMiddleware([0,2]), questionsController.add)
    .delete(accessMiddleware([1,2]), questionsController.del);

questionRouter.route('/user')
  .get(questionsController.getByUser);

questionRouter.route('/:id')
    .get(questionsController.getById)
    .put(accessMiddleware([1,2]), questionsController.update)
    .patch(accessMiddleware([1,2]), questionsController.patch);

questionRouter.route('/module/:code')
    .get(questionsController.getByModule);

questionRouter.route('/search/:keyword')
    .get(questionsController.getByKeyword);

module.exports = questionRouter;
