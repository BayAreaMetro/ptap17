'use strict';
(function() {

    class ApplicationComponent {
        constructor($http, $scope, $state) {
            this.message = 'Hello';
            console.log(this.message);
            $scope.reviewSection1 = function() {
                $state.go('application.form-2');
            };

            $scope.reviewSection2 = function() {
                $state.go('application.form-3');
            };

            $scope.reviewSection3 = function() {
                $state.go('application.form-4');
            };

            $scope.reviewSection4 = function() {
                $state.go('application.form-5');
            };

            $scope.reviewSection5 = function() {
                $state.go('application.form-6');
            };
        }
    }

    angular.module('ptapApp')
        .component('application', {
            templateUrl: 'app/account/application/application.html',
            controller: ApplicationComponent
        });
    angular.module('ptapApp')
        .controller('ApplicationCtrl', ApplicationComponent);

})();
