'use strict';

angular.module('ptapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myaccount', {
        url: '/myaccount',
        template: '<myaccount></myaccount>'
      });
  });
