'use strict';

class LoginController {
    constructor(Auth, $state, $http, $scope) {
        this.user = {};
        this.forgotUser = {};
        this.errors = {};
        this.submitted = false;
        this.$http = $http;
        this.Auth = Auth;
        this.$state = $state;
        this.$scope = $scope;
        this.passwordSuccess = false;
    }

    login(form) {
        this.submitted = true;
        console.log(form);
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
        }).then(user => {
            this.passwordSuccess = true;
            this.forgotUser = null;
        }).catch(err => {
            this.passwordFail = true;

        })

    }
}

angular.module('ptapApp')
    .controller('LoginController', LoginController);