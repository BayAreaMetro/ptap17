'use strict';

angular.module('ptapApp', [
  'ptapApp.auth',
  'ptapApp.admin',
  'ptapApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngAnimate'
  
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
