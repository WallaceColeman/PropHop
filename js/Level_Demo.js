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
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//light
var light = new THREE.AmbientLight( 0x404040 ); // soft white light so entire room isn't super dark. Disable this for dark room!
scene.add(light);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,40);
spotLight.castShadow = true;
//spotLight.bias = 0.001;
scene.add(spotLight);   


// //plane
// var planeGeometry = new THREE.PlaneGeometry(2000,50,1,1);
// let planeMaterial = Physijs.createMaterial(
//     new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/smooth-ice.jpg' )}),
//     0.5,
//     0.2
// );
// planeMaterial.map.wrapS = planeMaterial.map.wrapT = THREE.RepeatWrapping;
// planeMaterial.map.repeat.set( 1, .5 );
// var plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
// plane.receiveShadow = true;
// plane.rotation.x = -0.5*Math.PI;
// //plane.rotation.y = (0.125)*Math.PI;
// scene.add(plane);


//Cube
let cubeGeometry = new THREE.CubeGeometry(6,6,6);
let cubeMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/hardwood2_diffuse.jpg' )}),
    0.4,
    0.5
);
cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
cubeMaterial.map.repeat.set( 1, .5 );
var cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
cube.receiveShadow = true;
cube.castShadow = true;
cube.position.y = -35;
cube.position.x = 45
cube.name = "player:slide";



scene.add(cube);
//cube.setAngularFactor(new THREE.Vector3(0.5, 0.5, 0.5));
var player = cube.id;


//left side
cubeGeometry = new THREE.CubeGeometry(50,10,25);
cubeMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/Grass.png' )}),
    0.8,
    0.2
);
cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
cubeMaterial.map.repeat.set( 1, .5 );
cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
cube.receiveShadow = true;
cube.castShadow = true;
cube.position.y = -5;
cube.position.x = -5
cube.mass = 0;
scene.add(cube);

//bridge
cubeGeometry = new THREE.CubeGeometry(5,50,25);
cubeMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/smooth-ice.jpg' )}),
    0.8,
    0.2
);
cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
cubeMaterial.map.repeat.set( 1, .5 );
let bridge = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
bridge.receiveShadow = true;
bridge.castShadow = true;
bridge.position.y = 25;
bridge.position.x = 15
bridge.addEventListener("ready", function(){
    bridge.setAngularFactor(new THREE.Vector3(0, 0, 1));
    
});
scene.add(bridge);
//bridge.mass = 750;


//rightside
cubeGeometry = new THREE.CubeGeometry(50,10,25);
cubeMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/Grass.png' )}),
    0.8,
    0.2
);
cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
cubeMaterial.map.repeat.set( 1, .5 );
cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
cube.receiveShadow = true;
cube.castShadow = true;
cube.position.y = -5;
cube.position.x = 90;
cube.mass = 0;
scene.add(cube);

//upper left Side
cubeGeometry = new THREE.CubeGeometry(30,2,25);
cubeMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/Grass.png' )}),
    0.8,
    0.2
);
cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
cubeMaterial.map.repeat.set( 1, .5 );
cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
cube.receiveShadow = true;
cube.castShadow = true;
cube.position.y = 35;
cube.position.x = -35;
cube.mass = 0;
scene.add(cube);



//lower area
cubeGeometry = new THREE.CubeGeometry(75,10,25);
// cubeMaterial = Physijs.createMaterial(
//     new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/Grass.png' )}),
//     0.8,
//     0.2
// );
cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
cubeMaterial.map.repeat.set( 1, .5 );
cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
cube.receiveShadow = true;
cube.castShadow = true;
cube.position.y = -45;
cube.position.x = 40;
//cube.rotation.z = 15*Math.PI/180;
cube.mass = 0;
scene.add(cube);

