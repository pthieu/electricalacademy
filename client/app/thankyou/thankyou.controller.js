'use strict';

angular.module('electricalacademyApp')
  .controller('ThankyouCtrl', function($scope, $stateParams, $location) {
    $scope.message = {};
    var thankyou_type = $stateParams.msg_type;
    var query_params = $location.search();
    switch (thankyou_type) {
      case 'mailinglist':
        $scope.message.primary = 'Thanks for signing up!';
        $scope.message.secondary = (query_params.hasOwnProperty('email')) ?
            'Your email "' + query_params.email + '" has been added to our mailing list.' : '';
        break;
      default:
        $scope.message.primary = 'Thanks for visiting our site!';
        break;
    }
  });
