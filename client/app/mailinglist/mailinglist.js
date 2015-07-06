'use strict';

angular.module('electricalacademyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mailinglist', {
        url: '/mailinglist',
        templateUrl: 'app/mailinglist/mailinglist.html',
        controller: 'MailinglistCtrl',
		authenticate: true
      });
  });