// //second box
// cubeGeometry = new THREE.CubeGeometry(6,6,6);
// cubeMaterial = Physijs.createMaterial(
//     new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/hardwood2_diffuse.jpg' )}),
//     0.4,
//     0.5
// );
// cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
// cubeMaterial.map.repeat.set( 1, .5 );
// cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
// cube.receiveShadow = true;
// cube.castShadow = true;
// cube.position.y = 5;
// cube.position.x = 5
// cube.name = "player:slide";
// scene.add(cube);

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

            let geometry = new THREE.CylinderGeometry( 3, 3, 15, 16 );
            let material = Physijs.createMaterial(
                new THREE.MeshLambertMaterial(/*{ wireframe: true, opacity: 0.5 }/*/{ transparent: true, opacity: 0.0 }),
                1.0,
                0.5
            );
            var cylinder = new Physijs.CylinderMesh( geometry, material );
            //cylinder.castShadow = true;
            //cylinder.receiveShadow = true;
            
            cylinder.rotation.x = -0.5*Math.PI;
            cylinder.position.y = 40;
            cylinder.position.x = -25;
            
            
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
            log.scale.set(3,3,3);
            scene.add( cylinder );
            //cylinder.scale.set(3,3,3);
            log.traverse( function( child ) { 

                if ( child.isMesh ) {
    
                    child.castShadow = true;
                    child.receiveShadow = true;
                    return;
                }
    
            } );
			

		},
		function ( xhr ) {

			//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		// called when loading has errors
		function ( error ) {

			console.log( 'A log error happened' );

		}
	);



GLTF_loader.load(//ramp
    // resource URL
    '../../Models/Player_Models/Ramp.glb',
    // called when the resource is loaded
    function ( gltf ) {

        // this.get("mesh").object.addEventListener("ready", function(){
        //     this.get("mesh").object.setAngularFactor(new THREE.Vector3(0, 0, 0));
        // });

        let rampModel = gltf.scene;

        //build ramp
        let green = "rgb(10,200,10)";
        let blue = "rgb(10,10,200)";
        var base = new Physijs.BoxMesh(new THREE.BoxGeometry(8,0.1,12),new THREE.MeshLambertMaterial({ transparent: true, opacity: 0.0 }));
        let side = new Physijs.BoxMesh(new THREE.BoxGeometry(0.1,6,12),new THREE.MeshLambertMaterial({ transparent: true, opacity: 0.0 }));
        let ramp = new Physijs.BoxMesh(new THREE.BoxGeometry(10,0.1,12),new THREE.MeshLambertMaterial({ transparent: true, opacity: 0.0 }));

        //base.rotation.x = .5 * Math.PI;

        base.add(side);
        side.position.x += 4;
        side.position.y += 3;
        //side.rotation.z = .5 * Math.PI;
        //side.rotation.y = .5 * Math.PI;

        base.add(ramp);
        ramp.position.y = 3;
        ramp.rotation.z = Math.atan(3/4);


        base.position.x = -20;
        base.position.y = 5;
        
        base.mass = 300;

        scene.add(base);
        side.name = "parent";
        ramp.name = "parent";
        rampModel.name = "parent";
        base.name = "player:slide";

        base.add( rampModel );
        rampModel.position.y = 3;
        rampModel.rotation.x = 0.5*Math.PI;
        rampModel.scale.set(10.5,12.5,10.5);
        
        // base.receiveShadow = true;
        // base.castShadow = true;
        
        // side.receiveShadow = true;
        // side.castShadow = true;

        // ramp.receiveShadow = true;
        // ramp.castShadow = true;

        // rampModel.child.receiveShadow = true;
        // rampModel.child.castShadow = true;


        rampModel.traverse( function( child ) { 

            if ( child.isMesh ) {

                child.castShadow = true;
                child.receiveShadow = true;
                return;
            }

        } );


    },
    function ( xhr ) {

        //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

        console.log( 'A ramp error happened' );

    }
);


GLTF_loader.load(//goal
    // resource URL
    '../../Models/Static_Models/Goal.glb',
    // called when the resource is loaded
    function ( gltf ) {

        let goal = gltf.scene;

        scene.add(goal);

        goal.position.x = 100;
        goal.position.y = 10;
        goal.rotation.y = .5*Math.PI;
        goal.scale.set(10,10,10);

    },
    function ( xhr ) {

        //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

        console.log( 'A ramp error happened' );

    }
);


//Controls
var moveIn = false;
var moveOut = false;
var moveLeft = false;
var moveRight = false;

var jump = false;

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
    } else if (keyCode == 32) {//spacebar
        jump = true;
        // console.log(scene.getObjectById(player)._physijs.touches);
        // if(scene.getObjectById(player)._physijs.touches.length > 0){
        //     console.log("jump");
        // }
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
    } else if(keyCode == 32){//space bar
        jump = false;
    } else if(keyCode == 82) {//r
        // var v = new THREE.Vector3(0,0,0);
        // scene.getObjectById(player).setLinearFactor(v);
        // //scene.getObjectById(player).setAngularFactor(v);
        // scene.getObjectById(player).__dirtyPosition = true;
        // scene.getObjectById(player).position.set(0, 30, 0);
        // v.x = 15;
        // v.y = 20;
        // v.z = 0;
        // scene.getObjectById(player).setLinearFactor(new THREE.Vector3(1,1,1));
        // //scene.getObjectById(player).setAngularFactor(new THREE.Vector3(1,1,1));
        // scene.getObjectById(player).setLinearVelocity(v); //remove this if you want obj to fall after respawn
    }
}

