'use strict';

var _ = require('lodash');
var Lesson = require('./lesson.model');

// Get list of lessons
exports.index = function(req, res) {
  var lessons = [{
    'title': '1. Fundamentals',
    'stub': 'fundamentals',
    'children': [{
      'title': '1.0. History',
      'stub': 'history'
    },{
      'title': '1.1. Electricity & electron flow',
      'stub': 'electricity'
    },{
      'title': '1.2. AC/DC',
      'stub': 'acdc'
    }]
  }, {
    'title': '2. Basics',
    'stub': 'components',
    'children':[{
      'title': '2.1. Voltage, current, and resistance',
      'stub': 'resistors'
    },{
      'title': '2.2. Signals',
      'stub': 'signals'
    },{
      'title': '2.3. Capacitors and ac circuits',
      'stub': 'capacitors'
    },{
      'title': '2.4. Inductors and transformers',
      'stub': 'inductors'
    },{
      'title': '2.5. Diodes and diode circuits',
      'stub': 'diodes'
    }]
  }];

  return res.json(200, lessons);
  // Lesson.find(function (err, lessons) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, lessons);
  // });
};

// Get a single lesson
exports.show = function(req, res) {
  var stub = req.params.stub;
  var lessons = [{
    'stub': '',
    'title': 'annoucenstnsl',
    'content': 'accounements'
  },{
    'stub': 'fundamentals',
    'title': 'fundamentals',
    'content': '**fundamentals** _content_'
  },{
    'stub': 'electricity',
    'title': 'electricity',
    'content': 'electricity content'
  },{
    'stub': 'components',
    'title': 'components',
    'content': 'components content'
  },{
    'stub': 'resistors',
    'title': 'resistors',
    'content': 'resistors content'
  },{
    'stub': 'capacitors',
    'title': 'capacitors',
    'content': 'capacitors content'
  }];

  // finds matching stub, this means that stub MUST be unique
  var lesson = _.find(lessons, function(lesson) {
    return lesson.stub === stub;
  });

  return res.json(lesson);

  // Lesson.findById(req.params.id, function(err, lesson) {
  //   if (err) {
  //     return handleError(res, err);
  //   }
  //   if (!lesson) {
  //     return res.send(404);
  //   }
  //   return res.json(lesson);
  // });
};

// Creates a new lesson in the DB.
exports.create = function(req, res) {
  Lesson.create(req.body, function(err, lesson) {
    if (err) {
      return handleError(res, err);
    }
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
