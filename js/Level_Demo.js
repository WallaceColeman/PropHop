"use strict";

Physijs.scripts.worker = '/js/ThreeLib/physijs_worker.js';
Physijs.scripts.ammo = "http://chandlerprall.github.io/Physijs/examples/js/ammo.js";

var scene = new Physijs.Scene;
var loader = new THREE.TextureLoader();
scene.setGravity(new THREE.Vector3(0,-25,0));


var camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 30;
camera.position.z = 100;
//camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer({performance, antialias: true });

renderer.setClearColor("rgb(135,206,235)");//skyblue
renderer.setSize(window.innerWidth-20, window.innerHeight-20);
renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//light
var light = new THREE.AmbientLight( 0x404040 ); // soft white light so entire room isn't super dark. Disable this for dark room!
scene.add(light);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,40);
spotLight.castShadow = true;
scene.add(spotLight);   


//plane
var planeGeometry = new THREE.PlaneGeometry(2000,50,1,1);
let planeMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/smooth-ice.jpg' )}),
    0.5,
    0.2
);
planeMaterial.map.wrapS = planeMaterial.map.wrapT = THREE.RepeatWrapping;
planeMaterial.map.repeat.set( 1, .5 );
var plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -0.5*Math.PI;
//plane.rotation.y = (0.125)*Math.PI;
scene.add(plane);


//Cube
let cubeGeometry = new THREE.CubeGeometry(6,6,6);
let cubeMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/hardwood2_diffuse.jpg' )}),
    1.0,
    1.0
);
cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
cubeMaterial.map.repeat.set( 1, .5 );
var cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
cube.receiveShadow = true;
cube.castShadow = true;
cube.position.y = 3;
cube.position.x = -5
scene.add(cube);

var moveIn = false;
var moveOut = false;
var moveLeft = false;
var moveRight = false;

var player = cube.id;



// var box_container = new Physijs.BoxMesh(
//     new THREE.CubeGeometry( 1, 0.7, 1.5 ),
//     new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0 })
//     // Uncomment the next line to see the wireframe of the container shape
//     // new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.5 })
// );
// // Assuming your model has already been imported
// var track = global_models.track.clone();

// track.position.set(0,0,0);
// box_container.add(track);





var GLTF_loader = new THREE.GLTFLoader();
	GLTF_loader.load(//Log
		// resource URL
		'../../Models/Player_Models/Log.glb',
		// called when the resource is loaded
		function ( gltf ) {

            // this.get("mesh").object.addEventListener("ready", function(){
            //     this.get("mesh").object.setAngularFactor(new THREE.Vector3(0, 0, 0));
            // });

            let log = gltf.scene;

            let geometry = new THREE.CylinderGeometry( 2, 2, 10, 16 );
            let material = Physijs.createMaterial(
                new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.5 }),
                1.0,
                1.0
            );
            var cylinder = new Physijs.CylinderMesh( geometry, material );
            
            cylinder.rotation.x = -0.5*Math.PI;
            cylinder.position.y = 3;
            cylinder.position.x = 5;
            
            
            //*******************************************************************
            //Based on:  xprogram
            //Published: 04/12/2016
            //Location:  https://github.com/chandlerprall/Physijs/issues/268
            //Accessed:  02/16/2020
            cylinder.addEventListener("ready", function(){
                cylinder.setAngularFactor(new THREE.Vector3(0, 0, 1));
            });
            //*******************************************************************

            cylinder.name = "player:slide";

			cylinder.add( gltf.scene );
            log.rotation.x = -0.5*Math.PI;
            log.scale.set(2,2,2);
            scene.add( cylinder );
            //cylinder.scale.set(3,3,3);
			

		},
		function ( xhr ) {

			//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		// called when loading has errors
		function ( error ) {

			console.log( 'A log error happened' );

		}
	);

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {//w
        moveIn = true;
    } else if (keyCode == 83) {//s
        moveOut = true;
    } else if (keyCode == 65) {//a
        moveLeft = true;
    } else if (keyCode == 68) {//d
        moveRight = true;
    // } else if (keycode == 32) {//spacebar
    //     jump = true;
    }    
};

