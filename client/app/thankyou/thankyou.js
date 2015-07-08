'use strict';

angular.module('electricalacademyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('thankyou_type', {
        url: '/thankyou/:msg_type',
        templateUrl: 'app/thankyou/thankyou.html',
        controller: 'ThankyouCtrl',
        resolve: {
          $title: function () { return 'Thank you for signing up to Electrical Academy!'; },
          $description: function () { return 'Thanks for signing up, we hope you spend some more time around here and come back tomorrow!'; }
        }
      })
      .state('thankyou', {
        url: '/thankyou',
        templateUrl: 'app/thankyou/thankyou.html',
        controller: 'ThankyouCtrl',
        resolve: {
          $title: function () { return 'Thank you for visiting Electrical Academy'; },
          $description: function () { return 'Thanks for visiting us, we hope you spend some more time around here and come back tomorrow!'; }
        }
      });
  });