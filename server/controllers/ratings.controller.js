"use strict";

const ratingController = function (Question) {

  const rateUpQuestion = function (req, res) {
    Question.findById(req.body.questionId)
      .exec()
      .then(function (question) {
        let preRate = question.totalRatings;
        question.ratings.addToSet(req.body.token.email);
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
              res.send(err);
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
        res.send(err);
      });
  };

  const rateDownQuestion = function (req, res) {
    Question.findById(req.body.questionId)
      .exec()
      .then(function (question) {
        let preRate = question.totalRatings;
        let index = question.ratings.indexOf(req.body.token.email);
        if (index > -1) {
          question.ratings.splice(index, 1);
        }
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
              res.send(err);
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
        res.send(err);
      });
  };

  const rateUpAnswer = function (req, res) {
    Question.findById(req.body.questionId)
      .exec()
      .then(function (question) {
        let answer = question.answers.id(req.body.answerId);
        if(answer) {
          let preRate = answer.totalRatings;
          answer.ratings.addToSet(req.body.token.email);
          answer.totalRatings = answer.ratings.length;
          if (preRate < answer.totalRatings) {
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
            res.status(203);
            res.send({
              message: 'Already rated'
            });
          }
        }else{
          res.status(404);
          res.send({
            message: 'Answer not found'
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

  const rateDownAnswer = function (req, res) {
    Question.findById(req.body.questionId)
      .exec()
      .then(function (question) {
        let answer = question.answers.id(req.body.answerId);
        if(answer) {
          let preRate = answer.totalRatings;
          let index = answer.ratings.indexOf(req.body.token.email);
          if (index > -1) {
            answer.ratings.splice(index, 1);
          }
          answer.totalRatings = answer.ratings.length;
          if (preRate > answer.totalRatings) {
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
            res.status(203);
            res.send({
              message: 'Already rated'
            });
          }
        }else{
          res.status(404);
          res.send({
            message: 'Answer not found'
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
    rateUpQuestion: rateUpQuestion,
    rateDownQuestion: rateDownQuestion,
    rateUpAnswer: rateUpAnswer,
    rateDownAnswer: rateDownAnswer
  }
};

module.exports = ratingController;
