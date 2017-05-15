"use strict";

process.env.NODE_ENV = 'test';

const User = require('../model/user.model').User;
const TempUser = require('../model/tempUser.model').TempUser;
const Module = require('../model/module.model').Module;

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

const lecturerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTEzNTRlMDFjNjZhYjBiZTA1YTU5ODciLCJlbWFpbCI6InJhbmRpbC5mZXJuYW5kby5yZkBnbWFpbC5jb20iLCJuYW1lIjoiUmFuZGlsIExha3NoaXRoYSIsImFjY2Vzc0xldmVsIjoxLCJleHAiOjE0OTUzMzI0NjQsImlhdCI6MTQ5NDcyNzY2NH0.bQrBRJBdNiGKfoQVVMmEbTmtPvsaO4uj0HgJyZJcVC8';
const studentToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTE0MzM4MjI4ZTlmZDI3ZjAwYTA5YWIiLCJlbWFpbCI6InJhbmRpbC5mZXJuYW5kby4xNEBjc2UubXJ0LmFjLmxrIiwibmFtZSI6IlN0dWRlbnQgMSIsImFjY2Vzc0xldmVsIjowLCJleHAiOjE0OTU0NjM4OTQsImlhdCI6MTQ5NDg1OTA5NH0.89tp7ir3HTLA0I7U3mtSFMYyHYiCMM0p7idnrIarmiA';
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTE4MTNiYjliZmU2OTdjMWJkMGE5N2IiLCJlbWFpbCI6InJhbmRpbF9mZXJuYW5kbzEyM0Bob3RtYWlsLmNvbSIsIm5hbWUiOiJBZG1pbmlzdHJhdG9yIDEiLCJhY2Nlc3NMZXZlbCI6MiwiZXhwIjoxNDk1NDQ2NjE2LCJpYXQiOjE0OTQ4NDE4MTZ9.JyTS3awEXLRtWioP1cE9IbxCIHHk8dQZGgqfR813xns';

chai.use(chaiHttp);

describe('Answers', () => {

  let moduleId;

  //Add users before
  before((done) => {
    let user1 = new User();
    user1.name = 'Admin';
    user1.email = 'randil_fernando123@hotmail.com';
    user1.setPassword('ls 4 ever');
    user1.accessLevel = 2;
    user1.save((err) => {
      let user2 = new User();
      user2.name = 'Lecturer';
      user2.email = 'randil.fernando.rf@gmail.com';
      user2.setPassword('ls 4 ever');
      user2.accessLevel = 1;
      user2.save((err) => {
        let user3 = new User();
        user3.name = 'Student';
        user3.email = 'randil.fernando.14@cse.mrt.ac.lk';
        user3.setPassword('ls 4 ever');
        user3.accessLevel = 0;
        user3.save((err) => {
          let module1 = new Module();
          module1.moduleCode = 'CS2200';
          module1.moduleName = 'Object oriented programming';
          module1.topics = ['Inception phase'];
          module1.save((err, module) => {
            moduleId = module._id;
            done();
          });
        });
      });
    });
  });

  //Remove added users
  after((done) => {
    User.remove({}, (err) => {
      Module.remove((err) => {
        done();
      });
    })
  });

  beforeEach((done) => {
    TempUser.remove({}, (err) => {
      done();
    })
  });

  describe('/api/user/register:POST register for new account', () => {
    it('it should add a new user and send confirmation email', (done) => {
      let user = {
        "name": 'test',
        "email": 'test@gmail.com',
        "password": 'test123'
      };

      chai.request(server)
        .post('/api/user/register/')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Confirmation message sent to email address');
          done();
        });
    });
  });

  describe('/api/user/login:POST login student', () => {
    it('it should login student and return token', (done) => {
      let user = {
        "email": 'randil.fernando.14@cse.mrt.ac.lk',
        "password": 'ls 4 ever'
      };

      chai.request(server)
        .post('/api/user/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('accessLevel').eq(0);
          done();
        });
    });
  });

  describe('/api/user/login:POST login lecturer', () => {
    it('it should login lecturer and return token', (done) => {
      let user = {
        "email": 'randil.fernando.rf@gmail.com',
        "password": 'ls 4 ever'
      };

      chai.request(server)
        .post('/api/user/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('accessLevel').eq(1);
          done();
        });
    });
  });

  describe('/api/user/login:POST login admin', () => {
    it('it should login and return token', (done) => {
      let user = {
        "email": 'randil_fernando123@hotmail.com',
        "password": 'ls 4 ever'
      };

      chai.request(server)
        .post('/api/user/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('accessLevel').eq(2);
          done();
        });
    });
  });

});
