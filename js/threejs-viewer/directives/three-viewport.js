define(['angular'], function(angular) {
  angular.module('three-directives', []).directive('threeViewport', ['ThreeService', function(ThreeService) {
    return {
      restrict: 'AE',
      link: function(scope, element, attribute) {
        var renderer,
            camera = ThreeService.perspectiveCam,
            scene = ThreeService.scene,
            attributes = ThreeService.attributes,
            uniforms = ThreeService.uniforms,
            geometry = ThreeService.geometry,
            shaderMaterial = ThreeService.material,
            object;
        init();
        animate();
        function init() {
          object = new THREE.Line(geometry, shaderMaterial, THREE.LineStrip);

          var vertices = object.geometry.vertices;

          var displacement = attributes.displacement.value;
          var color = attributes.customColor.value;

          for (var v = 0; v < vertices.length; v++) {
            displacement[v] = new THREE.Vector3();
            color[v] = new THREE.Color(0xffffff);
            color[v].setHSL(v / vertices.length, 0.7, 0.2);
          }

          object.rotation.x = 0.2;

          scene.add(object);

          renderer = new THREE.WebGLRenderer({ antialias: true });
          renderer.setClearColor(0x050505, 1);
          renderer.setSize(window.innerWidth, window.innerHeight);
          element[0].appendChild(renderer.domElement);
          window.addEventListener('resize', onWindowResize, false);
        }

        function render() {
          var time = Date.now() * 0.001;
          object.rotation.y = 0.25 * time;
          uniforms.amplitude.value = 0.2 * Math.sin(0.5 * time);
          uniforms.color.value.offsetHSL(0.0002, 0, 0);

          var nx, ny, nz, value;

          for (var i = 0, il = attributes.displacement.value.length; i < il; i++) {

            nx = 0.3 * (0.5 - Math.random());
            ny = 0.3 * (0.5 - Math.random());
            nz = 0.3 * (0.5 - Math.random());

            value = attributes.displacement.value[i];

            value.x += nx;
            value.y += ny;
            value.z += nz;

          }

          attributes.displacement.needsUpdate = true;
          renderer.render(scene, camera);

        }

        function animate() {
          requestAnimationFrame(animate);
          render();
        }

        function onWindowResize(event) {
          renderer.setSize(window.innerWidth, window.innerHeight);
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
        }
//          $('#busy-indicator').hide();
      }
    };
  }]);
});
