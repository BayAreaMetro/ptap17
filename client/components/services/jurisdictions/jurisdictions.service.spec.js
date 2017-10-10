'use strict';

describe('Service: jurisdictions', function () {

  // load the service's module
  beforeEach(module('ptapApp.jurisdictions'));

  // instantiate service
  var jurisdictions;
  beforeEach(inject(function (_jurisdictions_) {
    jurisdictions = _jurisdictions_;
  }));

  it('should do something', function () {
    expect(!!jurisdictions).toBe(true);
  });

});
