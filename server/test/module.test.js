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

describe('Modules', () => {

  let sampleId;

  //Add modules before
  before(() => {
    let module1 = new Module();
    module1.moduleCode = 'CS2200';
    module1.moduleName = 'Object oriented programming';
    module1.topics = ['Inception phase'];
    module1.save()
      .then(function (module) {
        sampleId = module._id;
      });
    let module2 = new Module();
    module2.moduleCode = 'CS3612';
    module2.moduleName = 'Intelligent systems';
    module2.topics = ['Intelligent agents'];
    module2.save();
    let module3 = new Module();
    module3.moduleCode = 'CS2052';
    module3.moduleName = 'Computer architecture';
    module3.topics = ['Boolean algebra'];
    module3.save();
    let module4 = new Module();
    module4.moduleCode = 'CS3022';
    module4.moduleName = 'Software engineering';
    module4.topics = ['Requirement analysis'];
    module4.save();
  });

  //Remove added module
  after((done) => {
    Module.remove({}, (err) => {
      done();
    })
  });

  //Before each test empty the database
  beforeEach((done) => {
    Module.remove({'moduleCode': 'CS0000'}, (err) => {
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

  describe('/api/module:GET modules by student', () => {
    it('it should GET all the modules', (done) => {
      chai.request(server)
        .get('/api/module')
        .set('x-jwt-token', studentToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(4);
          done();
        });
    });
  });

  describe('/api/module:GET module by lecturer', () => {
    it('it should GET all the module', (done) => {
      chai.request(server)
        .get('/api/module')
        .set('x-jwt-token', lecturerToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(4);
          done();
        });
    });
  });

  describe('/api/module:GET modules by admin', () => {
    it('it should GET all the questions', (done) => {
      chai.request(server)
        .get('/api/module')
        .set('x-jwt-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(4);
          done();
        });
    });
  });

  describe('/api/module:POST module with required attributes by admin', () => {
    it('it should add a new question', (done) => {
      let module = {
        "moduleCode": 'CS0000',
        "moduleName": 'Test Module'
      };

      chai.request(server)
        .post('/api/module/')
        .set('x-jwt-token', adminToken)
        .send(module)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Success');
          done();
        });
    });
  });

  describe('/api/module:POST module without required attributes by admin', () => {
    it('it should send a validation error', (done) => {
      let module = {
        "moduleCode": 'CS2200'
      };

      chai.request(server)
        .post('/api/module/')
        .set('x-jwt-token', adminToken)
        .send(module)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('moduleName');
          res.body.errors.moduleName.should.have.property('kind').eql('required');
          done();
        });
    });
  });

  describe('/api/module:POST module by student', () => {
    it('it send a unauthorized access error', (done) => {
      let module = {
        "moduleCode": 'CS2200',
        "moduleName": 'Test Module'
      };

      chai.request(server)
        .post('/api/module/')
        .set('x-jwt-token', studentToken)
        .send(module)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Forbidden access');
          done();
        });
    });
  });

  describe('/api/module:POST module by lecturer', () => {
    it('it send a unauthorized access error', (done) => {
      let module = {
        "moduleCode": 'CS2200',
        "moduleName": 'Test Module'
      };

      chai.request(server)
        .post('/api/module/')
        .set('x-jwt-token', lecturerToken)
        .send(module)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Forbidden access');
          done();
        });
    });
  });

  describe('/api/module:PATCH valid module by admin', () => {
    it('it should update module', (done) => {
      let module = {
        "_id": sampleId,
        "moduleCode": 'CS2200',
        "moduleName": 'Test Module'
      };

      chai.request(server)
        .patch('/api/module/')
        .set('x-jwt-token', adminToken)
        .send(module)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Success');
          done();
        });
    });
  });

  describe('/api/module:PATCH invalid module by admin', () => {
    it('it should update module', (done) => {
      let module = {
        "_id": '64f3b406b2fa880fd8b3bfd0',
        "moduleCode": 'CS2200',
        "moduleName": 'Test Module'
      };

      chai.request(server)
        .patch('/api/module/')
        .set('x-jwt-token', adminToken)
        .send(module)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Module not found');
          done();
        });
    });
  });

  describe('/api/module:PATCH valid module by lecturer', () => {
    it('it should send unauthorized access', (done) => {
      let module = {
        "_id": sampleId,
        "moduleCode": 'CS2200',
        "moduleName": 'Test Module'
      };

      chai.request(server)
        .post('/api/module/')
        .set('x-jwt-token', lecturerToken)
        .send(module)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Forbidden access');
          done();
        });
    });
  });

  describe('/api/module:PATCH valid module by student', () => {
    it('it should send unauthorized access', (done) => {
      let module = {
        "_id": sampleId,
        "moduleCode": 'CS2200',
        "moduleName": 'Test Module'
      };

      chai.request(server)
        .post('/api/module/')
        .set('x-jwt-token', studentToken)
        .send(module)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Forbidden access');
          done();
        });
    });
  });

});
