"use strict";

process.env.ENV = 'test';

const Question = require('../model/question.model').Question;
const Module = require('../model/module.model').Module;

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

const lecturerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTEzNTRlMDFjNjZhYjBiZTA1YTU5ODciLCJlbWFpbCI6InJhbmRpbC5mZXJuYW5kby5yZkBnbWFpbC5jb20iLCJuYW1lIjoiUmFuZGlsIExha3NoaXRoYSIsImFjY2Vzc0xldmVsIjoxLCJleHAiOjE0OTUzMzI0NjQsImlhdCI6MTQ5NDcyNzY2NH0.bQrBRJBdNiGKfoQVVMmEbTmtPvsaO4uj0HgJyZJcVC8';
const studentToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTE0MzM4MjI4ZTlmZDI3ZjAwYTA5YWIiLCJlbWFpbCI6InJhbmRpbC5mZXJuYW5kby4xNEBjc2UubXJ0LmFjLmxrIiwibmFtZSI6IlJhbmRpbCBGZXJuYW5kbyIsImFjY2Vzc0xldmVsIjowLCJleHAiOjE0OTUzMzI1MTUsImlhdCI6MTQ5NDcyNzcxNX0.vWDqDNgtQBjPeldVGE9-J9KxSp_7hMAMXdQlSDi7ssE';
const studentToken2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTE5NmM5YjljYjFjYjNiMDY0MTQyM2QiLCJlbWFpbCI6InJhbmRpbF9mZXJuYW5kbzQ1NkBob3RtYWlsLmNvbSIsIm5hbWUiOiJTdHVkZW50IDIiLCJhY2Nlc3NMZXZlbCI6MCwiZXhwIjoxNDk1NDU5MjAyLCJpYXQiOjE0OTQ4NTQ0MDJ9.9YbF5fYsRSZI1scwwbfge8tYgswD3xpnWtvNAPwNeww';
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTE4MTNiYjliZmU2OTdjMWJkMGE5N2IiLCJlbWFpbCI6InJhbmRpbF9mZXJuYW5kbzEyM0Bob3RtYWlsLmNvbSIsIm5hbWUiOiJBZG1pbmlzdHJhdG9yIDEiLCJhY2Nlc3NMZXZlbCI6MiwiZXhwIjoxNDk1NDQ2NjE2LCJpYXQiOjE0OTQ4NDE4MTZ9.JyTS3awEXLRtWioP1cE9IbxCIHHk8dQZGgqfR813xns';

chai.use(chaiHttp);

