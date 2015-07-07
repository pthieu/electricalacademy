'use strict';

var express = require('express');
var controller = require('./lesson.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:stub', controller.show);
router.get('/lessonById/:id', controller.lessonById);
router.get('/lessonByStub/:stub', controller.lessonByStub);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;