define([
  'angular',
  'media'
], function(angular) {
  angular.module('videoViewer', [])
      .factory('videoInitializer', function() {
        var player,
            played = false,
            handlers = {};

        function runHandlers(type) {
          if (handlers[type] && handlers[type].length) {
            handlers[type].forEach(function(item) {
              item();
            });
          }
        }

        function initialize(scope) {
          player = new MediaElementPlayer('video', {
            success: function(media, node, player) {
              runHandlers('success');
              $('#' + node.id + '-mode').html('mode: ' + media.pluginType);
              media.addEventListener('play', function(e) {
                $('.item.active .carousel-caption').hide();
                $('.carousel-indicators').hide();
                $('#donation-parent').addClass('smoke')
                    .removeClass('expanded');
                $('#donation-container').css('opacity', 0.8);
                $('a.carousel-control').hide();
                $('body').addClass('video-play');
                runHandlers('play');
                //location.href = '#/';
              });
              media.addEventListener('ended', function(e) {
                $('.item.active .carousel-caption').show();
                $('.carousel-indicators').show();
                $('#donation-parent').removeClass('smoke');
                $('a.carousel-control').show();
                $('#donation-container').css('opacity', 1);
                $('body').removeClass('video-play');
                runHandlers('ended');
              });
              media.addEventListener('pause', function(e) {
                $('.item.active .carousel-caption').show();
                $('.carousel-indicators').show();
                $('a.carousel-control').show();
                $('body').removeClass('video-play');
                $('#donation-parent').removeClass('smoke');
                $('#donation-container').css('opacity', 1);
                runHandlers('pause');
              });
              media.addEventListener('canplay', function() {
                //runHandlers('play');
                // Player is ready
                var seenVideo = localStorage.getItem('seenVideo');
                if (!played && !seenVideo) {
                  media.play();
                  played = true;
                }
                runHandlers('canplay');

              }, false);
            }
          });
        }

        return {
          player: player,
          init: function() {
            setTimeout(initialize, 100);
          },
          addHandler: function(type, callback) {
            handlers[type] = handlers[type] || [];
            handlers[type].push(callback);
          }
        };
      });
});
