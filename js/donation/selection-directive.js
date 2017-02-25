define([
  'angular',
  'donation/donation'
], function() {
  angular.module('fredra.donation')
      .directive('donationSelection', function() {
        return {
          compile: function compile() {
            var selected;
            return {
              pre: function(scope, element) {
                var $element = $(element);
                $element.on('click', 'a', function(e) {
                  var option,
                      df = $('#donation-form');

                  if (e.target.tagName !== 'A') {
                    option = $(e.target).closest('a').attr('name');
                  } else {
                    option = e.target.name;
                  }

                  if (selected === option) {
                    $element.find('li.active').removeClass('active');
                    df.height(0);
                    selected = null;
                    setTimeout(function() {
                      df.find('.send-form.active').removeClass('active');
                    }, 500);
                  } else {
                    $element.find('li.active').removeClass('active');
                    $element.find('a[name=' + option + ']')
                        .parent().addClass('active');
                    df.find('.send-form.active').removeClass('active');
                    df.find('#' + option).toggleClass('active');
                    df.height(415);
                    selected = option;
                  }
                });
              }
            };
          },
          templateUrl: require.toUrl('donation/selection.html'),
          restrict: 'A',
          scope: true,
          controller: ['$scope', '$templateCache', '$compile', 'donationForm', 'generateCode',
            function($scope, $templateCache, $compile, donationForm, generateCode) {
              var df = $('#donation-form');
              donationForm.then(function(values) {
                $scope.items.forEach(function(item) {
                  var template = $templateCache.get(item.name + '-form');
                  df.append($compile(template)($scope));
                  $scope[item.name + 'Order'] = generateCode.getCode();
                  mergeData($scope, values[item.name].data);
                });
              });
            }]
        };
      });

  function mergeData($scope, data) {
    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        $scope[prop] = data[prop];
      }
    }
  }
});
