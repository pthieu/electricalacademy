'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var LessonList = require('./lessonList.model');

var lessonList = new LessonList({
  "list": [{
    "children": [],
    "lessonRef": "introduction",
    "order": 1,
    "title": "Introduction"
  }],
  "_expired": false,
  "__v": 0
});

describe('lessonLists API Suite', function() {
  before(function (done) {
    lessonList.save(function (err) {
      if (err) return done(err);
      done();
    });
  });
  after(function () {
    return LessonList.remove().exec();
  });

  describe('GET /api/lessonLists', function() {
    it('should respond with JSON array with at least one lesson', function(done) {
      request(app)
        .get('/api/lessonLists')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          res.body.length.should.be.above(0);
          done();
        });
    });
  });
});
