var express = require('express');
var questionsController = require('./../controllers/question.controller.js');

var questionRouter = express.Router();

questionRouter.route('')
    .get(questionsController.get)
    .post(questionsController.add)
    .delete(questionsController.del);

questionRouter.route('/:id')
    .get(questionsController.getById)
    .put(questionsController.update)
    .patch(questionsController.patch);

questionRouter.route('/module/:id')
    .get(questionsController.getByModule);

questionRouter.route('/user/:id')
    .get(questionsController.getByUser);

questionRouter.route('/search/:keyword')
    .get(questionsController.getByKeyword);

module.exports = questionRouter;