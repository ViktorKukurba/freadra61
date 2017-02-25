/*!
 *
 * main.js
 * Fredra 61 web application.
 * http://fredra.org/
 *
 *
 * Copyright 2015, Viktor Kukurba
 * @author: Viktor Kukurba
 * License: MIT
 *
 */

require.config({
  baseUrl: '/wp-content/themes/fredra/js',
  paths: {
    angular: '../bower_components/angular/angular',
    'angular-route': '../bower_components/angular-route/angular-route',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min',
    jQuery: '../bower_components/jquery/dist/jquery.min',
    async: '../bower_components/async/dist/async.min',
    'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap',
    'angular-bootstrap-tpls': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
    //'angular-bootstrap-tpls': 'http://fredra.local/app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
    'angular-translate': '../bower_components/angular-translate/angular-translate.min',
    'angular-translate-loader': '../bower_components/angular-translate-loader-url/angular-translate-loader-url.min',
    'angular-translate-loader-static': '../bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min',
    route: '../bower_components/angular-route/angular-route.min',
    media: '../bower_components/mediaelement/build/mediaelement-and-player.min',
    //media: '../vendor/mediaelement/build/mediaelement-and-player.min',
    three: '../bower_components/threejs/build/three.min',
    typeface: '../vendor/thirdparty/helvetiker-regular',
    'droid-sans': '../vendor/fonts/droid/droid_sans_regular.typeface',
    'droid-sans-bold': '../vendor/fonts/droid/droid_sans_bold.typeface',
    detector: '../vendor/thirdparty/Detector',
    'angular-strap': '../bower_components/angular-strap/dist/angular-strap.min',
    'angular-touch': '../bower_components/angular-touch/angular-touch.min',
    'angular-strap-tpl': '../bower_components/angular-strap/dist/angular-strap.tpl.min',
    'helpers-dimensions': '../bower_components/angular-strap/src/helpers/dimensions',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
    scrolltoplugin:'../bower_components/gsap/src/minified/plugins/ScrollToPlugin.min',
    tweenmax: '../bower_components/gsap/src/minified/TweenMax.min',
    TweenLite: '../bower_components/gsap/src/minified/TweenLite.min',
    //tweenmax: '../vendor/tweenmax/tweenmax.min',
    //'scrollplugin':'../vendor/scrollto/scrolltoplugin.min',
    'viewport-units-buggyfill': '../bower_components/viewport-units-buggyfill/viewport-units-buggyfill',
    'viewport-units-buggyfill.hacks': '../bower_components/viewport-units-buggyfill/viewport-units-buggyfill.hacks',
    'angular-animate': '../bower_components/angular-animate/angular-animate.min'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    'angular-ui-router': {
      deps: ['angular']
    },
    twitter: {
      deps: ['jQuery']
    },
    'angular-bootstrap': {
      deps: ['angular']
    },
    route: {
      deps: ['angular']
    },
    media: {
      deps: ['jQuery']
    },
    'droid-sans': {
      deps: ['typeface']
    },
    'droid-sans-bold': {
      deps: ['typeface']
    },
    'typeface': {
      deps: ['three']
    },
    'angular-bootstrap-tpls': {
      deps: ['angular-bootstrap', 'bootstrap']
    },
    'angular-strap': {
      deps: ['angular']
    },
    'angular-touch' : {
      deps: ['angular']
    },
    'angular-strap-tpl': {
      deps: ['angular', 'angular-strap']
    },
    bootstrap: {
      deps: ['jQuery']
    },
    'angular-translate': {
      deps: ['angular']
    },
    'angular-translate-loader': {
      deps: ['angular-translate']
    },
    'angular-translate-loader-static': {
      deps: ['angular-translate']
    },
    tweenmax: {
      deps: ['jQuery']
    },
    TweenLite: {
      deps: ['jQuery']
    },
    scrolltoplugin: {
      deps: ['angular', 'TweenLite']
    },
    'angular-animate': {
      deps: ['angular']
    }
  }
});
require([
    'require',
  'angular',
  'app',
  'tweenmax',
//  'viewport-units-buggyfill',
//  'viewport-units-buggyfill.hacks',
  'jQuery',
  'bootstrap',
  'angular-ui-router',
  'angular-bootstrap',
  'angular-bootstrap-tpls',
  'scrollspy/module',
  'home/controller',
  'donation/controller',
  'contacts/controller',
  'about/controller',
  'angular-translate',
  'angular-translate-loader-static',
  'TweenLite',
  'scrolltoplugin',
  'angular-touch',
  'angular-animate',
    'fb-integration'
], function(require, angular, app) {
  app.config(function($locationProvider, $urlRouterProvider, $translateProvider) {
    var lang = 'ua';
    if (location.pathname.indexOf('/en/') !== -1) {
      lang = 'en';
//      location.pathname = '/en';
    }

    $translateProvider.preferredLanguage(lang);
    $('[data-value=' + lang + ']').addClass('active');

    $translateProvider.useStaticFilesLoader({
      prefix: require.toUrl('../wp-languages/'),
      suffix: '.json'
    });

    //$translateProvider.useSanitizeValueStrategy('sanitize');
    $locationProvider.html5Mode(true);
    // For any unmatched url, send to /route1
    //$urlRouterProvider.otherwise('/');
  })
    .controller('NavigationCtrl', ['$scope', '$translate',
        function($scope, $translate) {
          $scope.items = [
            { link: '/', label: 'menu.label', target: 'home' },
            { link: '#donation', label: 'menu.donation', target: 'donation' },
            { link: '#about', label: 'menu.about', target: 'about' }
          ];

          var nav = document.getElementById('fredra-nav'),
              docHeight = $(document).height(),
              $langLinks = $('.lang a');

          $langLinks.on('click', function() {
            $langLinks.removeClass('active');
            var val = $(this).addClass('active').data('value');
            $translate.use(val);
          });

          window.onscroll = function(e) {
            var pageY = window.pageYOffset || document.documentElement.scrollTop;

            var koeff = (pageY + nav.offsetHeight / docHeight) * 0.05,
                opacity = (60 - koeff * 2) / 60,
                top = koeff > 20 ? '58%' : (38 + koeff + '%');

            $('div[label-carousel]').css({
              top: top,
              opacity: opacity
            });

            $('#donation-home-link-container').css({
              opacity: opacity
            });

            if (pageY + nav.offsetHeight >= docHeight) {
              $(nav).removeClass('fredra-bottom');
            } else {
              $(nav).addClass('fredra-bottom');
            }
          };
        }]);
  angular.bootstrap(document, ['fredra']);

  var isMacOS = navigator.userAgent.indexOf('Mac OS X') != -1;
  $(function() {
    var $window = $(window);
    window.scrollTime = 0.6;
    window.scrollDistance = 200;

    $window.on('mousewheel DOMMouseScroll', function(event) {

      event.preventDefault();

      var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
      var scrollTop = $window.scrollTop();
      var finalScroll = scrollTop - parseInt(delta*scrollDistance);

      TweenMax.to($window, scrollTime, {
        scrollTo : { y: finalScroll, autoKill:true },
        ease: Power3.easeOut,
        overwrite: 5
      });
    });
  });
});
