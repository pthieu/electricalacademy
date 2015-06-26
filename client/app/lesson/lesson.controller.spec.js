'use strict';

describe('Controller: LessonCtrl', function () {

  // load the controller's module
  beforeEach(module('electricalacademyApp'));

  var LessonCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LessonCtrl = $controller('LessonCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
