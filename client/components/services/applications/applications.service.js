'use strict';

angular.module('ptapApp')
    .service('applications', function($http) {
        var urlBase = '/api/applications';
        var appId;
        var networkMiles;

        // Get a specific Application
        this.getCurrent = function(id) {
            return $http.get(urlBase + '/' + id);
        };

        // Update a specific Application
        this.update = function(id, app) {
            console.log(id);
            console.log(app);

            return $http.post(urlBase + '/' + id, app);
        };

         // Insert Application ID
        this.create = function(id) {
            var body = {
                applicationId: id
            };
            return $http.post(urlBase, body);
        };


        // Get session application
        this.getId = function() {
            return appId;
        };


        // Set session application
        this.setId = function(id) {
            appId = id;
        };

        // Get network miles remaining
        this.getNetworkMilesRemaining = function() {
            return networkMiles;
        };


        // Set network miles remaining
        this.setNetworkMilesRemaining = function(miles) {
            networkMiles = miles;
        };
    });
