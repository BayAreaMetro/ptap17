'use strict';

angular.module('ptapApp.pages.service', [])
    .service('pages', function() {
        var pageTitle = 'Jurisdiction Information';

        //Set page Title
        this.setPageTitle = function(title) {
            pageTitle = title;
        };

        //Get Page Title
        this.getPageTitle = function(){
        	return pageTitle;
        };
    });
