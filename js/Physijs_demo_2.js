// this is a test to interact with physijs_demo without breaking the original


'use strict';

	Physijs.scripts.worker = '/js/ThreeLib/physijs_worker.js';
	Physijs.scripts.ammo = "http://chandlerprall.github.io/Physijs/examples/js/ammo.js";

    var scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0,-10,0));

    var camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();

    var red = "rgb(255,0,0)";
    var green = "rgb(10,200,10)";
    var black = "rgb(0,0,0)";

    renderer.setClearColor(black);
    renderer.setSize(window.innerWidth-20, window.innerHeight-20);

    //Plane
    var planeGeometry = new THREE.PlaneGeometry(70,30,1,1);
    var planeMaterial = new THREE.MeshBasicMaterial({color:green});

    var plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5*Math.PI;
    scene.add(plane);


    //Cube
    var cubeGeometry = new THREE.CubeGeometry(6,6,6);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:red});
    var cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.position.x = -10;
    cube.position.y = 30;
    scene.add(cube);


    //SpotLight
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40,60,40);
    scene.add(spotLight);


    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 100;
    camera.lookAt(scene.position);

    function renderScene(){

        scene.simulate();
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    document.body.appendChild(renderer.domElement);
    renderScene();

		function onDocumentMouseMove( event )
		{
			// the following line would stop any other event handler from firing
			// (such as the mouse's TrackballControls)
			// event.preventDefault();

			// update the mouse variable
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		}

		function animate()
		{
		  requestAnimationFrame( animate );
			render();
			update();
		}
    /*
	var initScene, render, renderer, scene, camera, box;

	initScene = function() {
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.getElementById( 'viewport' ).appendChild( renderer.domElement );

		scene = new Physijs.Scene;

		camera = new THREE.PerspectiveCamera(
			35,
			window.innerWidth / window.innerHeight,
			1,
			1000
		);
		camera.position.set( 60, 50, 60 );
		camera.lookAt( scene.position );
		scene.add( camera );

		// Box
		box = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			new THREE.MeshBasicMaterial({ color: 0x888888 })
		);
		scene.add( box );

		requestAnimationFrame( render );
	};

	render = function() {
		scene.simulate(); // run physics
		renderer.render( scene, camera); // render the scene
		requestAnimationFrame( render );
	};

    window.onload = initScene();
    */
