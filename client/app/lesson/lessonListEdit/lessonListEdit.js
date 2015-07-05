'use strict';

angular.module('electricalacademyApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('lessonListEdit', {
        url: '/lessonList/edit',
        templateUrl: 'app/lesson/lessonListEdit/lessonListEdit.html',
        controller: 'LessonListEditCtrl'
      })
      .state('lessonListEdit_new', {
        url: '/lessonList/edit/:lesson_stub',
        templateUrl: 'app/lesson/lessonListEdit/lessonListEdit.html',
        controller: 'LessonListEditCtrl'
      });
  });
