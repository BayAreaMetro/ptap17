'use strict';

angular.module('ptapApp')
    .service('applications', function($http) {
        var urlBase = '/api/applications';
        var appId;

        // Get a specific Application
        this.getCurrent = function(id) {
            return $http.get(urlBase + '/' + id);
        };

         // Update a specific Application
        this.update = function(id, app) {
        	console.log(id);
        	console.log(app);

            return $http.post(urlBase + '/' + id , app);
        };


        // Get session application
        this.getId = function() {
            return appId;
        };


        // Set session application
        this.setId = function(id) {
            appId = id;
        };
    });
