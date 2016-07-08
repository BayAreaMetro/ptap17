'use strict';

describe('Directive: pageHeading', function () {

  // load the directive's module and view
  beforeEach(module('ptapApp'));
  beforeEach(module('components/directives/pageHeading/pageHeading.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<page-heading></page-heading>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the pageHeading directive');
  }));
});
