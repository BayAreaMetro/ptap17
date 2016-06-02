'use strict';
(function(){

class MyaccountComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('ptapApp')
  .component('myaccount', {
    templateUrl: 'app/account/myaccount/myaccount.html',
    controller: MyaccountComponent
  });

})();
