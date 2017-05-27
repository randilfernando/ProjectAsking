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
const adminToken = tokens.admin;

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
