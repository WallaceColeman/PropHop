
'use strict';
	
	Physijs.scripts.worker = '/js/ThreeLib/physijs_worker.js';
	Physijs.scripts.ammo = "http://chandlerprall.github.io/Physijs/examples/js/ammo.js";
    
    var scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0,-25,0));

    var camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;

    // Light code is based off of https://threejsfundamentals.org/threejs/lessons/threejs-shadows.html
    // ambient light to dimly lit the scene, and add directional light
 //   var am_light = new THREE.AmbientLight(0x444444 );
//	scene.add(am_light);

	// directional light
//	var dir_light = new THREE.SpotLight(0xFFFFFF);
 //   dir_light.position.set(-40,60,40);
//	dir_light.target.position.copy(scene.position);
//	dir_light.castShadow = true;
//	dir_light.shadow.bias = -.001
//	dir_light.shadow.mapSize.width = dir_light.shadow.mapSize.height = 2048;
//	scene.add(dir_light);

 
    

    //Based heavily on code by: Happy Chuck Programming
    //Location: https://www.youtube.com/watch?v=ARXYPRCNB14&t=33s&ab_channel=HappyChuckProgramming
    //Posted:   02/19/2019
    //Accessed: 02/03/2020
    var red = "rgb(255,0,0)";
    var green = "rgb(10,200,10)";
    var black = "rgb(0,0,0)";
    var blue = "rgb(0,64,255)";
    var block;

 //   renderer.setClearColor(black);
    renderer.setSize(window.innerWidth-20, window.innerHeight-20);
    var loader = new THREE.TextureLoader();
    //Plane
    var planeGeometry = new THREE.PlaneGeometry(70,50,1,1);
    var planeMaterial = new THREE.MeshBasicMaterial({color:green});
    // var planeMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial({ map: loader.load( 'Images/hardwood2_diffuse.jpg' )}),
    //     0.9,
    //     0.2
    // );
    // planeMaterial.map.wrapS = table_material.map.wrapT = THREE.RepeatWrapping;
	// planeMaterial.map.repeat.set( 5, 5 );
    planeMaterial.receiveShadow = true;

    var plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
    //planeMaterial.receiveShadow = true;
    plane.receiveShadow = true;
    plane.castShadow = true;
    plane.rotation.x = -0.5*Math.PI;
    plane.rotation.y = (0.125)*Math.PI;
    scene.add(plane);

    //2nd Plane
    // planeGeometry = new THREE.PlaneGeometry(100,50,1,1);
    // planeMaterial = new THREE.MeshBasicMaterial({color:blue});
    // planeMaterial.receiveShadow = true;

    // plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
    // plane.rotation.x = -0.5*Math.PI;
    // plane.position.x = 30;
    // plane.position.y = -15
    // plane.receiveShadow = true;
    // plane.castShadow = true;
    // scene.add(plane);

    var plane_material = Physijs.createMaterial(
        new THREE.MeshStandardMaterial( { color: blue } ), .3, .9 // low restitution
    );
    // Ground
    plane = new Physijs.BoxMesh(new THREE.BoxGeometry(100, 50, 1, 1),plane_material,0 // mass
    );
    plane.receiveShadow = true;
    scene.add( plane );

    //Cube - Code created by chandlerprall
    var cube_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/hardwood2_diffuse.jpg' )}),
        .4, // medium friction
        .4 // medium restitution
    );
    cube_material.map.wrapS = cube_material.map.wrapT = THREE.RepeatWrapping;
    cube_material.map.repeat.set( 1, .5 );
    cube_material.castShadow = true;

    var cubeGeometry = new THREE.BoxGeometry(6, 6, 6);
    var cube = new Physijs.BoxMesh(cubeGeometry, cube_material)
    cube.receiveShadow = true;
	cube.castShadow = true;
	scene.add(cube);

    //Cube original code
//     var cubeGeometry = new THREE.CubeGeometry(6,6,6);
//     //var cubeMaterial = new THREE.MeshLambertMaterial({color:red});
//     var cubeMaterial = Physijs.createMaterial(
//         new THREE.MeshBasicMaterial({ color:red}),
//         0.5,
//         0.5
//     );
//     var cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
//     cube.castShadow = true;
//     cube.receiveShadow = true;
//     cube.position.x = -10;
//     cube.position.y = 30;
//     cube.addEventListener( 'collision', function( objCollidedWith, linearVelOfCollision, angularVelOfCollision ) {
// });
//	});
 //   scene.add(cube);

    //SpotLight
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40,60,40);
    spotLight.castShadow = true;
    scene.add(spotLight);   

    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 100;
    camera.lookAt(scene.position);
    //End of code based on Happy Chuck Programming

    // https://gamedevelopment.tutsplus.com/tutorials/creating-a-simple-3d-physics-game-using-threejs-and-physijs--cms-29453
    scene.addEventListener( 'update', function() {
    //your code. physics calculations have done updating
});
 
    var maxVelocity = 15;
    var player = cube.id;
    var ground = plane.position.y;
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        //var velocity = new THREE.Vector3();
        var velocity = scene.getObjectById(player).getLinearVelocity();
        if (keyCode == 87) {//w
            //scene.getObjectById(player).se
            velocity.z -= 0.5; 
        } else if (keyCode == 83) {//s
            //scene.getObjectById(player).position.y -= ySpeed;
            velocity.z += 0.5; 
        } else if (keyCode == 65) {//a
            //scene.getObjectById(player).position.x -= xSpeed;
            velocity.x -= 0.5; 
        } else if (keyCode == 68) {//d
            //scene.getObjectById(player).position.x += xSpeed;
            velocity.x += 0.5; 
        } else if (keyCode == 82) {//Letter "r: to restart, might change later
            scene.getObjectById(player).position.set(0, 30, 0);
            scene.getObjectById(player).__dirtyPosition = true;
            velocity = new THREE.Vector3()
            velocity.x = 15;
            velocity.y = 20;
        } else if (keyCode == 32 && velocity.y <= maxVelocity) {//Space Bar, to jump
             velocity.y += 15;
        }
        scene.getObjectById(player).setLinearVelocity(velocity);
    };

  //  const cameraHelper = new THREE.CameraHelper(dir_light.shadow.camera);
  //  scene.add(cameraHelper);


    function renderScene(){

        scene.simulate();
        requestAnimationFrame(renderScene);
        camera.position.x = scene.getObjectById(player).position.x;
        camera.position.y = scene.getObjectById(player).position.y+25;
        renderer.render(scene, camera);
    }

    document.body.appendChild(renderer.domElement);
    renderScene();