'use strict';

angular.module('portfolioApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('articleEdit', {
        url: '/article/edit',
        templateUrl: 'app/article/articleEdit/articleEdit.html',
        controller: 'ArticleEditCtrl'
      });
  });