define([
  'angular',
  'three',
  'typeface',
  'droid-sans',
  'droid-sans-bold'
], function(angular) {
    angular.module('three-service', []).service('ThreeService', function () {
        // default values for camera
        var text = 'Fredra.61',
            height = 15,
            size = 50,

            curveSegments = 10,
            steps = 40,

            bevelThickness = 5,
            bevelSize = 1.5,
            bevelSegments = 10,
            bevelEnabled = true,

            font = "droid sans", 		// helvetiker, optimer, gentilis, droid sans, droid serif
            weight = "bold",		// normal bold
            style = "normal",		// normal italic

            WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        var scene = new THREE.Scene(),
            camera = new THREE.PerspectiveCamera( 40, WIDTH / HEIGHT, 2, 5000),
            attributes = {
                displacement: {	type: 'v3', value: [] },
                customColor: {	type: 'c', value: [] }
            },

            uniforms = {
                amplitude: { type: "f", value: 5.0 },
                opacity:   { type: "f", value: 0.3 },
                color:     { type: "c", value: new THREE.Color( 0xff0000 ) }
            };

        var shaderMaterial = new THREE.ShaderMaterial( {
            uniforms:       uniforms,
            attributes:     attributes,
            vertexShader:   document.getElementById( 'vertexshader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
            blending:       THREE.AdditiveBlending,
            depthTest:      false,
            transparent:    true

        });

        shaderMaterial.linewidth = 1;
        camera.position.z = 400;
        geometry = new THREE.TextGeometry( text, {

            size: size,
            height: height,
            curveSegments: curveSegments,

            font: font,
            weight: weight,
            style: style,

            bevelThickness: bevelThickness,
            bevelSize: bevelSize,
            bevelEnabled: bevelEnabled,
            bevelSegments: bevelSegments,

            steps: steps

        });

        geometry.dynamic = true;

        geometry.center();
        return {
            perspectiveCam: camera,
            scene: scene,
            material: shaderMaterial,
            geometry: geometry,
            uniforms: uniforms,
            attributes: attributes
        };
    });
});
