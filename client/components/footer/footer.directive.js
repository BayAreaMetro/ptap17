'use strict';

angular.module('ptapApp.footer.directive', [])
    .directive('footer', function() {
        return {
            templateUrl: 'components/footer/footer.html',
            restrict: 'E',
            link: function(scope, element) {
                element.addClass('footer');
            },
            controller: function($scope, $http, $timeout) {
                $scope.sendMail = function() {
                    $http.post('/api/contactform', $scope.email).success(function(response) {
                        console.log(response);
                        if (response.status === 'success') {
                            $scope.notification = 'success';
                            $scope.email = {};
                        }
                        $timeout(function() {
                            $scope.notification = 'none';
                        }, 5000);
                    }).error(function(error) {
                        console.log(error);
                        $scope.notification = 'error';
                        $scope.email = {};
                    });
                };
            }
        };
    });
