
'use strict';
	
	Physijs.scripts.worker = '/js/ThreeLib/physijs_worker.js';
	Physijs.scripts.ammo = "http://chandlerprall.github.io/Physijs/examples/js/ammo.js";
    
    var scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0,-25,0));

    var camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    

    //Based heavily on code by: Happy Chuck Programming
    //Location: https://www.youtube.com/watch?v=ARXYPRCNB14&t=33s&ab_channel=HappyChuckProgramming
    //Posted:   02/19/2019
    //Accessed: 02/03/2020
    var red = "rgb(255,0,0)";
    var green = "rgb(10,200,10)";
    var black = "rgb(0,0,0)";
    var blue = "rgb(0,64,255)"

    renderer.setClearColor(black);
    renderer.setSize(window.innerWidth-20, window.innerHeight-20);

    //Plane
    var planeGeometry = new THREE.PlaneGeometry(70,30,1,1);
    var planeMaterial = new THREE.MeshBasicMaterial({color:green});

    var plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5*Math.PI;
    plane.rotation.y = (0.125)*Math.PI;
    scene.add(plane);

    //2nd Plane
    planeGeometry = new THREE.PlaneGeometry(70,30,1,1);
    planeMaterial = new THREE.MeshBasicMaterial({color:blue});

    plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5*Math.PI;
    plane.position.x = 30;
    plane.position.y = -15
    scene.add(plane);

    //Cube
    var cubeGeometry = new THREE.CubeGeometry(6,6,6);
    //var cubeMaterial = new THREE.MeshLambertMaterial({color:red});
    var cubeMaterial = Physijs.createMaterial(
        new THREE.MeshBasicMaterial({ color:red}),
        0.5,
        0.5
    );
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
    //End of code based on Happy Chuck Programming
    
    var player = cube.id;
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        //var velocity = new THREE.Vector3();
        var velocity = scene.getObjectById(player).getLinearVelocity()
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
        } else if (keyCode == 32) {//Space Bar
            scene.getObjectById(player).position.set(0, 30, 0);
        }
        scene.getObjectById(player).setLinearVelocity(velocity);
    };

    function renderScene(){

        scene.simulate();
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    document.body.appendChild(renderer.domElement);
    renderScene();