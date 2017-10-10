'use strict';

describe('Component: MyaccountComponent', function () {

  // load the controller's module
  beforeEach(module('ptapApp'));

  var MyaccountComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    MyaccountComponent = $componentController('MyaccountComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
