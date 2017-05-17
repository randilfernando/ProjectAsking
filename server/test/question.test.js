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
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTE4MTNiYjliZmU2OTdjMWJkMGE5N2IiLCJlbWFpbCI6InJhbmRpbF9mZXJuYW5kbzEyM0Bob3RtYWlsLmNvbSIsIm5hbWUiOiJBZG1pbmlzdHJhdG9yIDEiLCJhY2Nlc3NMZXZlbCI6MiwiZXhwIjoxNDk1NDQ2NjE2LCJpYXQiOjE0OTQ4NDE4MTZ9.JyTS3awEXLRtWioP1cE9IbxCIHHk8dQZGgqfR813xns';

chai.use(chaiHttp);

describe('Questions', () => {

  //Add module before
  before(() => {
    let module = new Module();
    module.moduleCode = 'CS2200';
    module.moduleName = 'Object oriented programming';
    module.topics = ['Inception phase'];
    module.save();
  });

  //Remove added module
  after((done) => {
    Module.remove({}, (err) => {
      done();
    })
  });

  //Before each test empty the database
  beforeEach((done) => {
    Question.remove({}, (err) => {
      done();
    });
    Module.update({},
      {
        $set: {"module.$.totalQuestions": 0}
      },
      {
        "multi": true
      }
    );
  });

  describe('/api/question:GET questions by student', () => {
    it('it should GET all the questions', (done) => {
      chai.request(server)
        .get('/api/question')
        .set('x-jwt-token', studentToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/api/question:GET questions by lecturer', () => {
    it('it should GET all the questions', (done) => {
      chai.request(server)
        .get('/api/question')
        .set('x-jwt-token', lecturerToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/api/question:GET questions by admin', () => {
    it('it should GET all the questions', (done) => {
      chai.request(server)
        .get('/api/question')
        .set('x-jwt-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/api/question:POST question with required attributes', () => {
    it('it should add a new question', (done) => {
      let question = {
        "title": 'Test Question',
        "moduleCode": 'CS2200'
      };

      chai.request(server)
        .post('/api/question/')
        .set('x-jwt-token', studentToken)
        .send(question)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Success');
          done();
        });
    });
  });

  describe('/api/question:POST question without required attributes', () => {
    it('it should add a new question', (done) => {
      let question = {
        "moduleCode": 'CS2200'
      };

      chai.request(server)
        .post('/api/question/')
        .set('x-jwt-token', studentToken)
        .send(question)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('title');
          res.body.errors.title.should.have.property('kind').eql('required');
          done();
        });
    });
  });

  describe('/api/question:POST question with valid topic', () => {
    it('it should add a new question', (done) => {
      let question = {
        "title": 'Test Question',
        "moduleCode": 'CS2200',
        "topic": 'Inception phase'
      };

      chai.request(server)
        .post('/api/question/')
        .set('x-jwt-token', studentToken)
        .send(question)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Success');
          done();
        });
    });
  });

  describe('/api/question:POST question with invalid topic', () => {
    it('it should return a invalid topic response', (done) => {
      let question = {
        "title": 'Test Question',
        "moduleCode": 'CS2200',
        "topic": 'Invalid topic'
      };

      chai.request(server)
        .post('/api/question/')
        .set('x-jwt-token', studentToken)
        .send(question)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Not a valid topic');
          done();
        });
    });
  });

  describe('/api/question:POST question using invalid moduleCode', () => {
    it('it should send a module not found error', (done) => {
      let question = {
        "title": 'Test Question',
        "moduleCode": 'CS2300'
      };

      chai.request(server)
        .post('/api/question/')
        .set('x-jwt-token', studentToken)
        .send(question)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Module not found');
          done();
        });
    });
  });

  describe('/api/question:POST questions by lecturer', () => {
    it('it should send a access required message', (done) => {
      let question = {
        "title": 'Test Question',
        "moduleCode": 'CS2200'
      };

      chai.request(server)
        .post('/api/question/')
        .set('x-jwt-token', lecturerToken)
        .send(question)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Forbidden access');
          done();
        });
    });
  });

  describe('/api/question:POST questions by admin', () => {
    it('it should send a access required message', (done) => {
      let question = {
        "title": 'Test Question',
        "moduleCode": 'CS2200'
      };

      chai.request(server)
        .post('/api/question/')
        .set('x-jwt-token', adminToken)
        .send(question)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Forbidden access');
          done();
        });
    });
  });

});
