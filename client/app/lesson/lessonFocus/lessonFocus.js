'use strict';

angular.module('electricalacademyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lesson.focus', {
        url: '/:lesson_stub',
        templateUrl: 'app/lesson/lessonFocus/lessonFocus.html',
        controller: 'LessonFocusCtrl',
        resolve: {
          $title: function ($stateParams) { return 'Lessons'; }
        }
      });
  });