function slide_controls(){//applyCentralImpulse is updated every render.
    //let m = Math.floor(scene.getObjectById(player).mass/300) + .5;
    let m = scene.getObjectById(player).mass/300;
    let velocity = new THREE.Vector3();
    let cv = scene.getObjectById(player).getLinearVelocity();
    if(moveIn){
        if(cv.z > 0){
            velocity.z -= 1000*m;
        }
        else if(cv.z > -50){
            velocity.z -= 100*m;
        }
    }
    if(moveOut){
        if(cv.z < 0){
            velocity.z += 1000*m;
        }
        else if(cv.z < 50){
            velocity.z += 100*m;
        }
    }
    if(moveLeft){
        if(cv.x > 0){
            velocity.x -= 1000*m;
        }
        else if(cv.x > -50){
            velocity.x -= 100*m;
        }
    }
    if(moveRight){
        if(cv.x < 0){
            velocity.x += 1000*m;
        }
        else if(cv.x < 50){
            velocity.x += 100*m;
        }
    }
    if(jump){//needs work

        /*
        if(scene.getObjectById(player)._physijs.touches.length > 0 && scene.getObjectById(player).getLinearVelocity().y < 10){
            //console.log(scene._objects[scene.getObjectById(player)._physijs.touches[0]].position);
            console.log(scene._objects[scene.getObjectById(player)._physijs.touches[0]]);
            if(scene._objects[scene.getObjectById(player)._physijs.touches[0]].position.y < scene.getObjectById(player).position.y){
                velocity.y += 1500;
            }
            //velocity.y += 5000;
            //jump = false;
        }
        */
        
        // if(scene.getObjectById(player)._physijs.touches.length > 0){
        //     let p = scene.getObjectById(player);
        //     let c = scene._objects[scene.getObjectById(player)._physijs.touches[0]];
            
        //     console.log("Rotation: " + c.rotation.z);

        //     let slope = (Math.tan(c.rotation.z )%(2*Math.PI))%(.5*Math.PI);
        //     console.log("Slope: " + slope);

        //     let relativeDistatance = p.position.x - c.position.x;
        //     console.log("Distance: " + relativeDistatance);

        //     let relativeHeight = p.position.y - c.position.y;
        //     console.log("Height: " + relativeHeight);

        //     let expectedHeight = slope * relativeDistatance;
        //     console.log("Expected Height: " + expectedHeight);

        //     let goofy_height = slope * p.position.x - c.position.;
        //     console.log("goofy: " + goofy_height);
        //     // let collision_height = slope*(p.position.x - c.position.x);
        //     // console.log("Required Relative Height: " + collision_height);
        //     // console.log("Relative Box Height: " +  (p.position.y - c.position.y))

        //     // collision_height = Math.tan(c.rotation.z)*(c.position.x - p.position.x);
        //     // console.log("2: " + collision_height);

        //     if(scene._objects[scene.getObjectById(player)._physijs.touches[0]]){

        //     }
        // }
        
        console.log(scene.getObjectById(player));

        
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
	var intersects = raycaster.intersectObjects( scene.children, true );

    if(intersects.length > 0){
        console.log("Was: " + player);
        console.log(intersects[0].object.name.split(":")[0]);
        console.log(intersects[0].object);
        if(intersects[0].object.name.split(":")[0] == "player"){
            scene.getObjectById(player).setLinearVelocity(new THREE.Vector3(0,0,0));
            scene.getObjectById(player).setAngularVelocity(new THREE.Vector3(0,0,0));
            
            player = intersects[0].object.id;
            
        }
        else if( intersects[0].object.name == "parent"){
            scene.getObjectById(player).setLinearVelocity(new THREE.Vector3(0,0,0));
            scene.getObjectById(player).setAngularVelocity(new THREE.Vector3(0,0,0));
            
            player = intersects[0].object.parent.id;
        }
        else if(intersects[0].object.parent.name == "parent"){
            scene.getObjectById(player).setLinearVelocity(new THREE.Vector3(0,0,0));
            scene.getObjectById(player).setAngularVelocity(new THREE.Vector3(0,0,0));
            
            player = intersects[0].object.parent.parent.id;
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
