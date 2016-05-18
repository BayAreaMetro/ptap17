'use strict';

(function() {

    class MainController {

        constructor($http, Auth) {
            this.$http = $http;
            this.awesomeThings = [];
            this.isLoggedIn = Auth.isLoggedIn;
            this.isAdmin = Auth.isAdmin;
            this.getCurrentUser = Auth.getCurrentUser;
        }

        $onInit() {
            this.$http.get('/api/things').then(response => {
                this.awesomeThings = response.data;
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
