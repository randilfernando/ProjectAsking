"use strict";

const moduleController = function (Module) {

  const get = function (req, res) {
    Module.find({})
      .select('_id moduleCode moduleName totalQuestions')
      .exec()
      .then(function (modules) {
        if (modules.length == 0){
          res.status(203);
          res.send({
            message: 'No modules found'
          })
        }else{
          res.status(200);
          res.send(modules);
        }
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          message: 'Internal server error'
        });
      })
  };

  const getById = function (req, res) {
    Module.findOne({'moduleCode': req.params.code})
      .exec()
      .then(function (module) {
        if (module){
          res.status(200);
          res.send(module);
        }else{
          res.status(404);
          res.send({
            message: 'Module not found'
          })
        }
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          message: 'Internal server error'
        });
        console.log('error: ', err);
      });
  };

  const getByKeyword = function (req, res) {
    res.send('Not implemented');
  };

  const getFeatured = function (req, res) {
    Module.find({}, null, {
      skip: 0,
      limit: 5,
      sort: {totalQuestions: -1}
    })
      .select('_id moduleCode moduleName totalQuestions')
      .exec()
      .then(function (modules) {
        res.status(200);
        res.send(modules);
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          message: 'Internal server error'
        });
      })
  };

  const add = function (req, res) {
    let module = new Module(req.body);
    module.save()
      .then(function () {
        res.status(200);
        res.send({
          message: 'Success'
        });
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          message: 'Internal server error'
        });
        console.log('error: ', err);
      });
  };

  const update = function (req, res) {
    res.send('Not implemented');
  };

  const patch = function (req, res) {
    res.send('Not implemented');
  };

  const del = function (req, res) {
    res.send('Not implemented');
  };

  return {
    get: get,
    getById: getById,
    getByKeyword: getByKeyword,
    getFeatured: getFeatured,
    add: add,
    update: update,
    patch: patch,
    del: del
  };

};

module.exports = moduleController;
