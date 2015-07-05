'use strict';

angular.module('electricalacademyApp')
  .controller('LandingCtrl', function ($scope, $http, $location) {
    $scope.errors = {
      exists:false
    };
    $scope.user = {};

    $scope.signup = function (form) {
      $scope.submitted = true;
      $scope.errors.exists = !_.isEmpty(form.email.$error);

      var req = {
        method: 'POST',
        url: '/api/mailinglists',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
          email: $scope.user.email
        }
      }

      if(form.$valid) {
        $http(req).success(function(mailinglist, status, headers, config) {
          //url doesn't do a weird uriencode
          $location.url('/thankyou/mailinglist?email='+mailinglist.email); // Redirect to dashboard if success
        }).error(function(data, status, headers, config) {
          $scope.submitted = false;
          //MongoDB case
          if (!!data.err){
            $scope.errors.exists = false;
            $scope.errors.other = '';
            $scope.errors.other = (data.code===11000)?'Email already submitted: '+$scope.user.email:data.err
          }
          else{
            $scope.errors.other = data.errors.email.message;
          }
        });
      }
      else{
        $scope.submitted = false;
      }
    };
  });