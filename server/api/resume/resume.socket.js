/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Resume = require('./resume.model');

exports.register = function(socket) {
  Resume.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Resume.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('resume:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('resume:remove', doc);
}