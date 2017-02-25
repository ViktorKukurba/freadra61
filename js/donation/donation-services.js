define(['angular'], function(angular) {
  angular.module('donation-services', []).factory('generateCode', function() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    function generateCode(len) {
      len = len || 8;
      var text = '';
      for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    return {
      getCode: generateCode
    };
  })
      .factory('pbRequestData', ['$http', function($http) {
        var pbConfig,
            init = false,
            callback;
        $http.get('./pb-config.json').
            success(function(data, status, headers, config) {
              init = true;
              pbConfig = data;
              callback(data);
            });

        return {
          isInit: function() {
            return init;
          },
          getPbConfig: function() {
            return pbConfig;
          },
          setCallback: function(cb) {
            callback = cb;
          }
        };
      }])
      .factory('privatebankData', ['generateCode', 'pbRequestData', function(generateCode, pbRequestData) {
        var data = {};
        data.pbOrder = generateCode.getCode();
        if (pbRequestData.isInit()) {
          var config = pbRequestData.getPbConfig();
          setData(config);
        } else {
          pbRequestData.setCallback(function(config) {
            setData(config);
          });
        }
        function setData(config) {
          data.pbMerchant = config.merchant;
          data.pbDetails = config.details;
          data.pbreturn_url = config.return_url;
          data.pbExt_details = config.ext_details;
          data.pbdefaultAmount = config.defaultAmount;
        }

        return data;
      }])
      .factory('moneyuaRequestData', ['$http', function($http) {
        var pbConfig,
            init = false,
            callback;
        $http.get('./moneyua-config.json').
            success(function(data, status, headers, config) {
              init = true;
              pbConfig = data;
              callback(data);
            });

        return {
          isInit: function() {
            return init;
          },
          getPbConfig: function() {
            return pbConfig;
          },
          setCallback: function(cb) {
            callback = cb;
          }
        };
      }])
      .factory('moneyuaData',function(moneyuaRequestData) {
        var data = {};
        if (moneyuaRequestData.isInit()) {
          var config = moneyuaRequestData.getPbConfig();
          setData(config);
        } else {
          moneyuaRequestData.setCallback(function(config) {
            setData(config);
          });
        }
        function setData(config) {
          data.mustep = config.step;
          data.muokpo = config.okpo;
          data.muacc = config.acc;
          data.muname = config.name;
          data.mudefaultAmount = config.defaultAmount;
          data.mumfo = config.mfo;
          data.muinfo = config.info;
        }

        return data;
      }).factory('donationForm', ['$http', '$q', function(http, q) {
        return q.all({
          privatbank: http.get(require.toUrl('../pb-config.json')),
          moneyua: http.get(require.toUrl('../moneyua-config.json')),
          easypayua: http.get(require.toUrl('../easypayua-config.json')),
          liqpay: {}
        });
      }]);
});

