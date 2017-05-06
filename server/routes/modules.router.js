var express = require('express');
var Module = require('./../model/module.model').Module;
var moduleController = require('./../controllers/module.controller.js')(Module);
var adminMiddleware = require('./../middleware/admin.middleware');

var moduleRouter = express.Router();

moduleRouter.route('')
    .get(moduleController.get)
    .post(adminMiddleware, moduleController.add)
    .delete(adminMiddleware, moduleController.del);

moduleRouter.route('/featured')
    .get(moduleController.getFeatured);

moduleRouter.route('/:id')
    .get(moduleController.getById)
    .put(adminMiddleware, moduleController.update)
    .patch(adminMiddleware, moduleController.patch);

moduleRouter.route('/search/:keyword')
    .get(moduleController.getByKeyword);

module.exports = moduleRouter;
