'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  stub: { // This is for SEO purposes, so URL has some type of lookup via legible words
    type: String,
    required: true
  },
  title: { // NO MARKDOWN FOR THIS, just straight up text for separating from content
    type: String,
    required: true
  },
  photo: { // This is for the banner spread at the top of each article so things look pretty
    type: String,
    default: null
  },
  // author: // TODO: implement this later
  content: { // Actual content, use markdown to make text look good
    type: String,
    required: true
  },
  site: { //1: ALL, 2: phongt.com, 3: electricalacademy.com
    type: Number,
    required: true
  },
  type: Number, // Sets if 1: article/essay/opinion piece/cover note, 2: tutorial, 3: less or 4:comic
  // TODO: consider changing category type to string? more understandable in DB
  category: [{ // Sets type of category, i.e. general, software, hardware, current technology, randoms, etc
      type: Number,
      default: [1]
    }
  ],
  _created: {
    type: Date,
    default: Date.now
  },
  last_updated: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Article', ArticleSchema);
