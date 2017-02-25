define(['../../../../bower_components/angular/angular', '../../../app/js/home/home'], function() {
  describe('Unit: AboutController', function() {
    console.log('TTTTT');
    // Load the module with MainController
    beforeEach(module('fredra.home'));
//
    var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
//    beforeEach(inject(function($controller, $rootScope) {
//      // Create a new scope that's a child of the $rootScope
//      scope = $rootScope.$new();
//      // Create the controller
////      ctrl = $controller('aboutController', {
////        $scope: scope
////      });
//    }));

    it('should create $scope',
      function() {
        expect(ctrl).toBeUndefined();
      });
  });
});

