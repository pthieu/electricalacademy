'use strict';

angular.module('portfolioApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('resume', {
        url: '/resume',
        templateUrl: 'app/resume/resume.html',
        controller: 'ResumeCtrl',
        resolve: {
          $title: function () { return 'Resume'; }
        }
      });
  });