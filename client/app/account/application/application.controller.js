'use strict';
(function() {

    class ApplicationComponent {
        constructor($http, $scope, $state, jurisdictions) {
            this.$scope = $scope;
            this.jurisdictions = jurisdictions;
            this.$state = $state;
            // this.jurisdiction = {};
            // this.names = [];
        }

        $onInit() {
            //Load list of jurisdictions for drop down list
            this.jurisdictions.getJurisdictions().then(response => {
                this.names = response.data;

            });

            //Load the current jurisdiction if one exists
            this.jurisdiction = this.jurisdictions.getCurrent();
        }

        reviewSection1() {
            this.$state.go('application.form-2');
        }

        reviewSection2() {
            this.$state.go('application.form-3');
        }

        reviewSection3() {
            this.$state.go('application.form-4');
        }

        reviewSection4() {
            this.$state.go('application.form-5');
        }

        reviewSection5() {
            this.$state.go('application.form-6');
        }

        updateJurisdiction() {
            console.log(this.jurisdiction);
            var id = this.jurisdiction._id;
            this.jurisdictions.getJurisdiction(id).then(response => {
                this.jurisdiction = response.data;
                this.jurisdictions.setCurrent(response.data);
                console.log(this.jurisdiction);
            });
        }
    }

    angular.module('ptapApp')
        .component('application', {
            templateUrl: 'app/account/application/application.html',
            controller: ApplicationComponent,
            controllerAs: 'appCtrl'
        });
    angular.module('ptapApp')
        .controller('ApplicationCtrl', ApplicationComponent);

})();
