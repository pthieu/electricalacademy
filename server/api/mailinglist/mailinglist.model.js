'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MailinglistSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please enter a valid email.'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email.']
  },
  _created: {
    type: Date,
    default: Date.now
  }
});

/**
 * Validations
 */

function validateEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

MailinglistSchema.virtual('date')
  .get(function() {
    return this._id.getTimestamp();
  });

module.exports = mongoose.model('MailingList', MailinglistSchema);
