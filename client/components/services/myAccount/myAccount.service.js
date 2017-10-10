'use strict';

angular.module('ptapApp.myAccount.service', [])
    .service('myAccount', function($http) {
        var urlBase = 'api/users';

        //Update my account information
        this.update = function(info) {
            return $http.post(urlBase + '/myaccount', info);
        };

        //Update pwd information
        this.updateInfo = function(info) {
            return $http.post(urlBase + '/password', info);
        };
    });
