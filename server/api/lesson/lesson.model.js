'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');

var LessonSchema = new Schema({
  stub: { // This is for SEO purposes, so URL has some type of lookup via legible words
    type: String,
    required: true,
    unique: true
  },
  title: { // NO MARKDOWN FOR THIS, just straight up text for separating from content
    type: String,
    required: true
  },
  content: { // Actual content, use markdown to make text look good
    type: String,
    required: true
  },
  parent:{
    type: Schema.Types.ObjectId,
    default: null
  },
  children: [{
    type: Schema.Types.ObjectId,
    ref: 'Lesson'
  }]
});

LessonSchema.plugin(deepPopulate);

module.exports = mongoose.model('Lesson', LessonSchema);