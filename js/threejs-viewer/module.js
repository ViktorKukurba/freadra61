define([
  'angular',
  'threejs-viewer/services/three-service',
  'threejs-viewer/directives/three-viewport'
], function(angular) {
  return angular.module('threeViewer', ['three-service', 'three-directives'])
      .directive('threeTest', [function (ThreeService) {
        return {
          restrict: "AE",
          link: function (scope, element, attribute) {
            element[0].innerHTML = 'TEST';
          }
        };
      }]);
});
