define([
  'home/home',
  'donation/selection-directive'
], function(home) {
  home.controller('donationController', ['$scope',
    function($scope) {
//      $scope.message = 'Спільними зусиллями ми безперервно даємо можливість для реалізації і втілюємо події різного спрямування, ' +
//          'приймаємо найрізноманітніших  гостей з України та світу, ' +
//          'створюємо сотні годин інформації і корисного часу для молоді на абсолютно некомерційній основі з вашою підтримкою.';
      $scope.message = 'donation_html.paragraph1';
      $scope.message2 = 'donation_html.paragraph2';
//      $scope.message2 = 'Fredra.61 - це відкрите середовище, ' +
//          'що невпинно розширює коло творчих, прогресивних і амбіційних людей, ' +
//          'які долучаються до проекту, щоб своїми зусиллями продемонструвати місту новий формат. ' +
//          'А в короткій перспективі, обов’язково подолати консервативний і ' +
//          'створити багатовекторний, сучасний, конкурентоспроможний імідж молодого міста в Європі та світі. ' +
//          'Міста в якому хочеться жити!';

      $scope.end = 'donation_html.call';

      $scope.thank = ['donation.thank.par1', 'donation.thank.par2'];

      $scope.items = [
        {
          label: 'Приватбанк',
          name: 'privatbank',
          src: '../images/pb_ua.png'
        },
        {
          label: 'Liq pay',
          name: 'liqpay',
          src: '../images/pb_ua.png'
        }
//        {
//          label: 'Money UA',
//          name: 'moneyua',
//          src: '/app/images/money_ua.png'
//        }
      ];

      $('#donation').delegate('#liqpay form input[type="submit"]', 'click', function() {
        $.ajax({
          url: require.toUrl('/wp-json/liqpay/form'),
          // url: require.toUrl('../php/liqpay-proxy.php'),
          type: 'POST',
          dataType: 'html',
          data: {amount: $('#liqpay form input[type="number"]').val()},
          success: function(form2) {
            var f = $(document.body).append(form2);
            f.find('form').submit();
          }
        });
      });
    }]);
});

