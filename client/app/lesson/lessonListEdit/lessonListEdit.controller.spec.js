'use strict';

describe('Controller: LessonListEditCtrl', function () {

  // load the controller's module
  beforeEach(module('electricalacademyApp'));

  var LessonListEditCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LessonListEditCtrl = $controller('LessonListEditCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
