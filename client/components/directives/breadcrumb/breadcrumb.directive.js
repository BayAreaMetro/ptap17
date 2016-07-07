'use strict';

angular.module('ptapApp')
  .directive('breadcrumb', function () {
    return {
      templateUrl: 'components/directives/breadcrumb/breadcrumb.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
