'use strict';

describe('Controller: MailinglistCtrl', function () {

  // load the controller's module
  beforeEach(module('electricalacademyApp'));

  var MailinglistCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MailinglistCtrl = $controller('MailinglistCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
