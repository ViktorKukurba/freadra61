define([
  'angular',
  'angular-facebook'
], function (angular) {
  return angular.module('facebook-service', ['facebook'])
    .config([
      'FacebookProvider',
      function (FacebookProvider) {
        var myAppId = '380038068742752';
        FacebookProvider.init(myAppId);
      }
    ])
    .factory('fbPageData', ['Facebook', function (Facebook) {
      var pageData,
        callback,
        logged = false,
        loaded = false;

      var userIsConnected = false;

      Facebook.getLoginStatus(function (response) {
        if (response.status == 'connected') {
          userIsConnected = true;
          logged = true;
          renderFBContent();
        }
      });

      /**
       * IntentLogin
       */
      var intentLogin = function () {
        if (!userIsConnected) {
          login();
        }
      };

      /**
       * Login
       */
      var login = function () {
        Facebook.login(function (response) {
          if (response.status == 'connected') {
            logged = true;
            renderFBContent();
          } else {
            renderFBContent();
          }
        });
      };

      renderFBContent();

      function renderFBContent() {
        if (logged) {
          Facebook.api('/Fredra.61', function (response) {
            pageData = response;
            callback(pageData);
            loaded = true;
          });
        }
      }

      return {
        isLogged: function () {
          return logged;
        },

        isReady: Facebook.isReady,

        intentLogin: intentLogin,

        getPageData: function () {
          return pageData;
        },
        setCallback: function (cb) {
          callback = cb;
        }
      };
    }])
    .factory('facebookPage', ['Facebook', function (Facebook) {
      var url = '/Fredra.61',
          access = 'access_token=380038068742752|YW5qQ4Umr-6RWT_3waQS_OGakK4';
      return Facebook.api(url + '?' + access, function() {

      });
    }]);
});
