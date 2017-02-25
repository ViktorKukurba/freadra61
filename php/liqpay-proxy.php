<?php

require_once('liqpay.php');

$public_key = 'i35516490431';
$private_key = 'rnBGvUOdCySFmt9rb0HKu9BSIIvosHfDz6dy4ykt';
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
?>