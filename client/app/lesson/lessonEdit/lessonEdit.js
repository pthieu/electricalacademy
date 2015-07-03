'use strict';

angular.module('electricalacademyApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('lessonEdit', {
        url: '/lessonEdit/edit/:lesson_id',
        templateUrl: 'app/lesson/lessonEdit/lessonEdit.html',
        controller: 'LessonEditCtrl',
        authenticate: true
      })
      .state('lessonCreate', {
        url: '/lessonEdit/edit',
        templateUrl: 'app/lesson/lessonEdit/lessonEdit.html',
        controller: 'LessonEditCtrl',
        resolve: {
          $title: function() {
            return 'Lesson Edit';
          }
        }
      });
  });
