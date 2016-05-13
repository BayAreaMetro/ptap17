'use strict';

angular.module('ptapApp.auth', [
  'ptapApp.constants',
  'ptapApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