describe('Answers', () => {

  let questionId;
  let answerId;

  //Add modules before
  before((done) => {
    let module1 = new Module();
    module1.moduleCode = 'CS2200';
    module1.moduleName = 'Object oriented programming';
    module1.totalQuestions = 1;
    module1.topics = ['Inception phase'];
    module1.save()
      .then(function () {
        done();
      });
  });

  //Remove added module
  after((done) => {
    Question.remove({}, (err) => {
      Module.remove({}, (err) => {
        done();
      });
    });
  });

  //Before each test empty the database
  beforeEach((done) => {
    Module.update({},
      {
        $set: {"module.$.totalQuestions": 0}
      },
      {
        "multi": true
      }
    );
    Question.remove({})
      .then(function () {
        let question1 = new Question();
        question1.title = 'Sample Question';
        question1.moduleCode = 'CS2200';
        question1.moduleName = 'Object oriented programming';
        question1.submittedBy = 'test@gmail.com';
        question1.description = 'Sample question';
        question1.totalAnswers = 1;
        question1.answers.push({answer: 'Test', submittedBy: 'randil.fernando.14@cse.mrt.ac.lk'});
        question1.save()
          .then(function (question) {
            questionId = question._id;
            answerId = question.answers[0]._id;
            done();
          });
      });
  });

  describe('/api/answer:POST answer with required attributes by student', () => {
    it('it should add a new answer and return id', (done) => {
      let request = {
        "questionId": questionId,
        "answer": {"answer": 'Test answer'}
      };

      chai.request(server)
        .post('/api/answer/')
        .set('x-jwt-token', studentToken)
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('message').eq('Success');
          done();
        });
    });
  });

  describe('/api/answer:POST answer with required attributes by teacher', () => {
    it('it should add a new answer and return id', (done) => {
      let request = {
        "questionId": questionId,
        "answer": {"answer": 'Test answer'}
      };

      chai.request(server)
        .post('/api/answer/')
        .set('x-jwt-token', lecturerToken)
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('message').eq('Success');
          done();
        });
    });
  });

  describe('/api/answer:POST answer with required attributes by admin', () => {
    it('it should send unauthorized error', (done) => {
      let request = {
        "questionId": questionId,
        "answer": {"answer": 'Test answer'}
      };

      chai.request(server)
        .post('/api/answer/')
        .set('x-jwt-token', adminToken)
        .send(request)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Forbidden access');
          done();
        });
    });
  });

  describe('/api/answer:POST answer with invalid questionId by student', () => {
    it('it should send question not found error', (done) => {
      let request = {
        "questionId": '64f3b406b2fa880fd8b3bfd0',
        "answer": {"answer": 'Test answer'}
      };

      chai.request(server)
        .post('/api/answer/')
        .set('x-jwt-token', studentToken)
        .send(request)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/api/answer:POST answer without required attributes by student', () => {
    it('it should send question not found error', (done) => {
      let request = {
        "questionId": questionId,
        "answer": {}
      };

      chai.request(server)
        .post('/api/answer/')
        .set('x-jwt-token', studentToken)
        .send(request)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.should.have.property('message').eql('Question validation failed');
          done();
        });
    });
  });

  describe('/api/answer:PATCH answer submitted by the same student', () => {
    it('it should update answer', (done) => {
      let request = {
        "questionId": questionId,
        "answerId": answerId,
        "answer": 'Test Answer'
      };

      chai.request(server)
        .patch('/api/answer/')
        .set('x-jwt-token', studentToken)
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Success');
          done();
        });
    });
  });

  describe('/api/answer:PATCH answer submitted by different student', () => {
    it('it should send unauthorized access error', (done) => {
      let request = {
        "questionId": questionId,
        "answerId": answerId,
        "answer": {"answer": 'Test Answer'}
      };

      chai.request(server)
        .patch('/api/answer/')
        .set('x-jwt-token', studentToken2)
        .send(request)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Unauthorized access');
          done();
        });
    });
  });

  describe('/api/answer:PATCH answer by lecturer', () => {
    it('it should update answer', (done) => {
      let request = {
        "questionId": questionId,
        "answerId": answerId,
        "answer": 'Test Answer'
      };

      chai.request(server)
        .patch('/api/answer/')
        .set('x-jwt-token', lecturerToken)
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Success');
          done();
        });
    });
  });

  describe('/api/answer:PATCH answer by admin', () => {
    it('it should update answer', (done) => {
      let request = {
        "questionId": questionId,
        "answerId": answerId,
        "answer": 'Test Answer'
      };

      chai.request(server)
        .patch('/api/answer/')
        .set('x-jwt-token', adminToken)
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Success');
          done();
        });
    });
  });

  describe('/api/answer:DEL answer submitted by the same student', () => {
    it('it should delete answer', (done) => {
      let request = {
        "questionId": questionId,
        "answerId": answerId,
      };

      chai.request(server)
        .del('/api/answer/')
        .set('x-jwt-token', studentToken)
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Success');
          done();
        });
    });
  });

  describe('/api/answer:DEL answer submitted by different student', () => {
    it('it should send unauthorized access error', (done) => {
      let request = {
        "questionId": questionId,
        "answerId": answerId,
      };

      chai.request(server)
        .del('/api/answer/')
        .set('x-jwt-token', studentToken2)
        .send(request)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Unauthorized access');
          done();
        });
    });
  });

  describe('/api/answer:DEL answer by lecturer', () => {
    it('it should update answer', (done) => {
      let request = {
        "questionId": questionId,
        "answerId": answerId,
      };

      chai.request(server)
        .del('/api/answer/')
        .set('x-jwt-token', lecturerToken)
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Success');
          done();
        });
    });
  });

  describe('/api/answer:DEL answer by admin', () => {
    it('it should update answer', (done) => {
      let request = {
        "questionId": questionId,
        "answerId": answerId,
      };

      chai.request(server)
        .del('/api/answer/')
        .set('x-jwt-token', adminToken)
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Success');
          done();
        });
    });
  });

});
