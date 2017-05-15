"use strict";

const express = require('express');
const Module = require('./../model/module.model').Module;
const moduleController = require('./../controllers/module.controller.js')(Module);
const accessMiddleware = require('./../middleware/access.middleware');

let moduleRouter = express.Router();

moduleRouter.route('')
  .get(moduleController.get)
  .post(accessMiddleware([2]), moduleController.add)
  .patch(accessMiddleware([2]), moduleController.patch)
  .delete(accessMiddleware([2]), moduleController.del);

moduleRouter.route('/featured')
  .get(moduleController.getFeatured);

moduleRouter.route('/:code')
  .get(moduleController.getById);

module.exports = moduleRouter;
