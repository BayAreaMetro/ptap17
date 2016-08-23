'use strict';

class LoginController {
    constructor(Auth, $state, $http) {
        this.user = {};
        this.forgotUser = {};
        this.errors = {};
        this.submitted = false;
        this.$http = $http;
        this.Auth = Auth;
        this.$state = $state;
    }

    login(form) {
        this.submitted = true;

        if (form.$valid) {
            this.Auth.login({
                    email: this.user.email,
                    password: this.user.password
                })
                .then(() => {
                    // Logged in, redirect to home
                    this.$state.go('main');
                })
                .catch(err => {
                    this.errors.other = err.message;
                });
        }
    }

    resetPassword() {
        console.log(this.forgotUser);

        this.$http.post('/api/users/forgotPassword', this.forgotUser).success(function(response) {
            console.log(response);
        }).error(function(err) {
            console.log(err);
        });

    }
}

angular.module('ptapApp')
    .controller('LoginController', LoginController);
