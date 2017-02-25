define([
  'angular',
  'detector'
], function(angular) {
  angular.module('homeServices', []).factory('dataProvider', function() {
    return $.ajax({
      url: '/wp-json/wp/v2/posts?categories=2'
    }).then(function(response) {
      var messages = [];
      var size = getSize();
      var data = $.map(response, function(item) {
        messages.push(item.title);
        return {
          src: size == 2560 ? item.better_featured_image.source_url :
              item.better_featured_image.media_details.sizes[size].source_url,
          caption: 'post-name-' + item.slug,
          type: 'image'
        };
      });

      return {
        data: data,
        messages : messages
      };
    });

    function getSize() {
      var width = $(window).width(),
          SCREEN_WIDTH = {
            'xs-max': 768,
            'sm-min': 768,
            'sm-max': 992,
            'md-min': 992,
            'md-max': 1200,
            'lg-min': 1200,
            'lg-max': 1600,
            'xl-min': 1600,
            'xl-max': 1920,
            'xl-min1': 1920,
            'xl-max1': 2040,
            'xl-min2': 2040,
            'xl-max2': 2560
          };

      switch (true) {
        case (width < SCREEN_WIDTH['xs-max']) : return '769';
        case (SCREEN_WIDTH['sm-min'] <= width && width <= SCREEN_WIDTH['sm-max']) : return '992';
        case (SCREEN_WIDTH['md-min'] <= width && width <= SCREEN_WIDTH['md-max']) : return '1200';
        case (SCREEN_WIDTH['lg-min'] <= width && width <= SCREEN_WIDTH['lg-max']) : return '1600';
        case (SCREEN_WIDTH['xl-min'] <= width && width <= SCREEN_WIDTH['xl-max']) : return '1920';
        case (SCREEN_WIDTH['xl-min1'] <= width && width <= SCREEN_WIDTH['xl-max1']) : return '2040';
        case (SCREEN_WIDTH['xl-min2'] <= width && width <= SCREEN_WIDTH['xl-max2']) : return '2560';
        case (width > SCREEN_WIDTH['xl-max2']) : return + '2560';
      }
    }
    //var data = [
    //  {
    //    src: require.toUrl('../images/fdr_titles/independent_size.jpg'),
    //    caption: 'home.slogan1',
    //    type: 'image'
    //  },
    //  {
    //    src: require.toUrl('../images/fdr_titles/open_size.jpg'),
    //    caption: 'home.slogan2',
    //    type: 'image'
    //  },
    //  {
    //    src: require.toUrl('../images/fdr_titles/free_size.jpg'),
    //    type: 'image',
    //    caption: 'home.slogan3'
    //  },
    //  {
    //    src: require.toUrl('../images/fdr_titles/people_size.jpg'),
    //    type: 'image',
    //    caption: 'home.slogan4'
    //  }
    //  ],
    //  messages = ['home.slogan1', 'home.slogan2', 'home.slogan3', 'home.slogan4'];

    //var showFredra = localStorage.getItem('showFredra');
    ////Temporary prevented by false.
    //if (Detector.webgl && false) {
    //  data.push({
    //    type: 'threejs',
    //    caption: 'громадська організація'
    //  });
    //}
    //
    //return {
    //  data: data,
    //  messages : messages
    //};
  });
});
