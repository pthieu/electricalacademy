'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');
var auth = require('../../auth/auth.service');


var user = new User({
  provider: 'local',
  firstname: 'Fake',
  lastname: 'User',
  email: 'user@electricalacademy.com',
  password: 'password'
});
var admin = new User({
  provider: 'local',
  firstname: 'Fake',
  lastname: 'Admin',
  role: 'admin',
  email: 'admin@electricalacademy.com',
  password: 'password'
});

describe('GET /api/mailinglists', function() {
  var token;
  before(function(done) {
    // Clear users before testing
    User.remove().exec().then(function() {
      user.save(function() {
        admin.save(function () {
          request(app)
          .post('/auth/local')
          .send({ email: 'admin@electricalacademy.com', password: 'password' })
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            token = res.body.token;
            done();
          });
        });
      });
    });
  });

  after(function(done) {
    User.remove().exec().then(function() {
      done();
    });
  });

  it('should fail when getting mailinglist if user is not admin', function(done) {
    request(app)
      .get('/api/mailinglists')
      .expect(401) // 401 - unauthorized
      .end(function(err, res) {
        if (err) return done(err);
        res.text.should.equal('UnauthorizedError: No Authorization header was found');
        done();
      });
  });

  it('should respond with JSON if user admin', function(done) {
    request(app)
      .get('/api/mailinglists')
      .set('authorization', 'Bearer ' + token)
      .expect(200) // 401 - unauthorized
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
