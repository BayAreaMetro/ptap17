'use strict';

angular.module('ptapApp')
    .service('jurisdictions', function($http) {
        var urlBase = '/api/jurisdictions';
        var currentJurisdiction = {};

        // Get list of jurisdictions
        this.getJurisdictions = function() {
            return $http.get(urlBase);
        };

        // Get a specific Jurisdiction
        this.getJurisdiction = function(id) {
            return $http.get(urlBase + '/' + id);
        };

        // Get current jurisdiction
        this.getCurrent = function() {
            return currentJurisdiction;
        };
        // Set current jurisdiction
        this.setCurrent = function(current) {
            currentJurisdiction = current;
        };
    });
