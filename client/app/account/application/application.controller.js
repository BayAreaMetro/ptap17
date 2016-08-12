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
            this.pageLoading = true;

            this.formIsValid = true;
            this.form2bIsValid = true;
            this.form6IsValid = true;

            //Set state change watch
            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams) {
                    // console.log(pages.getPageTitle());
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
            this.$scope.pageTitle = this.pages.getPageTitle();
            //Load list of jurisdictions for drop down list
            this.jurisdictions.getJurisdictions().then(response => {
                this.names = response.data;
                // console.log(this.names);

            });
            //Load the current jurisdiction if one exists
            if (this.applications.getId()) {
                this.applicationId = this.applications.getId();
            } else {
                this.$state.go('main');
            }
            this.applications.getCurrent(this.applicationId)
                .then(response => {
                    this.application = response.data;
                    console.log(this.application.pdpAdditionalFunds);
                    this.application.pdpAnticipatedConstructionDate = new Date(response.data.pdpAnticipatedConstructionDate);

                    // console.log(this.application);
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
                    // console.log(response.data);
                    this.jurisdiction = response.data;
                    
                    //Set dates
                    console.log(this.application.lastMajorInspection);
                    if (!this.application.lastMajorInspection) {
                        this.application.lastMajorInspection = new Date(this.jurisdiction.lastMajorInspection);
                    } else {
                        this.application.lastMajorInspection = new Date(this.application.lastMajorInspection);
                    }

                    //Set centerline miles
                    this.application.networkCenterLineMiles = this.jurisdiction.centerLineMiles;

                    //Calculate Miles values 
                    console.log(this.$scope.calculateMiles(this.jurisdiction.centerLineMiles));
                    var newValues = this.$scope.calculateMiles(this.jurisdiction.centerLineMiles);
                    this.application.networkMilesRemaining = newValues.networkMilesRemaining;
                    this.application.networkMilesForSurvey = newValues.networkMilesForSurvey;
                    this.application.networkSurveyPercent = newValues.networkSurveyPercent;

                    //Set global variable for network miles remaining
                    this.applications.setNetworkMilesRemaining(this.application.networkMilesRemaining);

                    //Calculate Cost Values
                    var newCostValues = this.$scope.calculateCosts(this.application.networkMilesForSurvey);

                    // Update PMS Summary Values
                    this.application.pmsGrantAmount = newCostValues.grant;
                    this.application.pmsLocalContribution = newCostValues.local;
                    this.application.pmsTotalProjectCost = newCostValues.total;
                    this.application.pmsAdditionalFunds = this.application.networkAdditionalFunds;

                    // Update Design Summary Values
                    var npamCosts = this.$scope.calculateDesignCosts(this.application.npamEstimatedcost);
                    this.application.npamLocalContribution = npamCosts.local;
                    this.application.npamGrantAmount = npamCosts.grant;
                    this.application.npamTotalProjectCost = _.toNumber(npamCosts.local) + _.toNumber(this.application.npamAdditionalFunds);
                    // this.application.npamAdditionalFunds = this.application.networkAdditionalFunds;

                    var pdpCosts = this.$scope.calculateDesignCosts(this.application.pdpEstimatedCost);
                    this.application.pdpGrantAmount = pdpCosts.grant;
                    this.application.pdpLocalContribution = pdpCosts.local;
                    this.application.pdpTotalProjectCost = _.toNumber(pdpCosts.local) + _.toNumber(this.application.pdpAdditionalFunds);
                    // this.application.pdpAdditionalFunds = this.application.networkAdditionalFunds;

                    //Find primary contact
                    return this.contacts.getOne(this.contact1Id);
                }).then(response => {
                    // console.log(response.data);
                    this.contact1 = response.data;
                    //Find streetsaver contact
                    return this.contacts.getOne(this.contact2Id);
                }).then(response => {
                    // console.log(response.data);
                    this.contact2 = response.data;
                    this.pageLoading = false;
                });

            /**
             * [calculateMiles Returns values for remaining miles, miles for survey and percent of network surveyed]
             * @param  {[type]} centerLineMiles [Total centerline miles of the jurisdiction]
             * @return {[type]}           [Returns object with values]
             */
            this.$scope.calculateMiles = function(centerLineMiles) {
                var calculatedValues = {};
                var remaining;
                var survey;
                var percent;
                console.log(centerLineMiles);
                if (centerLineMiles >= 333.33) {
                    remaining = centerLineMiles - 333.33;
                    survey = 333.33;
                    percent = 100 * (_.divide(333.33, centerLineMiles));
                } else if (centerLineMiles < 333.33) {
                    remaining = 0.00;
                    survey = centerLineMiles;
                    percent = 100.00;
                }

                calculatedValues = {
                    networkMilesRemaining: remaining,
                    networkMilesForSurvey: survey,
                    networkSurveyPercent: percent
                };
                console.log(calculatedValues);
                return calculatedValues;

            };

            this.$scope.calculateCosts = function(centerLineMiles) {
                var costValues = {};
                var totalCost, localCost, grantAmount;
                if (centerLineMiles < 51.0) {
                    totalCost = 15000.0;
                    localCost = 3000.0;
                    grantAmount = 12000.0;
                } else if (centerLineMiles >= 333.33) {
                    totalCost = 100000.0;
                    localCost = 20000.0;
                    grantAmount = 80000.0;
                } else {
                    totalCost = centerLineMiles * 300.0;
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

            this.$scope.calculateDesignCosts = function(amount) {
                var designCosts = {};
                var totalCost, localCost, grantAmount;

                //Grant amount  = 80% of requested amount
                grantAmount = amount * 0.8;
                if (grantAmount >= 80000) {
                    grantAmount = 80000;
                } else {
                    grantAmount = grantAmount;
                }
                //Cost to jurisdiction = 20% of request amount
                localCost = amount * 0.2;
                if (localCost >= 20000) {
                    localCost = 20000;
                } else {
                    localCost = localCost;
                }
                designCosts = {
                    grant: grantAmount,
                    local: localCost,

                };


                return designCosts;
            };

        }

        retrieveApplication() {
            this.applications.getCurrent(this.applicationId).then(response => {
                this.application = response.data;
                // console.log(this.application);
            });
        }

        reviewSection1(form) {

            this.submitted = true;

            //Set page title
            this.pages.setPageTitle('Primary Contact');
            console.log(this.jurisdiction);
            var id = this.jurisdiction.jurisdictionId;
            var data = this.jurisdiction;
            this.jurisdictions.update(id, data).then(response => {
                console.log(response);
                var appId = this.applications.getId();
                var appData = {
                    applicationId: appId,
                    jurisdictionId: response.data.jurisdictionId
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

        reviewSection2(form) {
            this.submitted = true;

            console.log(this.contact1);
            console.log(this.$scope.contact1Exists);
            this.$scope.contactId = uuid.v1();
            //Set page title
            this.pages.setPageTitle('Street Saver Contact');
            if (form.$valid) {
                this.formIsValid = true;
                if (this.$scope.contact1Exists) {
                    this.contacts.update(this.contact1.contactId, this.contact1).then(response => {
                        console.log(response);
                        this.$state.go('application.form-2b');
                    }).catch(function(error) {
                        console.log(error);
                    });

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
            } else {
                this.formIsValid = false;
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

        reviewSection2b(form2b) {
            this.submitted2b = true;
            console.log(this.submitted2b);
            console.log(form2b.$valid);
            //Set page title
            this.pages.setPageTitle('General Information');
            console.log(this.contact2);
            console.log(this.$scope.contact2Exists);

            if (form2b.$valid) {
                this.form2bIsValid = true;
                if (this.$scope.contact2Exists) {
                    this.contacts.update(this.contact2.contactId, this.contact2).then(response => {
                        console.log(response);
                        this.$state.go('application.form-3');
                    }).catch(function(error) {
                        console.log(error);
                    });

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
            } else {
                this.form2bIsValid = false;
            }



        }

        reviewSection3() {
            //Set page title
            this.pages.setPageTitle('Project Information');
            var appId = this.applications.getId();
            var appData = {
                attendTraining: this.application.attendTraining,
                pmsConsultants: this.application.pmsConsultants,
                linkedBaseMap: this.application.linkedBaseMap,
                digitalMapFormat: this.application.digitalMapFormat,
                lastMajorInspection: this.application.lastMajorInspection
            };
            this.applications.update(appId, appData).then(info => {
                console.log(info);
                this.application = info.data;
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
            this.application.networkCenterLineMiles = this.jurisdiction.centerLineMiles;
            var appData = {
                pmsFlag: this.application.pmsFlag,
                npamFlag: this.application.npamFlag,
                pdpFlag: this.application.pdpFlag,
                networkTotalPercentage: this.application.networkTotalPercentage,
                networkCenterLineMiles: this.application.networkCenterLineMiles,
                networkMilesForSurvey: this.application.networkMilesForSurvey,
                networkSurveyPercent: this.application.networkSurveyPercent,
                networkMilesRemaining: this.application.networkMilesRemaining,
                networkAdditionalFundsFlag: this.application.networkAdditionalFundsFlag,
                networkAdditionalFunds: this.application.networkAdditionalFunds,
                networkPercentAdditionalFunds: this.application.networkPercentAdditionalFunds,
                arterials: this.application.arterials,
                residentials: this.application.residentials,
                collectors: this.application.collectors,
                other: this.application.other,
                otherDescription: this.application.otherDescription,
                npamEstimatedcost: this.application.npamEstimatedcost,
                npamAdditionalFunds: this.application.npamAdditionalFunds,
                npamProjectdescription: this.application.npamProjectdescription,
                streetLights: this.application.streetLights,
                trafficSignals: this.application.trafficSignals,
                sideWalks: this.application.sideWalks,
                gutters: this.application.gutters,
                curbs: this.application.curbs,
                stormDrains: this.application.stormDrains,
                signs: this.application.signs,
                otherAsset: this.application.otherAsset,
                otherAssetDescription: this.application.otherAssetDescription,
                pdpConstructionFullyFunded: this.application.pdpConstructionFullyFunded,
                pdpFederalAidEligible: this.application.pdpFederalAidEligible,
                pdpEstimatedCost: this.application.pdpEstimatedCost,
                pdpAdditionalFunds: this.application.pdpAdditionalFunds,
                pdpAnticipatedConstructionDate: this.application.pdpAnticipatedConstructionDate,
                pdpProjectDescription: this.application.pdpProjectDescription,

            };

            this.applications.update(appId, appData).then(info => {
                console.log(info);
                this.application = info.data;
                this.$state.go('application.form-5');
            }).catch(function(error) {
                console.log(error);
            });

        }

        reviewSection5() {
            //Set page title
            var appId = this.applications.getId();
            var appData = {
                pmsGrantAmount: this.application.pmsGrantAmount,
                pmsLocalContribution: this.application.pmsLocalContribution,
                pmsAdditionalFunds: this.application.pmsAdditionalFunds,
                pmsTotalProjectCost: this.application.pmsTotalProjectCost,
                npamGrantAmount: this.application.npamGrantAmount,
                npamTotalProjectCost: this.application.npamTotalProjectCost,
                npamAdditionalFunds: this.application.npamAdditionalFunds,
                npamLocalContribution: this.application.npamLocalContribution,
                pdpGrantAmount: this.application.pdpGrantAmount,
                pdpTotalProjectCost: this.application.pdpTotalProjectCost,
                pdpAdditionalFunds: this.application.pdpAdditionalFunds,
                pdpLocalContribution: this.application.pdpLocalContribution
            };
            this.applications.update(appId, appData).then(info => {
                console.log(info);
                this.application = info.data;
                this.pages.setPageTitle('Signature');
                this.$state.go('application.form-6');
            }).catch(function(error) {
                console.log(error);
            });

        }

        submitApplication(form6) {
            this.submitted6 = true;

            if (form6.$valid) {
                this.form6IsValid = true;
                this.$scope.pageTitle = 'Application Complete';
                var appId = this.applications.getId();
                this.application.applicationdate = new Date();
                var appData = this.application;
                appData.submitted = 'Yes';
                this.applications.update(appId, appData).then(info => {
                    console.log(info);
                    this.pages.setPageTitle('Submission Successful!');
                    this.$state.go('application.success');
                }).catch(function(error) {
                    console.log(error);
                });
            } else {
                this.form6IsValid = false;
            }
        }

        updateJurisdiction() {
            console.log(this.jurisdiction);
            var id = this.jurisdiction.jurisdictionId;
            this.jurisdictions.getJurisdiction(id).then(response => {
                this.jurisdiction = response.data;
                this.jurisdictions.setCurrent(response.data);
                console.log(this.jurisdiction);
            });
        }

        //Update values on input for network miles that will be surveyed
        updateMilesForSurvey() {
            var centerLineMiles = _.toNumber(this.jurisdiction.centerLineMiles);
            console.log(centerLineMiles);
            // if (centerLineMiles >= 333.33) {
            //Network miles remaining
            this.application.networkMilesRemaining = centerLineMiles - _.toNumber(this.application.networkMilesForSurvey);
            console.log(this.application.networkMilesRemaining);
            //Percent of network to be surveyed
            this.application.networkSurveyPercent = (this.application.networkMilesForSurvey / centerLineMiles) * 100;
            // }

            // Update Summary Costs
            var newCostValues = this.$scope.calculateCosts(this.application.networkMilesForSurvey);
            // console.log(newCostValues);
            this.application.pmsGrantAmount = newCostValues.grant;
            this.application.pmsLocalContribution = newCostValues.local;
            this.application.pmsTotalProjectCost = newCostValues.total;

        }

        updateAdditionalFunds() { //Update values based on input for additional funds
            var remaining = this.applications.getNetworkMilesRemaining();
            // console.log(remaining);
            var additionalMiles = _.divide(this.application.networkAdditionalFunds, 300);
            this.application.networkPercentAdditionalFunds = ((additionalMiles + this.application.networkMilesForSurvey) / this.jurisdiction.centerLineMiles) * 100;
            this.application.pmsAdditionalFunds = this.application.networkAdditionalFunds;
        }

        clearAdditionalFunds() {
            this.application.networkAdditionalFunds = '';
            this.application.networkPercentAdditionalFunds = '';
            // console.log(this.application.networkAdditionalFunds);
            // console.log(this.application.networkPercentAdditionalFunds);
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
