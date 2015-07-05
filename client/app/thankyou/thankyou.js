'use strict';

angular.module('electricalacademyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('thankyou_type', {
        url: '/thankyou/:msg_type',
        templateUrl: 'app/thankyou/thankyou.html',
        controller: 'ThankyouCtrl'
      })
      .state('thankyou', {
        url: '/thankyou',
        templateUrl: 'app/thankyou/thankyou.html',
        controller: 'ThankyouCtrl'
      });
  });