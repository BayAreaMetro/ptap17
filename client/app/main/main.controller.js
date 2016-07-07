'use strict';

(function() {

    class MainController {

        constructor($http, Auth, applications) {
            this.$http = $http;
            this.awesomeThings = [];
            this.isLoggedIn = Auth.isLoggedIn;
            this.isAdmin = Auth.isAdmin;
            this.getCurrentUser = Auth.getCurrentUser;
            this.applications = applications;
        }

        $onInit() {
            this.getCurrentUser(function(response) {
               
            }).then(response => {
                console.log(response);
                this.applications.setId(response.applicationId);
            });


        }

        addThing() {
            if (this.newThing) {
                this.$http.post('/api/things', { name: this.newThing });
                this.newThing = '';
            }
        }

        deleteThing(thing) {
            this.$http.delete('/api/things/' + thing._id);
        }
    }

    angular.module('ptapApp')
        .component('main', {
            templateUrl: 'app/main/main.html',
            controller: MainController,
            controllerAs: 'main'
        });

})();
