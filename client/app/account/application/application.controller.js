'use strict';
(function(){

class ApplicationComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('ptapApp')
  .component('application', {
    templateUrl: 'app/account/application/application.html',
    controller: ApplicationComponent
  });

})();
