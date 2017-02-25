<?php

function my_resources() {
	$styles = array(
		'/css/animate.css',
		'/bower_components/bootstrap-css/css/bootstrap.min.css',
		'/bower_components/bootstrap-css/css/bootstrap-theme.min.css',
		'/images/fdr_favicon.ico',
		'/css/full-slider.css',
		'/bower_components/mediaelement/build/mediaelementplayer.min.css',
		'/build/fredra.css',
	);

	$scripts = array(
		"buggyfill" => get_template_directory_uri() . "/bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js",
    	"buggyfill.hacks" => get_template_directory_uri() . "/bower_components/viewport-units-buggyfill/viewport-units-buggyfill.hacks.js",
		"require" => get_template_directory_uri() . "/bower_components/requirejs/require.js",
		"googlemaps" => "https://maps.googleapis.com/maps/api/js?key=AIzaSyAUum_vHi139j4jSXUrVxJIHQNZd38-E3k",
	);


	add_filter('script_loader_tag', 'add_attribute_to_script', 10, 2);

    function add_attribute_to_script($tag, $handle) {
    	if (strpos($tag, 'require.js') !== false) {
    		$format = ' data-main="%s/build/main.js" defer="defer" src';
            $dataAttr = sprintf($format, get_template_directory_uri());
            return str_replace( ' src', $dataAttr, $tag );
    	}
    	return $tag;
    }

    foreach ($styles as $index=>$style ) {
		wp_enqueue_style('style' . $index, get_template_directory_uri() . $style);
	}
	foreach ($scripts as $key => $val) {
    		wp_enqueue_script('script' . $key, $val);
    }
}

add_action( 'wp_enqueue_scripts', 'my_resources' );

?>