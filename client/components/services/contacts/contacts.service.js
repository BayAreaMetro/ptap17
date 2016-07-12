'use strict';

angular.module('ptapApp')
    .service('contacts', function($http) {
        var urlBase = '/api/contacts';
        var currentContact = {};

        //Create new contact
        this.create = function(contact) {
            console.log(contact);
            return $http.post(urlBase, contact);
        };


        //Create new contact
        this.update = function(id, contact) {
            console.log(contact);
            return $http.post(urlBase + '/' + id, contact);
        };


        //Set current contact
        this.setCurrent = function(contact) {
            currentContact = contact;
        };


        //Get current contact
        this.getCurrent = function() {
            return currentContact;
        };

        //Get current contact
        this.getOne = function(id) {
            return $http.get(urlBase + '/' + id);
        };
    });
