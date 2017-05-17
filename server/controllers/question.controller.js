"use strict";

const questionController = function (Question, Module) {

  const get = function (req, res) {
    Question.find({})
      .select('_id title moduleCode moduleName submittedBy totalRatings totalAnswers tags')
      .exec()
      .then(function (questions) {
        res.status(200);
        res.send(questions);
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
      });
  };

  const getById = function (req, res) {
    Question.findById(req.params.id)
      .exec()
      .then(function (question) {
        res.status(200);
        res.send(question);
      })
      .catch(function (err) {
        res.status(404);
        res.send(err);
      });
  };

  const getByKeyword = function (req, res) {
    Question.find({$text: {$search: req.params.keyword}}, {score: {$meta: "textScore"}})
      .select('_id title moduleCode moduleName submittedBy totalRatings totalAnswers tags')
      .sort({score: {$meta: 'textScore'}, totalRatings: -1})
      .exec()
      .then(function (questions) {
        if (questions.length === 0) {
          res.status(204);
          res.send({
            message: 'No questions found'
          });
        } else {
          res.status(200);
          res.send(questions);
        }
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
      });
  };

  const getByModule = function (req, res) {
    Question.find({'moduleCode': req.params.code})
      .select('_id title moduleCode moduleName submittedBy totalRatings totalAnswers tags')
      .exec()
      .then(function (questions) {
        if (questions.length === 0) {
          res.status(204);
          res.send({
            message: 'No questions submitted'
          });
        } else {
          res.status(200);
          res.send(questions);
        }
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
        console.log('Error', err);
      });
  };

  const getByUser = function (req, res) {
    Question.find({'submittedBy': req.body.token.email}, null, {
      skip: 0,
      limit: 100,
      sort: {_id: -1}
    })
      .select('_id title moduleCode moduleName submittedBy totalRatings totalAnswers tags')
      .exec()
      .then(function (questions) {
        if (questions.length === 0) {
          res.status(204);
          res.send({
            message: 'No questions submitted'
          });
        } else {
          res.status(200);
          res.send(questions);
        }
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
      });
  };

  const add = function (req, res) {
    Module.findOne({'moduleCode': req.body.moduleCode})
      .exec()
      .then(function (module) {
        if (module) {
          let question = new Question(req.body);
          question.submittedBy = req.body.token.email;
          question.moduleName = module.moduleName;

          let valid = false;

          if (question.topic == undefined) {
            valid = true;
          } else {
            for (let topic of module.topics) {
              if (topic === question.topic){
                valid = true;
                break;
              }
            }
          }

          if (valid) {
            question.save()
              .then(function () {
                module.totalQuestions++;
                module.save()
                  .then(function () {
                    res.status(200);
                    res.send({
                      message: 'Success'
                    });
                  })
              })
              .catch(function (err) {
                res.status(500);
                res.send(err);
              });
          } else {
            res.status(500);
            res.send({
              message: 'Not a valid topic'
            });
          }
        } else {
          res.status(404);
          res.send({
            message: 'Module not found'
          });
        }
      })
      .catch(function (err) {
        res.status(500);
        res.send(err);
      });
  };

  const patch = function (req, res) {
    Question.findById(req.params.id)
      .then(function (question) {
        if (req.body.token.accessLevel > 0 || req.body.token.email === question.submittedBy) {

          delete req.body._id;
          Object.assign(question, req.body);

          question.save()
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
        } else {
          res.status(403);
          res.send({
            message: 'Unauthorized access'
          });
        }
      })
      .catch(function (err) {
        res.status(404);
        res.send(err);
      });
  };

  const del = function (req, res) {
    Question.findById(req.body.questionId)
      .exec()
      .then(function (question) {
        question.remove()
          .then(function () {
            Module.findOne({'moduleCode': question.moduleCode})
              .exec()
              .then(function (module) {
                module.totalQuestions--;
                module.save();
              });
            res.status(200);
            res.send({
              message: 'Success'
            });
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
    getByModule: getByModule,
    getByUser: getByUser,
    add: add,
    patch: patch,
    del: del
  };
};

module.exports = questionController;
