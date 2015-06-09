'use strict';

angular.module('portfolioApp')
  .controller('ArticleFocusCtrl', function ($scope, $http, $stateParams) {
    // function to go back in history
    $scope.$back = function() { 
      // TODO: check to see if URL is correct to go back, if not then go to home, otherwise back() will go to another webpage
      window.history.back();
    };
    $scope.articleID = (typeof $stateParams.article_stub === 'undefined' || $stateParams.article_stub === '') ? null : $stateParams.article_stub;
    $http.get('/api/articles/'+$scope.articleID).success(function(article) {
      // Truncate content for each article so dashboard isn't cluttered
      $scope.article = article;
    });
  });
