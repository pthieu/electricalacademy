'use strict';

angular.module('portfolioApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('article.focus', {
        url: '/:article_id',
        templateUrl: 'app/article/articleFocus/articleFocus.html',
        controller: 'ArticleFocusCtrl'
      });
  });