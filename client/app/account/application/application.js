'use strict';

angular.module('ptapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('application', {
        url: '/application',
        template: '<application></application>'
      });
  });
