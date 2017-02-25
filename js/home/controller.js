define([
    'require',
  'angular',
  'home/home'
], function(require, angular) {
  angular.module('fredra.home')
      .controller('homeController', [
        '$scope',
        'dataProvider',
        'videoInitializer',
        // 'fbStreamInitializer',
        function($scope, dataProvider, videoInitializer) {
//          loadImage();

          // Defining user logged status
          $scope.logged = false;
          //var size = getSize();
          dataProvider.then(function(response) {
            $scope.items = response.data;
            $scope.messages = response.messages;
            if (response.data.length) {
              loadImage(response.data[0].src);
            }
            //response.data.forEach(function(item) {
            //  loadImage(item.src);
            //});

            $('.carousel').carousel({
              interval: false
            });
          });

            // fbStreamInitializer.init();
          //    .data.forEach(function(item) {
          //  item.src = item.src.replace('size', size);
          //  loadImage(item.src);
          //});

          //$scope.items = dataProvider.data;
          //$scope.messages = dataProvider.messages;



          function carouselGo() {
            $('div.carousel').mouseenter().mouseleave().mouseenter();
          }

          function slideCarousel() {
            $('span.glyphicon.glyphicon-chevron-right').click();
          }

          var interval = setInterval(slideCarousel, 4000);
          $('#carousel-generic').delegate('a.carousel-control, .carousel-indicators li','click', function() {
            clearInterval(interval);
            interval = setInterval(slideCarousel, 4000);
          });

          $scope.showPrev = function() {
            $('span.glyphicon.glyphicon-chevron-left').click();
          };

          $scope.showNext = function() {
            $('span.glyphicon.glyphicon-chevron-right').click();
          };

          $scope.pause1 = function() {
          };
          $scope.play1 = function() {
          };

          $scope.swipeLeft = function(){
            $('span.glyphicon.glyphicon-chevron-right').click();
          };

          $scope.swipeRight = function(){
            $('span.glyphicon.glyphicon-chevron-left').click();
          };

//          var hash = location.hash.split('/'),
//              val = hash[hash.length - 1].replace('/', '').replace(/#/g, '');
//          if (val) {
//            $('html, body').animate({scrollTop: $('#' + val).offset().top + 80 }, 500);
//          }

//          var seenVideo = true,//localStorage.getItem('seenVideo'),
//              interval = 5000;
//          localStorage.setItem('seenVideo', true);
//          $scope.myInterval = seenVideo ? interval : -interval;

          function addVideoHandlers() {
            videoInitializer.init($scope);
            videoInitializer.addHandler('play', function() {
              $scope.myInterval = -interval;
              carouselGo();
              $scope.pause1();
            });
            videoInitializer.addHandler('ended', function() {
              $scope.myInterval = interval;
              $scope.play1();
              carouselGo();
            });
            videoInitializer.addHandler('pause', function() {
              $scope.myInterval = interval;
              carouselGo();
              $scope.play1();
            });
            videoInitializer.addHandler('success', function() {
              console.log('#busy-indicator');
              $('#busy-indicator').hide();
            });
          }

          $('#donation-home-link-container').on('click', function() {
            $('html, body').animate({scrollTop: $('#donation').offset().top - 80 }, 500);
          });

          function loadImage(url) {
            //url.replace('size', getSize());
            $('<img/>').attr('src', require.toUrl(url)).on('load', function() {
              // prevent memory leaks as @benweet suggeste
              setTimeout(function() {
                $('#busy-indicator')
                    .css({
                      opacity: 0,
                      visibility: 'hidden'
                    });
              }, 7e2);
            });
          }
        }]).controller('wpadminController', [function() {

      }])
      .directive('labelCarousel', function($timeout) {
        return {
          compile: function compile() {
            return {
              post: function(scope, element) {
                var index = 0,
                    $element = $(element),
                    interval = setInterval(slide, 4000),
                    removeTimeout;

                $element.on('click', 'li', function(e) {
                  index = $(e.target).data('value') - 1;
                  clearInterval(interval);
                  clearTimeout(removeTimeout);
                  slide();
                  interval = setInterval(slide, 4000);
                });

                function slide() {
                  var labels = $element.find('.carousel-label'),
                      len = labels.length;
                  if (len - 1 <= index) {
                    index = -1;
                  }

                  var out = $element.find('div.active').addClass('animated fadeOutDown');
                  $element.find('li').removeClass('active').eq(index+1).addClass('active');
                  removeTimeout = setTimeout(function() {
                    out.removeClass('active animated fadeOutDown');
//                    $('#busy-indicator').hide();

                    var item = $element.find('.carousel-label').eq(++index).addClass('active');
                    item.addClass('animated fadeInDown');
                  }, 500);
                }
              }
            };
          },
          templateUrl: require.toUrl('home/label-carousel.html'),
          restrict: 'A',
          scope: true
        };
      });
});
