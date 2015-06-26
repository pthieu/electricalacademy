'use strict';

angular.module('electricalacademyApp')
  .controller('LessonCtrl', function ($scope, $http) {
    $http.get('/api/lessons').success(function(lessons) {
      $scope.lessons = lessons;
    });
  });