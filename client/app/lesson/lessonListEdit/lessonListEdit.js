'use strict';

angular.module('electricalacademyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lessonListEdit', {
        url: '/lessonList/edit/:lesson_stub',
        templateUrl: 'app/lesson/lessonListEdit/lessonListEdit.html',
        controller: 'LessonListEditCtrl'
      });
  });