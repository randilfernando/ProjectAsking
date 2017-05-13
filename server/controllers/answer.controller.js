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

  const put = function (req, res) {
    Question.findById(req.body.questionId)
      .exec()
      .then(function (question) {
        let answer = question.answers.id(req.body.answerId);

        answer.answer = req.body.answer;
        answer.totalRatings = req.body.totalRatings;
        answer.totalComments = req.body.totalComments;

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
    Question.findById(req.body.questionId)
      .exec()
      .then(function (question) {
        let answer = question.answers.id(req.body.answerId);
        if (req.body.token.accessLevel > 0 || req.body.token.email == answer.submittedBy) {
          delete req.body._id;
          for (let p in req.body) {
            answer[p] = req.body[p];
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
        console.log('error: ', err);
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
        console.log('error: ', err);
      });
  };

  return {
    add: add,
    put: put,
    patch: patch,
    del: del
  }
};

module.exports = answerController;
