'use strict';

var express = require('express');
var controller = require('./lesson.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:stub', controller.show);
router.get('/lessonById/:id', controller.lessonById);
router.get('/lessonByStub/:stub', controller.lessonByStub);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;