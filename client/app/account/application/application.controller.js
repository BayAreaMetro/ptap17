'use strict';
(function() {

    class ApplicationComponent {
        constructor($http, $scope, $state) {
            this.message = 'Hello';
            console.log(this.message);
            $scope.reviewSection1 = function() {
                $state.go('application.form-2');
            };
        }
    }

    angular.module('ptapApp')
        .component('application', {
            templateUrl: 'app/account/application/application.html',
            controller: ApplicationComponent
        });
    angular.module('ptapApp')
        .controller('ApplicationCtrl', {
            controller: ApplicationComponent
        });

})();
