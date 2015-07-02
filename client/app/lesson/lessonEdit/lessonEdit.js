'use strict';

angular.module('electricalacademyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lessonEdit', {
        url: '/lessonEdit',
        templateUrl: 'app/lesson/lessonEdit/lessonEdit.html',
        controller: 'LessonEditCtrl'
      });
  });