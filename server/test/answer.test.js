"use strict";

process.env.ENV = 'test';

const Question = require('../model/question.model').Question;
const Module = require('../model/module.model').Module;

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

const tokens = require('./tokens.json');

const lecturerToken = tokens.lecturer;
const studentToken = tokens.student1;
const studentToken2 = tokens.student2;
const adminToken = tokens.admin;

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
