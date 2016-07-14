'use strict';

describe('Filter: phoneNumber', function () {

  // load the filter's module
  beforeEach(module('ptapApp.phoneNumber.filter'));

  // initialize a new instance of the filter before each test
  var phoneNumber;
  beforeEach(inject(function ($filter) {
    phoneNumber = $filter('phoneNumber');
  }));

  it('should return the input prefixed with "phoneNumber filter:"', function () {
    var text = 'angularjs';
    expect(phoneNumber(text)).toBe('phoneNumber filter: ' + text);
  });

});
