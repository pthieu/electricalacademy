'use strict';

angular.module('electricalAcademyApp')
  .controller('MainCtrl', ['$scope', '$http', 'socket', function ($scope, $http, socket) {
  $scope.getArticleFocusDate = function (article, _section) {
    var t = new Date(article._created)
    var returnSection;
    switch(_section){
      case 'year':
        returnSection = t.getUTCFullYear();
        break;
      case 'month':
        returnSection = t.getUTCMonth()+1; //getUTCMonth() returns 0-11, not 1-12 we need to +1 here so URL makes sense, and then -1 in backend
        break;
      case 'day':
        returnSection = t.getUTCDate();
        break;
    }
    return returnSection;
  };
  // Grab existing articles
  $http.get('/api/articles').success(function(articles) {
    // Truncate content for each article so dashboard isn't cluttered
    // $scope.articles = articles.map(function(_article) {
    //   var _content = _article.content;
    //   var trunc_length = 200; // truncation length in characters
    //   _article.content = _content.substring(0, trunc_length).concat((_content.length > trunc_length + 1) ? '...' : ''); // Take only 100 characters and then add ellipses
    //   return _article;
    // });
    $scope.articles = articles; // Above commented out because we can't just truncate because markdown will break in some cases when text not enclosed with ending tag
  });

  // $scope.awesomeThings = [];

  // $http.get('/api/things').success(function(awesomeThings) {
  //   $scope.awesomeThings = awesomeThings;
  //   socket.syncUpdates('thing', $scope.awesomeThings);
  // });

  // $scope.addThing = function() {
  //   if ($scope.newThing === '') {
  //     return;
  //   }
  //   $http.post('/api/things', {
  //     name: $scope.newThing
  //   });
  //   $scope.newThing = '';
  // };

  // $scope.deleteThing = function(thing) {
  //   $http.delete('/api/things/' + thing._id);
  // };

  // $scope.$on('$destroy', function() {
  //   socket.unsyncUpdates('thing');
  // });
  }]);
