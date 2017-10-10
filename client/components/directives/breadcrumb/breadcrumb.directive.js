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
            controller: function($scope, $state, pages) {
                //Set links and names for breadcrumbs
                $scope.breadcrumbs = [{
                    link: 'application',
                    name: '1. Jurisdiction',
                    title: 'Jurisdiction Information'
                }, {
                    link: 'application.form-2',
                    name: '2. Contact',
                    title: 'Primary Contact'
                }, {
                    link: 'application.form-2b',
                    name: '2b. Contact',
                    title: 'Street Saver Contact'
                }, {
                    link: 'application.form-3',
                    name: '3. General',
                    title: 'General Information'
                }, {
                    link: 'application.form-4',
                    name: '4. Types',
                    title: 'Project Information'
                }, {
                    link: 'application.form-5',
                    name: '5. Summary',
                    title: 'Summary'
                }, {
                    link: 'application.form-6',
                    name: '6. Signature',
                    title: 'Signature'
                }];

                $scope.setTitle = function(title) {
                    pages.setPageTitle(title);
                    $scope.$parent.pageLoading = false;
                    console.log($scope);
                };
            }
        };
    });