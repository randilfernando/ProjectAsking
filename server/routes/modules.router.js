var express = require('express');
var moduleController = require('./../controllers/module.controller.js');

var moduleRouter = express.Router();

moduleRouter.route('')
    .get(moduleController.get)
    .post(moduleController.add)
    .delete(moduleController.del);

moduleRouter.route('/:id')
    .get(moduleController.getById)
    .put(moduleController.update)
    .patch(moduleController.patch);

moduleRouter.route('/search/:keyword')
    .get(moduleController.getByKeyword);

module.exports = moduleRouter;
