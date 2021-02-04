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
                    $http.post('api/contactform', $scope.email)
                        .then(response => {
                            console.log(response);
                            if (response.data.status === 'success') {
                                $scope.notification = 'success';
                                $scope.email = {};
                            }
                            $timeout(function() {
                                $scope.notification = 'none';
                            }, 5000);
                        }).catch(error => {
                            console.log(err);
                            console.log(error);
                            $scope.notification = 'error';
                            $scope.email = {};
                        })

                };
            }
        };
    });