'use strict';

describe('Component: ApplicationComponent', function () {

  // load the controller's module
  beforeEach(module('ptapApp'));

  var ApplicationComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ApplicationComponent = $componentController('ApplicationComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
