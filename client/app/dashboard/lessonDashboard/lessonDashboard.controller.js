'use strict';

angular.module('electricalacademyApp')
  .controller('LessonDashboardCtrl', function ($scope, $http, $location) {
    $scope.$location = $location;
    $http.get('/api/lessons').success(function(lessons) {
      $scope.lessons = lessons;
    });
  });