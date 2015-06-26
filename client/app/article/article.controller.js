'use strict';

angular.module('electricalAcademyApp')
  .controller('ArticleCtrl', function($scope, $http) {
    $http.get('/api/articles').success(function(articles) {
      // Truncate content for each article so dashboard isn't cluttered
      $scope.articles = articles.map(function(_article) {
        var _content = _article.content;
        var trunc_length = 200; // truncation length in characters
        _article.content = _content.substring(0, trunc_length).concat((_content.length > trunc_length + 1) ? '...' : ''); // Take only 100 characters and then add ellipses
        return _article;
      });
    });
  });