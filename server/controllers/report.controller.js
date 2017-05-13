"use strict";

const reportController = function (Question, Module) {

  const getOverall = function (req, res) {
    Module.find({},null,{
      skip: 0,
      sort: { totalQuestions: -1 }
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
          "message": "Internal server error"
        });
      })
  };

  const getUnanswered = function (req, res) {
    Question.find({'totalAnswers': 0})
      .select('_id')
      .exec()
      .then(function (questions) {
        res.status(200);
        res.send({
          "count": questions.length
        });
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          "message": "Internal server error"
        });
      })
  };

  const getByModule = function (req, res) {
    Question.find({'moduleCode': req.params.moduleCode},null,{
      skip: 0,
      sort: { totalQuestions: -1 }
    })

  };

  return {
    getAll: getOverall,
    getUnanswered: getUnanswered,
    getBySubject: getByModule
  }
};

module.exports = reportController;
