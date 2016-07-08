'use strict';

angular.module('ptapApp.breadCrumb.directive', [])
    .directive('breadcrumb', function() {
        return {
            templateUrl: 'components/directives/breadcrumb/breadcrumb.html',
            //Restrict to element/attribute
            restrict: 'EA',
            link: function(scope, element, attrs) {},
            //Attribute
            scope: {
                title: '='
            },
            //Controller
            controller: function($scope, $state) {
                //Set links and names for breadcrumbs
                $scope.breadcrumbs = [{
                    link: 'application',
                    name: '1. Jurisdiction',
                    title: 'Testing'
                }, {
                    link: 'application.form-2',
                    name: '2. Contact'
                }, {
                    link: 'application.form-2b',
                    name: '2b. Contact'
                }, {
                    link: 'application.form-3',
                    name: '3. General'
                }, {
                    link: 'application.form-4',
                    name: '4. Types'
                }, {
                    link: 'application.form-5',
                    name: '5. Summary'
                }, {
                    link: 'application.form-6',
                    name: '6. Signature'
                }];
            }
        };
    });
