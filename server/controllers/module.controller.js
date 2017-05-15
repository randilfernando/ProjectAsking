"use strict";

const moduleController = function (Module) {

  const get = function (req, res) {
    Module.find({})
      .select('_id moduleCode moduleName totalQuestions')
      .exec()
      .then(function (modules) {
        if (modules.length === 0) {
          res.status(203);
          res.send({
            message: 'No modules found'
          })
        } else {
          res.status(200);
          res.send(modules);
        }
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
        console.log('error: ', err);
      })
  };

  const getById = function (req, res) {
    Module.findOne({'moduleCode': req.params.code})
      .exec()
      .then(function (module) {
        if (module) {
          res.status(200);
          res.send(module);
        } else {
          res.status(404);
          res.send({
            message: 'Module not found'
          })
        }
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
        console.log('error: ', err);
      });
  };

  const getByKeyword = function (req, res) {
    res.send('Not implemented');
  };

  const getFeatured = function (req, res) {
    Module.find({}, null, {
      skip: 0,
      limit: 3,
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
        res.send(err);
        console.log('error: ', err);
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
        res.send(err);
      });
  };

  const patch = function (req, res) {
    Module.findById(req.body._id)
      .then(function (module) {
        if(module){
          delete req.body._id;
          Object.assign(module, req.body);

          module.save()
            .then(function () {
              res.status(200);
              res.send({
                message: 'Success'
              });
            })
            .catch(function (err) {
              res.status(500);
              res.send(err);
            });
        }else{
          res.status(404);
          res.send({
            message: 'Module not found'
          })
        }

      })
      .catch(function (err) {
        res.status(404);
        res.send(err);
      });
  };

  const del = function (req, res) {
    Module.findById(req.body._id)
      .exec()
      .then(function (module) {
        module.remove()
          .then(function () {
            res.status(200);
            res.send({
              message: 'Success'
            })
          })
          .catch(function (err) {
            res.status(500);
            res.send(err);
          })
      })
      .catch(function (err) {
        res.status(404);
        res.send(err);
      });
  };

  return {
    get: get,
    getById: getById,
    getByKeyword: getByKeyword,
    getFeatured: getFeatured,
    add: add,
    patch: patch,
    del: del
  };

};

module.exports = moduleController;
