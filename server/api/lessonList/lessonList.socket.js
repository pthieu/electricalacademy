/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var LessonList = require('./lessonList.model');

exports.register = function(socket) {
  LessonList.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  LessonList.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('lessonList:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lessonList:remove', doc);
}