'use strict';

describe('Service: myAccount', function () {

  // load the service's module
  beforeEach(module('ptapApp.myAccount.service'));

  // instantiate service
  var myAccount;
  beforeEach(inject(function (_myAccount_) {
    myAccount = _myAccount_;
  }));

  it('should do something', function () {
    expect(!!myAccount).toBe(true);
  });

});
