'use strict';

// ResumeService controller
angular.module('portfolioApp')
  .controller('ResumeCtrl', function ($scope, $http) {
    // Find a list of jobs via ResumeService
    $scope.find = function() {
      $http.get('/api/resumes/list').success(function(jobs) {
          $scope.jobs = jobs;
        });
    };
    $scope.find()
  }
);