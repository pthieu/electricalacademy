'use strict';

describe('Controller: LessonFocusCtrl', function () {

  // load the controller's module
  beforeEach(module('electricalacademyApp'));

  var LessonFocusCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LessonFocusCtrl = $controller('LessonFocusCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
