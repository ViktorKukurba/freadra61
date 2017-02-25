define([
  'home/home'
], function(home) {
  home.controller('contactsController', ['$scope', 'facebookPage', function($scope, facebookPage) {
    //facebookPage.then(renderFBContent);

    var mapStyles = [
      {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "saturation": "-100"
          },
          {
            "lightness": "-78"
          },
          {
            "gamma": "1.04"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "saturation": 36
          },
          {
            "color": "#000000"
          },
          {
            "lightness": 40
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#000000"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
          {
            "lightness": "0"
          },
          {
            "visibility": "on"
          },
          {
            "hue": "#ff0000"
          },
          {
            "saturation": "-100"
          },
          {
            "weight": "1.52"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 21
          }
        ]
      },
      {
        "featureType": "poi.business",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "saturation": "-100"
          },
          {
            "lightness": "-60"
          },
          {
            "gamma": "0.70"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#606060"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "off"
          },
          {
            "gamma": "2.17"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#a0ff00"
          },
          {
            "saturation": "-74"
          },
          {
            "lightness": "3"
          },
          {
            "gamma": "0.75"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 29
          },
          {
            "weight": 0.2
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 18
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 19
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 17
          }
        ]
      }
    ];

    renderFBContent({
      "city":"Lviv",
      "country":"Ukraine",
      "latitude":49.833359,
      "longitude":24.038549,
      "street":"вул. Зелена, 20",
      "zip":"79005"
    });
    function renderFBContent(data) {
      $scope.location = data.location || data;

      var baseSvg = {
        x1 : "m 0,0 l45,0 l 190,225 l -45,0 l -190,-225 z",
        x2 : "m 225,0 l -45,0 l -190,225 l 45,0 l 190,-225 z"
      },
        baseIcon = {
          fillOpacity: 1,
          scale: 0.2,
          strokeColor: "black",
          strokeWeight: 0,
          rotation: 15
        },

      greenIcon = baseIcon;

      greenIcon.path = baseSvg.x1;
      greenIcon.fillColor = "#0f0";

      var mapCanvas = document.getElementById('map_canvas'),
          lat = $scope.location.latitude,
          lon = $scope.location.longitude,
          myLatlng = new google.maps.LatLng(lat, lon),
          correction = $(window).width() < 400 ? 0 : 0.003,
          center = new google.maps.LatLng(lat, lon - correction),
          fredraMarker = {
            path: 'M0,0v92.3l8.3-14.5h69.5V0H0z M51,24.2H34.4v11.6h15.4v6.3H34.4v17.8h-7.7v-42H51V24.2z',
            fillColor: '#46db77',
            scale: 0.42,
            anchor: new google.maps.Point(5,95),
            fillOpacity: 1,
//            strokeColor: "black",
            strokeWeight: 0
//            strokeColor: '#ffffff'
          },
          mapOptions = {
            center: center,
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            styles: mapStyles
          },
          map = new google.maps.Map(mapCanvas, mapOptions),
          marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Fredra.61',
            icon: fredraMarker
//            icon: 'app/images/fdr_checkpoint.png'
          });
//      $('#busy-indicator').hide();
    }
  }]);
});
