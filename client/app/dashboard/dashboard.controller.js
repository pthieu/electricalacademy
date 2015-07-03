'use strict';

angular.module('electricalacademyApp')
  .controller('DashboardCtrl', function($scope, $http, $location) {
  	$scope.$location = $location;  
  });