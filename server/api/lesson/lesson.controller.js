'use strict';

var _ = require('lodash');
var Lesson = require('./lesson.model');

// Get list of lessons
exports.index = function(req, res) {
  var lessons = [{
    'id': 1,
    'title': '1. Fundamentals',
    'url': 'basics',
    'children': [{
      'id': 11,
      'title': '1.1. moiré-vision',
      'url': 'components',
      'children': [{
        'id': 111,
        'title': '1.1.1. tofu-animation',
        'url': 'resistors',
        'children': [{
          'id': 1111,
          'title': '1.1.1.1. spooky-giraffe',
          'children': []
        }, {
          'id': 1112,
          'title': '1.1.1.2 bubble-burst',
          'children': []
        }]
      }, {
        'id': 12,
        'title': '1.2. barehand-atomsplitting',
        'url': 'capacitors',
        'children': []
      }]
    }]
  }, {
    'id': 2,
    'title': '2. unicorn-zapper',
    'url': 'some/url/2',
    'children': []
  }, {
    'id': 3,
    'title': '3. unicorn-zapper',
    'url': 'some/url/3',
    'children': []
  }, {
    'id': 4,
    'title': '4. romantic-transclusion',
    'url': 'some/url/4',
    'children': []
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
    'stub': 'basics',
    'title': 'basics',
    'content': 'basics content'
  },{
    'stub': 'resistors',
    'title': 'resistors',
    'content': 'resistors content'
  }];

  // finds matching stub, this means that stub MUST be unique
  var lesson = _.find(lessons, function (lesson) {
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
