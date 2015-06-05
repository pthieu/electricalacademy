'use strict';

angular.module('portfolioApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('articleFocus', {
        url: '/article/:article_id',
        templateUrl: 'app/article/article.html',
        controller: 'ArticleCtrl'
      })
      .state('article', {
        url: '/article',
        templateUrl: 'app/article/article.html',
        controller: 'ArticleCtrl'
      });
  });