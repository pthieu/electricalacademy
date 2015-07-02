'use strict';

var _ = require('lodash');
var LessonList = require('./lessonList.model');

// Get list of lessonLists
exports.index = function(req, res) {
  // LessonList.find(function (err, lessonLists) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, lessonLists);
  // });
  
  LessonList.findOne({'_expired':false}).exec(function (err, lessonList) {
    if(err) { return handleError(res, err); }
    return res.json(200, lessonList.list);
  });
};

// Get a single lessonList
exports.show = function(req, res) {
  LessonList.findById(req.params.id, function (err, lessonList) {
    if(err) { return handleError(res, err); }
    if(!lessonList) { return res.send(404); }
    return res.json(lessonList);
  });
};

// Creates a new lessonList in the DB.
exports.create = function(req, res) {
  LessonList.create(req.body, function(err, lessonList) {
    if(err) { return handleError(res, err); }
    return res.json(201, lessonList);
  });
};

// Updates an existing lessonList in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  LessonList.findById(req.params.id, function (err, lessonList) {
    if (err) { return handleError(res, err); }
    if(!lessonList) { return res.send(404); }
    var updated = _.merge(lessonList, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, lessonList);
    });
  });
};

// Deletes a lessonList from the DB.
exports.destroy = function(req, res) {
  LessonList.findById(req.params.id, function (err, lessonList) {
    if(err) { return handleError(res, err); }
    if(!lessonList) { return res.send(404); }
    lessonList.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}