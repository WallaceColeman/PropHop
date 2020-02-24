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

var jumpCaster = new THREE.Raycaster();
jumpCaster.far = 3.5;
jumpCaster.set(new THREE.Vector3(0,0,0), new THREE.Vector3(0,-1,0));

//light
var light = new THREE.AmbientLight( 0x404040 ); // soft white light so entire room isn't super dark. Disable this for dark room!
scene.add(light);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,40);
spotLight.castShadow = true;
scene.add(spotLight);   

camera.position.x = 0;
camera.position.y = 30;
camera.position.z = 100;
camera.lookAt(scene.position);

//plane
var planeGeometry = new THREE.PlaneGeometry(2000,50,1,1);
//var planeMaterial = new THREE.MeshBasicMaterial({color:"rgb(10,200,10)"});
let planeMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/smooth-ice.jpg' )}),
    0.2,
    0.2
);
planeMaterial.map.wrapS = planeMaterial.map.wrapT = THREE.RepeatWrapping;
planeMaterial.map.repeat.set( 1, .5 );
var plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -0.5*Math.PI;
//plane.rotation.y = (0.125)*Math.PI;
scene.add(plane);

//markers
for (let index = 0; index < 100; index++) {
    let marker = new Physijs.BoxMesh(
        new THREE.BoxGeometry(1, 10, 1),
            Physijs.createMaterial(
                new THREE.MeshLambertMaterial({
                color:"rgb(10,200,10)"}),
                1.0,
                1.0
        ));
    marker.mass = 0;
    marker.position.x = index*10;
    marker.position.y = 5;
    marker.receiveShadow = true;
    marker.castShadow = true;
    scene.add( marker );
}

//Cube
let cubeGeometry = new THREE.CubeGeometry(6,6,6);
let cubeMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/hardwood2_diffuse.jpg' )}),
    1.0,
    1.0
);
cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
cubeMaterial.map.repeat.set( 1, .5 );
var cube1 = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
cube1.name = "player:slide"
cube1.receiveShadow = true;
cube1.castShadow = true;
cube1.position.y = 3;
cube1.position.x = -5;
scene.add(cube1);

//Cube 2
cubeGeometry = new THREE.CubeGeometry(6,6,6);
cubeMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ color:"rgb(250,50,150)"}),
    1.0,
    1.0
);
var cube2 = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);

cube2.position.y = 3;
cube2.position.x = -15;
cube2.name = "player:slide"
scene.add(cube2);

// Wall?
cubeGeometry = new THREE.CylinderGeometry(2,2,2);
cubeMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ color:"rgb(0,0,0)"}),
    1.0,
    1.0
);
var wall = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);

wall.position.y = 3;
wall.position.x = -35;
scene.add(wall);


var moveIn = false;
var moveOut = false;
var moveLeft = false;
var moveRight = false;

var jump = false;


//function createPointToPoint() {
// var obj1 = new THREE.SphereGeometry(2);
// var obj2 = new THREE.SphereGeometry(2);
// var objectOne = new 
//     	Physijs.SphereMesh(obj1,Physijs.createMaterial(
// 			new THREE.MeshPhongMaterial({color: 0xff4444, transparent:
// 			true, opacity:0.7}),0,0));
// 	objectOne.position.z=20; 
// 	objectOne.position.x=0;
// 	objectOne.position.y=10;
// 	scene.add(objectOne);
// 	var objectTwo = new
// 		Physijs.SphereMesh(obj2,Physijs.createMaterial(
// 		new THREE.MeshPhongMaterial({color: 0xff4444, transparent:
// 		true, opacity:0.7}),0,0));
// 	objectTwo.position.z=-5; objectTwo.position.x=0;
// 	objectTwo.position.y=20;
// 	scene.add(objectTwo);
// var constraint = new Physijs.PointConstraint(objectOne,
// 		objectTwo, objectTwo.position);
// 	scene.addConstraint(constraint);
//}


//Constraint
// var constraint = new Physijs.SliderConstraint(sliderMesh, 
// 	new THREE.Vector(0, 2, 0), new THREE.vector3(0, 1, 0));
// scene.addConstraint(constraint);
// constraint.setLimits(-10, 10, 0, 0);
// constraint, setRestitution(0.1, 0.1);

var player = cube1.id;
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
        var v = new THREE.Vector3(0,0,0);
        scene.getObjectById(player).setLinearFactor(v);
        //scene.getObjectById(player).setAngularFactor(v);
        scene.getObjectById(player).__dirtyPosition = true;
        scene.getObjectById(player).position.set(0, 30, 0);
        v.x = 15;
        v.y = 20;
        v.z = 0;
        scene.getObjectById(player).setLinearFactor(new THREE.Vector3(1,1,1));
        //scene.getObjectById(player).setAngularFactor(new THREE.Vector3(1,1,1));
        scene.getObjectById(player).setLinearVelocity(v); //remove this if you want obj to fall after respawn
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
    if(jump){
        let intersects = jumpCaster.intersectObjects( scene.children);
            console.log("Num intersects: " + intersects.length);
            if(intersects.length >= 1){
                console.log("onGround");
                velocity.y += 1000*m;
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
    // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	let intersects = raycaster.intersectObjects( scene.children, true );

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
        console.log(scene.getObjectById(player).rotation.x);
        if(scene.getObjectById(player).rotation.x > ( Math.PI / 3) || (0 - scene.getObjectById(player).rotation.x) > ( Math.PI / 3)){
            
            if(scene.getObjectById(player).geometry.parameters.depth != undefined){
                jumpCaster.far = (scene.getObjectById(player).geometry.parameters.depth/2) + .5;
                console.log("depth: " + scene.getObjectById(player).geometry.parameters.depth);
            }
            else{
                jumpCaster.far = scene.getObjectById(player).geometry.parameters.radiusTop + .5;
                console.log("radius: " + scene.getObjectById(player).geometry.parameters.radiusTop);
            }
        }else{
            jumpCaster.far = (scene.getObjectById(player).geometry.parameters.height/2) + .5;
        }
        console.log("jumpCaster Length: " + jumpCaster.far);
        console.log("Am now: " + player);
    }
};

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

window.addEventListener( 'mousemove', onMouseMove, false );

function updateCamAndRaycaster(){
    camera.position.x = scene.getObjectById(player).position.x;
    camera.position.y = scene.getObjectById(player).position.y+25;
    jumpCaster.set(scene.getObjectById(player).position, new THREE.Vector3(0,-1,0));
    //console.log("Raycaster Length: " + jumpCaster.far)
    camera.lookAt(scene.getObjectById(player).position);
}

function renderScene(){
    scene.simulate();
    requestAnimationFrame(renderScene);
    slide_controls();
    updateCamAndRaycaster();
    renderer.render(scene, camera);
}

document.body.appendChild(renderer.domElement);

renderScene();