document.addEventListener("keyup", onDocumentKeyUp, false);
function onDocumentKeyUp(){
    var keyCode = event.which;
    if (keyCode == 87) {//w
        moveIn = false;
    } else if (keyCode == 83) {//s
        moveOut = false;
    } else if (keyCode == 65) {//a
        moveLeft = false;
    } else if (keyCode == 68) {//d
        moveRight = false;
    } else if(keyCode == 82) {//r
        var v = new THREE.Vector3(0,0,0);
        scene.getObjectById(player).setLinearFactor(v);
        scene.getObjectById(player).setAngularFactor(v);
        scene.getObjectById(player).__dirtyPosition = true;
        scene.getObjectById(player).position.set(0, 30, 0);
        v.x = 15;
        v.y = 20;
        v.z = 0;
        scene.getObjectById(player).setLinearFactor(new THREE.Vector3(1,1,1));
        scene.getObjectById(player).setAngularFactor(new THREE.Vector3(1,1,1));
        scene.getObjectById(player).setLinearVelocity(v); //remove this if you want obj to fall after respawn
    }
}

function slide_controls(){//applyCentralImpulse is updated every render.
    let velocity = new THREE.Vector3();
    let cv = scene.getObjectById(player).getLinearVelocity();
    if(moveIn){
        if(cv.z > 0){
            velocity.z -= 1000;
        }
        else if(cv.z > -50){
            velocity.z -= 100;
        }
    }
    if(moveOut){
        if(cv.z < 0){
            velocity.z += 1000;
        }
        else if(cv.z < 50){
            velocity.z += 100;
        }
    }
    if(moveLeft){
        if(cv.x > 0){
            velocity.x -= 1000;
        }
        else if(cv.x > -50){
            velocity.x -= 100;
        }
    }
    if(moveRight){
        if(cv.x < 0){
            velocity.x += 1000;
        }
        else if(cv.x < 50){
            velocity.x += 100;
        }
    }

    scene.getObjectById(player).applyCentralImpulse(velocity);
    
}


function wheel(){
    let direction = event.wheelDelta;
    if(direction < 0 && camera.fov < 100){
        camera.fov += 5;
    }
    else if(camera.fov > 5){
        camera.fov -= 5;
    }
    camera.updateProjectionMatrix();
}
document.addEventListener("wheel", wheel, true);

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

document.addEventListener('mousedown', onMouseDown, false);
function onMouseDown(e){
    console.log("click");
    //!!!!!!!!!!!!!RayCaster!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );

    if(intersects.length > 0){
        console.log("Was: " + player);
        if(intersects[0].object.name.split(":")[0] == "player"){
            
            player = intersects[0].object.id;
            
        }
        console.log("Am now: " + player);
    }

	// for ( var i = 0; i < intersects.length && i < 1; i++ ) {
    //     // if (intersects[i].object.name == "sun"){
	// 	//     intersects[i].object.material.color.set( 0xff00ff );
    //     // }
    //     player = intersects[i].object.id;

    // }
    
    //!!!!!!!!!!!!!RayCaster!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!RayCaster!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
};
//!!!!!!!!!!!!!RayCaster!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!RayCaster!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}



//!!!!!!!!!!!!!RayCaster!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!RayCaster!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

window.addEventListener( 'mousemove', onMouseMove, false );

function renderScene(){

    scene.simulate();
    requestAnimationFrame(renderScene);
    slide_controls();
    camera.position.x = scene.getObjectById(player).position.x;
    camera.position.y = scene.getObjectById(player).position.y+25;
    camera.lookAt(scene.getObjectById(player).position);
    renderer.render(scene, camera);
}

document.body.appendChild(renderer.domElement);

renderScene();
