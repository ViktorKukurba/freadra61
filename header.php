<?php?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <title>Fredra.61</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta charset="windows-1251">
    <meta name="description" content="Молодіжна платформа Fredra.61. Розвиток молодіжного, культурного життя міста">
    <meta name="keywords" content="фредра, fredra, актовий зал, 61, події львів">
    <meta name="author" content="Fredra">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <base href="/"></base>
    <link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico" />
    <?php wp_head(); ?>
    <script defer="defer">window.viewportUnitsBuggyfill.init({hacks: window.viewportUnitsBuggyfillHacks});</script>

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

        <script type="x-shader/x-vertex" id="vertexshader">

    			uniform float amplitude;

    			attribute vec3 displacement;
    			attribute vec3 customColor;

    			varying vec3 vColor;

    			void main() {

    				vec3 newPosition = position + amplitude * displacement;

    				vColor = customColor;

    				gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

    			}



        </script>

        <script type="x-shader/x-fragment" id="fragmentshader">

    			uniform vec3 color;
    			uniform float opacity;

    			varying vec3 vColor;

    			void main() {

    				gl_FragColor = vec4( vColor * color, opacity );

    			}


        </script>
</head>
<body scroll-spy="" data-scroll-offset="80" data-target="#page-navigation">