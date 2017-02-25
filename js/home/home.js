define([
  'require',
  'angular',
  'home/home-service',
  'services/facebook-service',
  'services/video-service',
  'services/fb-live-stream',
  'donation/donation'
//  'threejs-viewer/module'
], function(require, angular) {
  'use strict';
  return angular.module('fredra.home', [
        'ui.router',
        'homeServices',
        'facebook-service',
        'videoViewer',
        'fredra.donation',
        'ngTouch',
//        'threeViewer',
        'ui.router.util',
        'ui.bootstrap',
        'ngAnimate',
        // 'fbStream'
      ])
      .config(['$stateProvider',
        function($stateProvider) {
          var homeRoot = '';
          if (location.pathname.indexOf('/en/') !== -1) {
            homeRoot = '/';
          }

          $stateProvider.state('login', {
            url: '/wp-login.php?action&_wpnonce',
            controller: function() {
              location.reload();
            }
          });

          $stateProvider.state('admin', {
            url: '/wp-admin/*path',
            controller: function() {
              location.reload();
            }
          });

          $stateProvider.state('app', {
            abstract: true,
            url: '/{lang}',
            templateUrl: require.toUrl('home/index.html')
          });

          $stateProvider.state('app.home', {
            url: homeRoot,
            views: {
              home: {
                templateUrl: require.toUrl('home/home.html'),
                controller: 'homeController'
              },
              about: {
                templateUrl: require.toUrl('about/index.html'),
                controller: 'aboutController'
              },
              contacts: {
                templateUrl: require.toUrl('contacts/index.html'),
                controller: 'contactsController'
              },
              donation: {
                templateUrl: require.toUrl('donation/index.html'),
                controller: 'donationController'
              }
            }
          });
        }]);
});
