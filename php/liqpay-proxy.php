<?php
require('liqpay.php');
add_action('rest_api_init', function () {
    register_rest_route( 'liqpay', '/form', array(
        'methods' => 'POST',
        'callback' => 'liqpay_form_handler',
    ) );
} );

function liqpay_form_handler() {
    $public_key = get_option('liqpay_public_key');
    $private_key = get_option('liqpay_private_key');
    $order_id = uniqid();

    $liqpay = new LiqPay($public_key, $private_key);
    $html = $liqpay->cnb_form(array(
        'version'        => '3',
        'amount'         => $_POST['amount'],
        'currency'       => 'UAH',
        'description'    => 'Добровільний внесок на підтримку незалежного проекту Фредра.61',
        'order_id'       => $order_id
    ));
    echo($order_id);
    echo($html);
}
?>