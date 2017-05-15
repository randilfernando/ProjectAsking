"use strict";

const answerController = function (Question) {

  const add = function (req, res) {
    Question.findById(req.body.questionId)
      .exec()
      .then(function (question) {
        let answer = req.body.answer;
        answer.submittedBy = req.body.token.email;
        question.answers.push(answer);
        question.totalAnswers++;

        question.save()
          .then(function (question) {
            res.status(200);
            res.send({
              message: 'Success',
              id: question.answers[question.answers.length - 1]._id
            });
          })
          .catch(function (err) {
            res.status(500);
            res.send(err);
          });
      })
      .catch(function (err) {
        res.status(404);
        res.send(err);
      });
  };

  const patch = function (req, res) {
    Question.findById(req.body.questionId)
      .exec()
      .then(function (question) {
        let answer = question.answers.id(req.body.answerId);
        if (req.body.token.accessLevel > 0 || req.body.token.email === answer.submittedBy) {

          delete req.body._id;
          Object.assign(answer, req.body);
          answer.submittedBy = req.body.token.email;

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
        }else{
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
      });
  };

  const del = function (req, res) {
    Question.findById(req.body.questionId)
      .exec()
      .then(function (question) {
        let answer = question.answers.id(req.body.answerId);

        if (req.body.token.accessLevel > 0 || req.body.token.email == answer.submittedBy) {
          answer.remove();
          question.totalAnswers--;
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
        }else{
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
      });
  };

  return {
    add: add,
    patch: patch,
    del: del
  }
};

module.exports = answerController;
