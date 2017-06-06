<?php
/**
 * Add donation section properties for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function donation_section_register($wp_customize ) {
    $wp_customize->add_setting('donation_html', array(
        'type' => 'theme_mod', // or 'option'
        'capability' => 'edit_theme_options',
        'theme_supports' => '', // Rarely needed.
        'default' => '',
        'transport' => 'postMessage', // or postMessage
        'sanitize_callback' => '',
        'sanitize_js_callback' => '', // Basically to_json.
    ));

    $wp_customize->add_setting('liqpay_public_key', array(
        'type' => 'option', // or 'option'
        'capability' => 'edit_theme_options',
        'theme_supports' => '', // Rarely needed.
        'default' => '',
        'transport' => 'postMessage', // or postMessage
        'sanitize_callback' => '',
        'sanitize_js_callback' => '', // Basically to_json.
    ));

    $wp_customize->add_setting('liqpay_private_key', array(
        'type' => 'option', // or 'option'
        'capability' => 'edit_theme_options',
        'theme_supports' => '', // Rarely needed.
        'default' => '',
        'transport' => 'postMessage', // or postMessage
        'sanitize_callback' => '',
        'sanitize_js_callback' => '', // Basically to_json.
    ));

    $wp_customize->add_section( 'donation_section', array(
        'title' => __( 'Donation section' ),
        'description' => __( 'Add details to donation section.' ),
        'panel' => '', // Not typically needed.
        'priority' => 161,
        'capability' => 'edit_theme_options',
        'theme_supports' => '', // Rarely needed.
    ));

    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'liqpay_public_key',
            array(
                'label'          => __( 'Liqpay public key', 'theme_name' ),
                'section'        => 'donation_section',
                'settings'       => 'liqpay_public_key',
                'type'           => 'textarea',
                'choices'        => array(
                    'dark'   => __( 'Dark' ),
                    'light'  => __( 'Light' )
                ),
                'input_attrs' => array(
                    'class' => 'my-custom-class-for-js',
                    'style' => 'height: 50px',
                    'placeholder' => __( 'liqpay_public_key' ),
                )
            )
        )
    );

    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'liqpay_private_key',
            array(
                'label'          => __( 'Liqpay private key', 'theme_name' ),
                'section'        => 'donation_section',
                'settings'       => 'liqpay_private_key',
                'type'           => 'textarea',
                'choices'        => array(
                    'dark'   => __( 'Dark' ),
                    'light'  => __( 'Light' )
                ),
                'input_attrs' => array(
                    'class' => 'my-custom-class-for-js',
                    'style' => 'height: 50px',
                    'placeholder' => __( 'liqpay_private_key' ),
                )
            )
        )
    );

    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'donation',
            array(
                'label'          => __( 'Description', 'theme_name' ),
                'section'        => 'donation_section',
                'settings'       => 'donation_html',
                'type'           => 'textarea',
                'choices'        => array(
                    'dark'   => __( 'Dark' ),
                    'light'  => __( 'Light' )
                ),
                'input_attrs' => array(
                    'class' => 'my-custom-class-for-js',
                    'style' => 'height: 500px',
                    'placeholder' => __( 'JSON format' ),
                )
            )
        )
    );
}

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function about_section_register($wp_customize) {
    $wp_customize->add_setting('about_html', array(
        'type' => 'theme_mod', // or 'option'
        'capability' => 'edit_theme_options',
        'theme_supports' => '', // Rarely needed.
        'default' => '',
        'transport' => 'postMessage', // or postMessage
        'sanitize_callback' => '',
        'sanitize_js_callback' => '', // Basically to_json.
    ));

    $wp_customize->add_section( 'about_section', array(
        'title' => __( 'About section' ),
        'description' => __( 'Add details to about section.' ),
        'panel' => '', // Not typically needed.
        'priority' => 160,
        'capability' => 'edit_theme_options',
        'theme_supports' => '', // Rarely needed.
    ));

    $wp_customize->add_control(
        new WP_Customize_Control(
            $wp_customize,
            'about',
            array(
                'label'          => __( 'Description', 'theme_name' ),
                'section'        => 'about_section',
                'settings'       => 'about_html',
                'type'           => 'textarea',
                'choices'        => array(
                    'dark'   => __( 'Dark' ),
                    'light'  => __( 'Light' )
                ),
                'input_attrs' => array(
                    'class' => 'my-custom-class-for-js',
                    'style' => 'height: 500px',
                    'placeholder' => __( 'JSON format' ),
                )
            )
        )
    );
}

add_action( 'customize_register', 'donation_section_register' );