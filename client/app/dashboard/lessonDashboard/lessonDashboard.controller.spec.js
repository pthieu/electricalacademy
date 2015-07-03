'use strict';

describe('Controller: LessonDashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('electricalacademyApp'));

  var LessonDashboardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LessonDashboardCtrl = $controller('LessonDashboardCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
