<?php
/**
 * Fredra: Customizer
 *
 * @package WordPress
 * @subpackage Fredra
 * @since 1.0
 */

 add_action('save_post', 'save_post_handler', 10, 3 );

 function save_post_handler($post_id, $post, $update) {
 //    $json_value = json_decode('{"en": "Place for people", "ua": "Простір для людей"}', true);
     $json_value = json_decode($post->post_content, true);
     $property = 'post-name-' .$post->post_name;
     save_locale_languages($property, $json_value, 'en');
     save_locale_languages($property, $json_value, 'ua');
 }

 function save_locale_languages($property, $json_value, $locale) {
     if (!$json_value) return;
     $file = get_template_directory() . '/wp-languages/' . $locale . '.json';
     $current = file_get_contents($file);
     $string = trim(preg_replace('/\s+/', ' ', $current));
     if (empty($string)) {
         $string = "{}";
     }
     $json_data = json_decode($string, true);
//     $value = mb_convert_encoding($json_value[$locale], 'UTF-8', 'auto');
     foreach ($json_value[$locale] as $prop => $value) {
         $value = mb_convert_encoding($value, 'UTF-8', 'auto');
         if ($value) {
             if (gettype($json_data[$property]) != 'array') {
                 $json_data[$property] = array();
             }
             $json_data[$property][$prop] = $value;
         } else if ($json_data[$property]) {
             unset($json_data[$property]);
         }
     }
     if ($locale) {
         file_put_contents($file, json_encode($json_data));
     }
 }
add_filter( 'customize_save_after', 'save_locales_data', 10, 2 );
function save_locales_data( $response, $obj)
{
    $value = json_decode(stripslashes($_POST['customized']));
    if ($value) {
        $arr = array("about_html", "donation_html");
        foreach ($arr as $section) {
            save_locale_languages($section, json_decode($value->$section, true), "en");
            save_locale_languages($section, json_decode($value->$section, true), "ua");
        }
    }
    return $response;
}

require_once('donetion-section.php');

add_action( 'customize_register', 'about_section_register' );
