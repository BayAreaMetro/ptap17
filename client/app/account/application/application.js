'use strict';

angular.module('ptapApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('application', {
                url: '/application',
                template: '<application></application>'
            }).state('application.form-2', {
                views: {
                    'application-content': {
                        templateUrl: 'app/account/application/templates/form-2-contacts.html',
                        controller: 'ApplicationCtrl'
                    }
                }
            }).state('application.form-2b', {
                views: {
                    'application-content': {
                        templateUrl: 'app/account/application/templates/form-2b-contacts.html',
                        controller: 'ApplicationCtrl'
                    }
                }
            }).state('application.form-3', {
                views: {
                    'application-content': {
                        templateUrl: 'app/account/application/templates/form-3-general.html',
                        controller: 'ApplicationCtrl'
                    }
                }
            }).state('application.form-4', {
                views: {
                    'application-content': {
                        templateUrl: 'app/account/application/templates/form-4-types.html',
                        controller: 'ApplicationCtrl'
                    }
                }
            }).state('application.form-5', {
                views: {
                    'application-content': {
                        templateUrl: 'app/account/application/templates/form-5-summary.html',
                        controller: 'ApplicationCtrl'
                    }
                }
            }).state('application.form-6', {
                views: {
                    'application-content': {
                        templateUrl: 'app/account/application/templates/form-6-signature.html',
                        controller: 'ApplicationCtrl'
                    }
                }
            }).state('application.success', {
                views: {
                    'application-content': {
                        templateUrl: 'app/account/application/templates/success.html',
                        controller: 'ApplicationCtrl'
                    }
                }
            });
    });
