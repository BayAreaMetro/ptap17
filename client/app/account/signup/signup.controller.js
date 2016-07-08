'use strict';

class SignupController {
    //start-non-standard
    user = {};
    errors = {};
    submitted = false;
    //end-non-standard

    constructor(Auth, $state, applications, $scope) {
        this.Auth = Auth;
        this.$state = $state;
        this.applications = applications;
        this.$scope = $scope;
    }

    register(form) {
        this.submitted = true;

        if (form.$valid) {
            this.$scope.applicationId = uuid.v1();
            this.Auth.createUser({
                    firstname: this.user.firstname,
                    lastname: this.user.lastname,
                    email: this.user.email,
                    password: this.user.password,
                    applicationId: this.$scope.applicationId
                })
                .then(response => {
                    console.log(response.data);
                    return this.applications.create(this.$scope.applicationId);
                })
                .then(() => {
                    // Account created, redirect to home
                    this.$state.go('main');
                })
                .catch(err => {
                    err = err.data;
                    this.errors = {};
                    console.log(err);
                    // Update validity of form fields that match the sequelize errors
                    if (err.name) {
                        angular.forEach(err.fields, field => {
                            form[field].$setValidity('mongoose', false);
                            this.errors[field] = err.message;
                        });
                    }
                });
        }
    }
}

angular.module('ptapApp')
    .controller('SignupController', SignupController);
