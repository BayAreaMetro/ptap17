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
        'ui.mask',
        'validation.match',
        'ngAnimate',
        'ptapApp.breadCrumb.directive',
        'ptapApp.pages.service',
        'ptapApp.pageHeading.directive',
        'ptapApp.footer.directive',
        'ptapApp.navbar.directive',
        'ptapApp.phoneNumber.filter',
        'ptapApp.myAccount.service'

    ])
    .config(function($urlRouterProvider, $locationProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
    });
