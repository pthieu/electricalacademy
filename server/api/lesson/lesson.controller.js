'use strict';

var _ = require('lodash');
var Q = require('q');
var Lesson = require('./lesson.model');
var LessonList = require('../lessonList/lessonList.model');

// Get list of lessons
exports.index = function(req, res) {
  Lesson.find().exec(function (err, lessons) {
    if(err) { return handleError(res, err); }
    return res.json(200, lessons);
  });
  // Lesson.find({'parent':null},'-content').lean().populate('children', '-content').exec(function (err, lessons) {
  //   if(err) { return handleError(res, err); }
  //   Lesson.populate(lessons, {
  //     path:'children.children',
  //     model: Lesson,
  //     select: '-content'
  //   }, function (err, lessons) {
  //     if(err) { return handleError(res, err); }
  //     function recursiveMap (lessons, _prefix, nest){
  //       // closeure for env, needed to retain nest
  //       var nest = nest || 0; // for resetting into child
  //       // var index = index || null; // to see where in same level node we are
  //       var _prefix = _prefix || null; // we define _prefix here to save env, then we have an individual prefix in the .map function because we don't want to append to this one for each element
  //       return lessons.map(function (lesson, i) {
  //         delete lesson.content;
  //         var prefix = nest===0 ? i+1 : _prefix+'.'+i;
  //         lesson.title = prefix+' '+lesson.title;
  //         if (lesson.children.length > 0){
  //           lesson.children = recursiveMap(lesson.children, prefix, nest+1)
  //         }
  //         return lesson;
  //       });
  //     }
  //     var numberedLessons = recursiveMap(lessons, 1);
  //     return res.json(200, lessons);
  //   });
  // });
};

// Get a single lesson
exports.show = function(req, res) {
  var stub = req.params.stub;
  Lesson.findOne({
    'stub': stub
  }).exec(function(err, lesson) {
    if (err) {
      return handleError(res, err);
    }
    if (!lesson) {
      return res.send(404);
    }
    return res.json(lesson);
  });
};

exports.lessonById = function(req, res) {
  Lesson.findById(req.params.id, function (err, lesson) {
    if(err) { return handleError(res, err); }
    if(!lesson) { return res.send(404); }
    return res.json(lesson);
  });
};

// Creates a new lesson in the DB.
exports.create = function(req, res) {
  Q.fcall(function () {
    var deferred = Q.defer();
    Lesson.create(req.body, function(err, lesson) {
      if (err) {return handleError(res, err);}
      deferred.resolve(lesson);
    });
    return deferred.promise;
  }).then(function (lesson) {
    return res.json(201, lesson);
  });
};

// Updates an existing lesson in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Lesson.findById(req.params.id, function(err, lesson) {
    if (err) {
      return handleError(res, err);
    }
    if (!lesson) {
      return res.send(404);
    }
    var updated = _.merge(lesson, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, lesson);
    });
  });
};

// Deletes a lesson from the DB.
exports.destroy = function(req, res) {
  Lesson.findById(req.params.id, function(err, lesson) {
    if (err) {
      return handleError(res, err);
    }
    if (!lesson) {
      return res.send(404);
    }
    lesson.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
