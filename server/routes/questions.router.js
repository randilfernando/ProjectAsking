var express = require('express');
var Question = require('./../model/question.model').Question;
var Module = require('./../model/module.model').Module;
var questionsController = require('./../controllers/question.controller.js')(Question, Module);
var studentMiddleware = require('./../middleware/student.middleware');
var lecturerMiddleware = require('./../middleware/lecturer.middleware');

var questionRouter = express.Router();

questionRouter.route('')
    .get(questionsController.get)
    .post(studentMiddleware, questionsController.add)
    .delete(lecturerMiddleware, questionsController.del);

questionRouter.route('/:id')
    .get(questionsController.getById)
    .put(lecturerMiddleware, questionsController.update)
    .patch(lecturerMiddleware, questionsController.patch);

questionRouter.route('/module/:id')
    .get(questionsController.getByModule);

questionRouter.route('/user/:id')
    .get(questionsController.getByUser);

questionRouter.route('/search/:keyword')
    .get(questionsController.getByKeyword);

module.exports = questionRouter;
