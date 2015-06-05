'use strict';

angular.module('portfolioApp')
  .controller('ArticleFocusCtrl', function ($scope, $http, $stateParams) {
  	$scope.articleID = (typeof $stateParams.article_id === 'undefined' || $stateParams.article_id === '') ? null : $stateParams.article_id;
    $http.get('/api/articles/'+$scope.articleID).success(function(article) {
      // Truncate content for each article so dashboard isn't cluttered
      $scope.article = article;
    });
  });
