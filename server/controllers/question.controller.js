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
        res.send({
          message: 'Internal server error'
        });
        console.log('error: ', err);
      });
  };

  const getByKeyword = function (req, res) {
    Question.find({$text: {$search: req.params.keyword}}, {score: {$meta: "textScore"}})
      .select('_id title moduleCode moduleName submittedBy totalRatings totalAnswers tags')
      .sort({score: {$meta: 'textScore'}})
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
        res.send({
          message: 'Internal server error'
        });
        console.log('error: ', err);
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
        res.send({
          message: 'Question not found'
        });
        console.log('error: ', err);
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
        res.send({
          message: 'Internal server error'
        });
        console.log('error: ', err);
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
        res.send({
          message: 'Internal server error'
        });
        console.log('error: ', err);
      });
  };

  const add = function (req, res) {
    Module.findOne({'moduleCode': req.body.moduleCode})
      .exec()
      .then(function (module) {
        if (module) {
          let question = new Question(req.body);
          question.submittedBy = req.body.token.email;
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
              res.send({
                message: 'Internal server error'
              });
              console.log('error: ', err);
            });
        } else {
          res.status(404);
          res.send({
            message: 'Module not found'
          });
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

  const update = function (req, res) {
    Question.findById(req.params.id)
      .exec()
      .then(function (question) {
        question.title = req.body.title;
        question.rating = req.body.rating;
        question.totalAnswers = req.body.totalAnswers;
        question.moduleCode = req.body.moduleCode;
        question.moduleName = req.body.moduleName;
        question.topic = req.body.topic;
        question.tags = req.body.tags;
        question.description = req.body.description;

        question.save()
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
      })
      .catch(function (err) {
        res.status(404);
        res.send({
          message: 'Question not found'
        });
        console.log('error: ', err);
      });
  };

  const patch = function (req, res) {
    Question.findById(req.params.id)
      .then(function (question) {
        if (req.body.token.accessLevel > 0 || req.body.token.email === question.submittedBy) {
          delete req.body._id;
          for (let p in req.body) {
            question[p] = req.body[p];
          }
          question.save()
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
        } else {
          res.status(403);
          res.send({
            message: 'Unauthorized access'
          });
        }
      })
      .catch(function (err) {
        res.status(404);
        res.send({
          message: 'Question not found'
        });
        console.log('error: ', err);
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
            res.send({
              message: 'Internal server error'
            });
            console.log('error: ', err);
          })
      })
      .catch(function (err) {
        res.status(404);
        res.send({
          message: 'Question not found'
        });
        console.log('error: ', err);
      });
  };

  const rateUp = function (req, res) {
    Question.findById(req.body.questionId)
      .exec()
      .then(function (question) {
        let preRate = question.totalRatings;
        question.ratings.addToSet(req.body.email);
        question.totalRatings = question.ratings.length;

        if (preRate < question.totalRatings) {
          question.save()
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
        } else {
          res.status(203);
          res.send({
            message: 'Already rated'
          });
        }
      })
      .catch(function (err) {
        res.status(404);
        res.send({
          message: 'Question not found'
        });
        console.log('error: ', err);
      });
  };

  const rateDown = function (req, res) {
    Question.findById(req.body.questionId)
      .exec()
      .then(function (question) {
        let preRate = question.totalRatings;
        question.ratings.pull(req.body.token.email);
        question.totalRatings = question.ratings.length;

        if (preRate > question.totalRatings) {
          question.save()
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
        } else {
          res.status(203);
          res.send({
            message: 'You have not rated this question'
          });
        }
      })
      .catch(function (err) {
        res.status(404);
        res.send({
          message: 'Question not found'
        });
        console.log('error: ', err);
      });
  };

  return {
    get: get,
    getById: getById,
    getByKeyword: getByKeyword,
    getByModule: getByModule,
    getByUser: getByUser,
    add: add,
    update: update,
    patch: patch,
    del: del
  };
};

module.exports = questionController;
