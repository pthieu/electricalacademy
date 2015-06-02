'use strict';

angular.module('portfolioApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('articleEdit', {
        url: '/article/edit/:article_id',
        templateUrl: 'app/article/articleEdit/articleEdit.html',
        controller: 'ArticleEditCtrl',
        authenticate: true
      })
      .state('articleCreate', {
        url: '/article/edit',
        templateUrl: 'app/article/articleEdit/articleEdit.html',
        controller: 'ArticleEditCtrl',
        authenticate: true
      });
  });