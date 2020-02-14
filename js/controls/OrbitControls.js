// https://github.com/mmmovania/Physijs_Tutorials/blob/master/SimpleBall.html
// to use for non-sphirical objects, for box like objects simply applying force without the offset
//

'use strict';

     Physijs.scripts.worker = 'js/physijs_worker.js';
     Physijs.scripts.ammo = 'ammo.js';

     var initScene, render, renderer, scene, camera, box, floor;

     var container;

     var camera, scene, controls, renderer;

     var mouseX = 0, mouseY = 0;

     var ball, forceAmount = 100;

     var windowHalfX = window.innerWidth / 2;
     var windowHalfY = window.innerHeight / 2;
     var clock = new THREE.Clock();

     init();
     animate();

     function addBall(pos, texture) {

       // shared sphere geometry
       var geometry = new THREE.SphereGeometry( 1, 32, 32 );

       // separate material for each sphere
       var friction = 0.8; // high friction
       var restitution = 0.8; // low restitution

       var material = Physijs.createMaterial(
         new THREE.MeshPhongMaterial( {color: 0xff0000, map: texture} ),
         friction,
         restitution
       );


       ball = new Physijs.SphereMesh( geometry, material,5 );
       //var linearDamping = 1;
       //var angularDamping = 0.0;
       //ball.setDamping(linearDamping, angularDamping);

       ball.position.copy(pos);
       ball.castShadow = true;
       scene.add( ball );
     }

     function init() {

       container = document.createElement( 'div' );
       document.body.appendChild( container );

       camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 10000 );

       camera.position.z = 10;
       camera.position.y = 5;

       controls = new THREE.OrbitControls( camera );


       // scene

       scene = new Physijs.Scene;
       scene.setGravity(new THREE.Vector3( 0, -10, 0 ));




       var texture = new THREE.Texture();
       var texture2 = new THREE.Texture();
       var manager = new THREE.LoadingManager();
       manager.onProgress = function ( item, loaded, total ) {
         console.log( item, loaded, total );
       };

       var loader = new THREE.ImageLoader( manager );
       loader.load( 'textures/checker.jpg', function ( image ) {
         texture.image = image;
         texture.wrapS = THREE.RepeatWrapping;
         texture.wrapT = THREE.RepeatWrapping;
         texture.repeat.set( 4, 4);
         texture.needsUpdate = true;

         //floor
         var friction = 1; // high friction
         var restitution = 0.3; // low restitution

         var material = Physijs.createMaterial(
           new THREE.MeshPhongMaterial({ color:0xffffff, map:texture}),
           friction,
           restitution
         );
         floor = new Physijs.BoxMesh(
           new THREE.CubeGeometry( 50, 0.1, 50 ),
           material,
           0 //mass
         );
         floor.receiveShadow = true;
         floor.position.set(0,0,0);
         scene.add( floor );

       } );

       loader.load( 'textures/basket_ball.jpg', function ( image ) {
         texture2.image = image;
         texture2.needsUpdate = true;

         addBall(new THREE.Vector3(0,5,0), texture2);

       } );



       var ambientLight = new THREE.AmbientLight( 0x707070 );
       scene.add( ambientLight );

       var light = new THREE.DirectionalLight( 0xffffff, 1 );
       light.position.set( -10, 18, 5 );
       light.castShadow = true;
       var d = 14;
       light.shadow.camera.left = -d;
       light.shadow.camera.right = d;
       light.shadow.camera.top = d;
       light.shadow.camera.bottom = -d;

       light.shadow.camera.near = 2;
       light.shadow.camera.far = 50;

       light.shadow.mapSize.x = 1024;
       light.shadow.mapSize.y = 1024;

       scene.add( light );

         //

       renderer = new THREE.WebGLRenderer();
       renderer.setPixelRatio( window.devicePixelRatio );
       renderer.setSize( window.innerWidth, window.innerHeight );
       renderer.shadowMap.enabled = true;
       container.appendChild( renderer.domElement );

       container.appendChild( renderer.domElement );

       document.addEventListener( 'mousemove', onDocumentMouseMove, false );
       //add keydown handling
       document.addEventListener("keydown", function (event) {

         var key = event.keyCode;
         var movement = new THREE.Vector3 (0.0);
         switch(key) {
           case 87: { // w key pressed
             movement.z = -1 * forceAmount;
           } break;

           case 83: { // s key pressed
             movement.z = 1 * forceAmount;
           } break;

           case 65: { // a key pressed
             movement.x = -1 * forceAmount;
           } break;

           case 68: { // d key pressed
             movement.x = 1 * forceAmount;
           } break;
         }

         ball.applyForce (movement, new THREE.Vector3(0,1,0));

       });

       window.addEventListener( 'resize', onWindowResize, false );

     }

     function onWindowResize() {

       windowHalfX = window.innerWidth / 2;
       windowHalfY = window.innerHeight / 2;

       camera.aspect = window.innerWidth / window.innerHeight;
       camera.updateProjectionMatrix();

       renderer.setSize( window.innerWidth, window.innerHeight );

     }

     function onDocumentMouseMove( event ) {

       mouseX = ( event.clientX - windowHalfX ) / 2;
       mouseY = ( event.clientY - windowHalfY ) / 2;

     }

     //

     function animate() {

       requestAnimationFrame( animate );
       render();

     }

     function render() {
       var deltaTime = clock.getDelta();
       controls.update(deltaTime);
       scene.simulate(); // run physics

       camera.lookAt( scene.position );

       renderer.render( scene, camera );

     }
