'use strict';

describe('Directive: breadcrumb', function () {

  // load the directive's module and view
  beforeEach(module('ptapApp.breadcrumb'));
  beforeEach(module('components/directives/breadcrumb/breadcrumb.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<breadcrumb></breadcrumb>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the breadcrumb directive');
  }));
});
