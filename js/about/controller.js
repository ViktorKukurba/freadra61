define([
  'home/home'
], function(home) {
  home.controller('aboutController', ['$scope', 'facebookPage',
    function($scope, facebookPage) {
      //facebookPage.then(setFBContent);
      $scope.description = ['paragraph1', 'paragraph2', 'paragraph3'];




      function setFBContent(data) {
        var arr = data.description.split('\n'),
            descArr = arr.filter(function(item) {
              return !!item;
            });
        $scope.about = data.about;
        $scope.description = descArr;
        console.log('#busy-indicator');
        $('#busy-indicator').hide();
      }
    }]);
});
