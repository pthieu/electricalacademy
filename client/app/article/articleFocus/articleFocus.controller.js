'use strict';

angular.module('portfolioApp')
  .controller('ArticleFocusCtrl', function ($scope, $http, $stateParams) {
    // function to go back in history
    $scope.$back = function() { 
      // TODO: check to see if URL is correct to go back, if not then go to home, otherwise back() will go to another webpage
      window.history.back();
    };
    $scope.articleStub = (typeof $stateParams.article_stub === 'undefined' || $stateParams.article_stub === '') ? null : $stateParams.article_stub;
    $scope.articleYear = (typeof $stateParams.article_year === 'undefined' || $stateParams.article_year === '') ? null : $stateParams.article_year;
    $scope.articleMonth = (typeof $stateParams.article_month === 'undefined' || $stateParams.article_month === '') ? null : $stateParams.article_month;
    $scope.articleDay = (typeof $stateParams.article_day === 'undefined' || $stateParams.article_day === '') ? null : $stateParams.articdaytub;

    $http.get('/api/articles/'+$scope.articleID, {
      data:{
        stub: $scope.articleStub,
        year: $scope.articleYear,
        month: $scope.articleMonth,
        day: $scope.articleDay
      }
    }).success(function(article) {
      // Truncate content for each article so dashboard isn't cluttered
      $scope.article = article;
    });
  });