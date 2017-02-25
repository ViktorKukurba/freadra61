<?php

require get_template_directory() . '/include-resources.php';

add_theme_support( 'post-thumbnails' );

function add_slider_section( $wp_customize ) {
   $wp_customize->add_section( 'slider_section', array(
     'title' => __( 'Slider section' ),
     'description' => __( 'Add slides to main screen' ),
     'panel' => '', // Not typically needed.
     'priority' => 160,
     'capability' => 'edit_theme_options',
     'theme_supports' => '', // Rarely needed.
   ));
}
add_action( 'customize_register', 'add_slider_section' );

remove_filter('template_redirect', 'redirect_canonical');
add_theme_support('post-thumbnails');
add_theme_support('widgets');

/**
 * Customizer additions.
 */
require get_parent_theme_file_path( '/inc/customizer.php' );
//require get_parent_theme_file_path( '/inc/widgets.php' );

?>