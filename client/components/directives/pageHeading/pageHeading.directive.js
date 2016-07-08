'use strict';

angular.module('ptapApp')
  .directive('pageHeading', function () {
    return {
      templateUrl: 'components/directives/pageHeading/pageHeading.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
