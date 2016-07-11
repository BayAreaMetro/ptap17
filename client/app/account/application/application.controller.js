'use strict';
(function() {

    class ApplicationComponent {
        constructor($http, $scope, $state, jurisdictions, applications, contacts, pages, $rootScope) {
            this.$scope = $scope;
            this.jurisdictions = jurisdictions;
            this.$state = $state;
            this.pages = pages;
            this.applications = applications;
            this.contacts = contacts;
            this.applicationId;
            this.application = {};

            //Set state change watch
            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams) {
                    console.log(pages.getPageTitle());
                    $scope.pageTitle = pages.getPageTitle();
                });

            //Datepicker
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            $scope.open1 = function() {
                $scope.popup1.opened = true;
            };

            $scope.open2 = function() {
                $scope.popup2.opened = true;
            };

            $scope.popup1 = {
                opened: false
            };

            $scope.popup2 = {
                opened: false
            };
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];
            //End datepicker

        }

        $onInit() {
            //Set page title
            console.log('page title', this.pages.getPageTitle());
            this.$scope.pageTitle = this.pages.getPageTitle();
            //Load list of jurisdictions for drop down list
            this.jurisdictions.getJurisdictions().then(response => {
                this.names = response.data;

            });
            console.log(this.applications.getId());
            //Load the current jurisdiction if one exists
            if (this.applications.getId()) {
                this.applicationId = this.applications.getId();
            } else {
                this.$state.go('main');
            }
            this.applications.getCurrent(this.applicationId)
                .then(response => {
                    this.application = response.data;
                    this.application = response.data;
                    console.log(response.data.lastMajorInspection);
                    this.application.lastMajorInspection = new Date(response.data.lastMajorInspection);
                    this.application.pdpAnticipatedConstructionDate = new Date(response.data.pdpAnticipatedConstructionDate);

                    console.log(this.application);
                    this.contact1Id = this.application.primaryContactId;
                    this.contact2Id = this.application.streetSaverContactId;
                    if (this.contact1Id) {
                        this.$scope.contact1Exists = true;
                    } else {
                        this.$scope.contact1Exists = false;
                    }
                    if (this.contact2Id) {
                        this.$scope.contact2Exists = true;
                    } else {
                        this.$scope.contact2Exists = false;
                    }
                    this.contact2Id = this.application.streetSaverContactId;
                    var id = this.application.jurisdictionId;
                    console.log(id);
                    return this.jurisdictions.getJurisdiction(id);

                }).then(response => {
                    console.log(response.data);
                    this.jurisdiction = response.data;
                    //Calculate Miles values 
                    console.log(this.$scope.calculateMiles(this.jurisdiction.laneMiles));
                    var newValues = this.$scope.calculateMiles(this.jurisdiction.laneMiles);
                    this.application.networkMilesRemaining = newValues.networkMilesRemaining;
                    this.application.networkMilesForSurvey = newValues.networkMilesForSurvey;
                    this.application.networkSurveyPercent = newValues.networkSurveyPercent;

                    //Set global variable for network miles remaining
                    console.log('setting netowrk miles remainig', this.application.networkMilesRemaining);
                    this.applications.setNetworkMilesRemaining(this.application.networkMilesRemaining);

                    //Calculate Cost Values
                    var newCostValues = this.$scope.calculateCosts(this.application.networkMilesForSurvey);
                    console.log(newCostValues);

                    this.application.pmsGrantAmount = newCostValues.grant;
                    this.application.pmsLocalContribution = newCostValues.local;
                    this.application.pmsTotalProjectCost = newCostValues.total;
                    this.application.pmsAdditionalFunds = this.application.networkAdditionalFunds;

                    this.application.npamEstimatedcost = newCostValues.grant;
                    this.application.npamGrantAmount = newCostValues.grant;
                    this.application.npamLocalContribution = newCostValues.local;
                    this.application.npamTotalProjectCost = newCostValues.total;
                    // this.application.npamAdditionalFunds = this.application.networkAdditionalFunds;
                    this.application.pdpEstimatedCost = newCostValues.grant;
                    this.application.pdpGrantAmount = newCostValues.grant;
                    this.application.pdpLocalContribution = newCostValues.local;
                    this.application.pdpTotalProjectCost = newCostValues.total;
                    // this.application.pdpAdditionalFunds = this.application.networkAdditionalFunds;

                    //Find primary contact
                    return this.contacts.getOne(this.contact1Id);
                }).then(response => {
                    console.log(response.data);
                    this.contact1 = response.data;
                    //Find streetsaver contact
                    return this.contacts.getOne(this.contact2Id);
                }).then(response => {
                    console.log(response.data);
                    this.contact2 = response.data;
                });
            console.log(this.applicationId, ' is the application id');

            /**
             * [calculateMiles Returns values for remaining miles, miles for survey and percent of network surveyed]
             * @param  {[type]} laneMiles [Total centerline miles of the jurisdiction]
             * @return {[type]}           [Returns object with values]
             */
            this.$scope.calculateMiles = function(laneMiles) {
                var calculatedValues = {};
                var remaining;
                var survey;
                var percent;

                if (laneMiles >= 333.33) {
                    remaining = laneMiles - 333.33;
                    survey = 333.33;
                    percent = 100 * (_.divide(333.33, laneMiles));
                } else if (laneMiles < 333.33) {
                    remaining = 0;
                    survey = laneMiles;
                    percent = 100;
                }

                calculatedValues = {
                    networkMilesRemaining: remaining,
                    networkMilesForSurvey: survey,
                    networkSurveyPercent: percent
                };
                return calculatedValues;

            };

            this.$scope.calculateCosts = function(laneMiles) {
                var costValues = {};
                var totalCost, localCost, grantAmount;
                if (laneMiles < 51) {
                    totalCost = 15000;
                    localCost = 3000;
                    grantAmount = 12000;
                } else if (laneMiles >= 333.33) {
                    totalCost = 100000;
                    localCost = 20000;
                    grantAmount = 80000;
                } else {
                    totalCost = laneMiles * 300;
                    localCost = totalCost * 0.2;
                    grantAmount = totalCost - localCost;
                }
                costValues = {
                    total: totalCost,
                    local: localCost,
                    grant: grantAmount
                };

                return costValues;
            };

        }

        retrieveApplication() {
            this.applications.getCurrent(this.applicationId).then(response => {
                this.application = response.data;
                console.log(this.application);
            });
        }

        reviewSection1() {
            //Set page title
            this.pages.setPageTitle('Primary Contact');
            this.jurisdiction.jurisdictionId = this.jurisdiction._id;
            console.log(this.jurisdiction);
            var id = this.jurisdiction._id;
            var data = this.jurisdiction;
            this.jurisdictions.update(id, data).then(response => {
                console.log(response);
                var appId = this.applications.getId();
                var appData = {
                    applicationId: appId,
                    jurisdictionId: response.data._id
                };
                console.log(appData);
                this.applications.update(appId, appData).then(info => {
                    console.log(info);

                    this.$state.go('application.form-2');
                }).catch(function(error) {
                    console.log(error);
                });
            }).catch(function(err) {
                console.log(err);
                throw err;
            });

        }

        reviewSection2() {
            console.log(this.contact1);
            console.log(this.$scope.contact1Exists);
            this.$scope.contactId = uuid.v1();
            //Set page title
            this.pages.setPageTitle('Street Saver Contact');
            if (this.$scope.contact1Exists) {
                this.$state.go('application.form-2b');
            } else if (!this.$scope.contact1Exists) {
                this.contact1.contactId = this.$scope.contactId;
                this.contacts.create(this.contact1).then(response => {
                    console.log(response);
                    this.contacts.setCurrent(response.data);
                    var appId = this.applications.getId();
                    var appData = {
                        primaryContactId: this.$scope.contactId
                    };
                    console.log(appData);
                    this.applications.update(appId, appData).then(info => {
                        console.log(info);
                        this.$state.go('application.form-2b');
                    }).catch(function(error) {
                        console.log(error);
                    });
                }).catch(function(error) {
                    console.log(error);
                    throw error;
                });
            }

        }

        checkSameContact() {
            console.log(this.contact2.check);
            if (this.contact2.check) {
                var contact = this.contacts.getCurrent();
                console.log(contact);
                contact.check = true;
                this.contact2 = contact;


            } else {
                this.contact2 = {};
            }

        }

        reviewSection2b() {
            //Set page title
            this.pages.setPageTitle('General Information');
            console.log(this.contact2);
            console.log(this.$scope.contact2Exists);
            if (this.$scope.contact2Exists) {
                this.$state.go('application.form-3');
            } else if (!this.$scope.contact2Exists) {
                var contact2Id, appId;
                var appData = {};


                if (this.contact2.check) {
                    if (this.application.primaryContactId) {
                        contact2Id = this.application.primaryContactId;
                    } else {
                        contact2Id = this.$scope.contactId;
                    }
                    appId = this.applications.getId();
                    appData = {
                        streetSaverContactId: contact2Id
                    };
                    this.applications.update(appId, appData).then(info => {
                        console.log(info);
                        this.$state.go('application.form-3');
                    }).catch(function(error) {
                        console.log(error);
                    });
                } else {
                    this.$scope.contact2Id = uuid.v1();
                    appId = this.applications.getId();

                    this.contact2.contactId = this.$scope.contact2Id;
                    this.contacts.create(this.contact2).then(response => {
                        console.log(response);
                        appId = this.applications.getId();
                        appData = {
                            streetSaverContactId: this.$scope.contact2Id
                        };
                        console.log(appData);
                        this.applications.update(appId, appData).then(info => {
                            console.log(info);
                            this.$state.go('application.form-3');
                        }).catch(function(error) {
                            console.log(error);
                        });
                    }).catch(function(error) {
                        console.log(error);
                        throw error;
                    });
                }
            }


        }

        reviewSection3() {
            //Set page title
            this.pages.setPageTitle('Project Information');
            var appId = this.applications.getId();
            var appData = this.application;
            this.applications.update(appId, appData).then(info => {
                console.log(info);
                this.$state.go('application.form-4');
            }).catch(function(error) {
                console.log(error);
            });
            var jurisdiction = this.jurisdictions.getCurrent();
            console.log(jurisdiction);
            this.$state.go('application.form-4');
        }

        reviewSection4() {
            //Set page title
            this.pages.setPageTitle('Project Cost Summary');
            var appId = this.applications.getId();
            var appData = this.application;
            this.applications.update(appId, appData).then(info => {
                console.log(info);
                this.$state.go('application.form-5');
            }).catch(function(error) {
                console.log(error);
            });

        }

        reviewSection5() {
            //Set page title
            this.pages.setPageTitle('Signature');
            this.$state.go('application.form-6');
        }

        submitApplication() {
            this.$scope.pageTitle = 'Application Complete';
            var appId = this.applications.getId();
            var appData = this.application;
            this.applications.update(appId, appData).then(info => {
                console.log(info);
                this.$state.go('application.success');
            }).catch(function(error) {
                console.log(error);
            });

        }

        updateJurisdiction() {
            console.log(this.jurisdiction);
            var id = this.jurisdiction._id;
            this.jurisdictions.getJurisdiction(id).then(response => {
                this.jurisdiction = response.data;
                this.jurisdictions.setCurrent(response.data);
                console.log(this.jurisdiction);
            });
        }

        //Update values on input for network miles that will be surveyed
        updateMilesForSurvey() {
            var laneMiles = _.toNumber(this.jurisdiction.laneMiles);
            console.log(laneMiles);
            if (laneMiles >= 333.33) {
                //Network miles remaining
                this.application.networkMilesRemaining = laneMiles - _.toNumber(this.application.networkMilesForSurvey);
                //Percent of network to be surveyed
                this.application.networkSurveyPercent = (this.application.networkMilesForSurvey / laneMiles) * 100;
            }

            // Update Summary Costs
            var newCostValues = this.$scope.calculateCosts(this.application.networkMilesForSurvey);
            console.log(newCostValues);
            this.application.pmsGrantAmount = newCostValues.grant;
            this.application.pmsLocalContribution = newCostValues.local;
            this.application.pmsTotalProjectCost = newCostValues.total;

        }

        updateAdditionalFunds() { //Update values based on input for additional funds
            var remaining = this.applications.getNetworkMilesRemaining();
            console.log(remaining);
            var additionalMiles = _.divide(this.application.networkAdditionalFunds, 300);
            this.application.networkPercentAdditionalFunds = ((additionalMiles + this.application.networkMilesForSurvey) / this.jurisdiction.laneMiles) * 100;
            this.application.pmsAdditionalFunds = this.application.networkAdditionalFunds;
        }

        clearAdditionalFunds() {
            this.application.networkAdditionalFunds = '';
            this.application.networkPercentAdditionalFunds = '';
            console.log(this.application.networkAdditionalFunds);
            console.log(this.application.networkPercentAdditionalFunds);
        }


    }

    angular.module('ptapApp')
        .component('application', {
            templateUrl: 'app/account/application/application.html',
            controller: ApplicationComponent,
            controllerAs: 'appCtrl'
        });
    angular.module('ptapApp')
        .controller('ApplicationCtrl', ApplicationComponent);

})();
