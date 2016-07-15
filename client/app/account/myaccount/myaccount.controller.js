'use strict';
(function() {

    class MyaccountComponent {
        constructor(myAccount, Auth, $scope, $timeout) {
            this.myAccount = myAccount;
            this.isLoggedIn = Auth.isLoggedIn;
            this.isAdmin = Auth.isAdmin;
            this.getCurrentUser = Auth.getCurrentUser;
            this.Auth = Auth;
            this.$scope = $scope;
            this.statusSuccess = false;
            this.statusFailed = false;
            this.$timeout = $timeout;
        }
        $onInit() {
            this.getCurrentUser(function(response) {

            }).then(response => {
                console.log(response.firstname);
                this.$scope.currentUser = response;
            });

        }
        updateMyAccount(form) {
            console.log(form);
            var info = {
                firstname: this.$scope.currentUser.firstname,
                lastname: this.$scope.currentUser.lastname,
                phone: this.$scope.currentUser.phone,
                email: this.$scope.currentUser.email,
            };
            if (form.$valid) {
                this.myAccount.update(info).success(response => {
                    console.log(response);
                    this.statusFailed = false;
                    this.statusSuccess = true;

                  
                }).error(error => {
                    if (error) {
                        console.log(error);
                    }
                });
            } else {
                // alert('error');
                this.statusFailed = true;
                this.statusSuccess = false;
            }

        }

        update(form){
        	if (form.$valid) {
        		this.myAccount.updateInfo(this.info).success(response => {
        			this.statusFailed = false;
        			this.statusSuccess = true;
        		}).error(error => {
        			this.statusFailed = true;
        			this.statusSuccess = false;
        		});
        	} else {
        		console.log('errors on page');
        	}
        }
    }

    angular.module('ptapApp')
        .component('myaccount', {
            templateUrl: 'app/account/myaccount/myaccount.html',
            controller: MyaccountComponent,
            controllerAs: 'acctCtrl'

        });

})();
