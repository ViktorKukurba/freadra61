define([
  'angular'
], function(angular) {
  return angular.module('scrollspy', [])
      .directive('scrollSpy', function($timeout) {
        return {
          restrict: 'A',
          link: function(scope, elem, attr) {
            var offset = parseInt(attr.scrollOffset, 10);
            if (!offset) offset = 10;
            $(elem).scrollspy({ offset: offset});
            scope.$watch(attr.scrollSpy, function(value) {
              $timeout(function() {
                $(elem).scrollspy('refresh', { offset: offset});
              }, 1);
            }, true);
          }
        };
      })
      .directive('preventDefault', function() {
        return function(scope, element, attrs) {
          jQuery(element).click(function(event) {
            event.preventDefault();
          });
        };
      })
      .directive('scrollTo', ['$window', function($window) {
        return {
          restrict: 'AC',
          compile: function() {
            function scrollInto(elementId) {
              if (!elementId) $window.scrollTo(0, 0);
              //check if an element can be found with id attribute
              var el = document.getElementById(elementId);
              if (el) {
                $('html, body').animate({scrollTop: $(el).offset().top - 80 }, 500);
              }
            }

            return function(scope, element, attr) {
              element.bind('click', function(event) {
                scrollInto(attr.scrollTo);
              });
            };
          }
        };
      }]);
});
