'use strict';

angular.module('portfolioApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('article.focus', {
        url: '/:article_stub', // note that because the state is a child state (i.e. has a dot), it will automatically append parent url section
        templateUrl: 'app/article/articleFocus/articleFocus.html',
        controller: 'ArticleFocusCtrl',
        resolve: {
          $title: function ($stateParams) { return $stateParams.article_stub.replace(/-/gi, ' '); }
        }
      });
  });