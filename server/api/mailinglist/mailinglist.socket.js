/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Mailinglist = require('./mailinglist.model');

exports.register = function(socket) {
  Mailinglist.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Mailinglist.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('mailinglist:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('mailinglist:remove', doc);
}