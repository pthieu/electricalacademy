'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');

// This holds the whole fucking lesson list
var LessonListSchema = new Schema({
  list: {
    type: Object,
    required: true
  },
  _expired: {
    type: Boolean,
    default: false,
    required: true
  },
  _created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LessonList', LessonListSchema);