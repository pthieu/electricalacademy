'use strict';

angular.module('electricalacademyApp')
  .controller('MailinglistCtrl', function ($scope, $http) {
    $http.get('/api/mailinglists').success(function(mailinglist) {
      $scope.mailinglist = mailinglist;
    });
  });
