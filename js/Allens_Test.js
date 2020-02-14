"use strict";

Physijs.scripts.worker = '/js/ThreeLib/physijs_worker.js';
Physijs.scripts.ammo = "http://chandlerprall.github.io/Physijs/examples/js/ammo.js";

var scene = new Physijs.Scene;
scene.setGravity(new THREE.Vector3(0,-25,0));
var loader = new THREE.TextureLoader();


var camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 30;
camera.position.z = 95;
camera.lookAt(scene.position);

//light
var light = new THREE.AmbientLight( 0x404040 ); // soft white light so entire room isn't super dark. Disable this for dark room!
light.castShadow = true;
scene.add(light);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,40);
spotLight.castShadow = true;
scene.add(spotLight);   


var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("rgb(135,206,235)");//skyblue
renderer.setSize(window.innerWidth-20, window.innerHeight-20);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//plane
var planeGeometry = new THREE.PlaneGeometry(200,150,1,1);
//var planeMaterial = new THREE.MeshBasicMaterial({color:"rgb(10,200,10)"});
let planeMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/smooth-ice.jpg' )}),
    0.2,
    0.2
);
planeMaterial.map.wrapS = planeMaterial.map.wrapT = THREE.RepeatWrapping;
planeMaterial.map.repeat.set( 1, .5 );
//floor
var plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
plane.rotation.x = -.5*Math.PI;
//plane.rotation.y = (0.125)*Math.PI;
plane.receiveShadow = true;
scene.add(plane);

//front wall
plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
plane.rotation.x = -1*Math.PI;
plane.position.z = 75;
plane.receiveShadow = true;
scene.add(plane);

//back wall
plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
plane.position.z = -50;
plane.receiveShadow = true;
scene.add(plane);

//left wall
plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
plane.rotation.y = .5*Math.PI;
plane.position.x = -75;
plane.receiveShadow = true;
scene.add(plane);

//right wall

plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
plane.rotation.y = -.5*Math.PI;
plane.position.x = 75;
scene.add(plane);

//Cube
//Cube - Code created by chandlerprall
var block_material = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({ color:0xFF0000}),
    .4, // medium friction
    .4 // medium restitution
);

block_material.castShadow = true;

var blockGeometry = new THREE.BoxGeometry(6, 6, 6);
var cube = new Physijs.BoxMesh(blockGeometry, block_material)
cube.receiveShadow = true;
cube.castShadow = true;
cube.position.y = 3;
cube.position.x = -5
scene.add(cube);

var moveIn = false;
var moveOut = false;
var moveLeft = false;
var moveRight = false;

var reset = false;


var player = cube.id;
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
    }
    else if(keyCode == 82) {//r
        reset = true;
        // while(lock == 2){/*wait*/}
        // lock = 1;
        //console.log("AS");
        var v = new THREE.Vector3(0,0,0);
        scene.getObjectById(player).setLinearFactor(v);
        scene.getObjectById(player).setAngularFactor(v);
        // scene.getObjectById(player).setLinearVelocity(v);
        // scene.getObjectById(player).setAngularVelocity(v);
        
        scene.getObjectById(player).__dirtyPosition = true;
        scene.getObjectById(player).position.set(0, 30, 0);
        v.x = 15;
        v.y = 20;
        v.z = 0;
        scene.getObjectById(player).setLinearFactor(new THREE.Vector3(1,1,1));
        scene.getObjectById(player).setAngularFactor(new THREE.Vector3(1,1,1));
        scene.getObjectById(player).setLinearVelocity(v);
        //console.log("AE");
        // if(lock == 1){
        //     lock=0;
        // }
        // else{
        //     console.log("Broken spinlock");
        // }
    }
}

function slide_controlls(){//SWITCH TO applyCentralImpulse*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!**88
    // while(lock == 1){/*wait*/}
    // lock = 2;
    // if(reset){
    //     var v = new THREE.Vector3();
    //     v.x = 0;
    //     v.y = 0;
    //     v.z = 0;
    //     scene.getObjectById(player).setLinearVelocity(v);
    //     scene.getObjectById(player).setAngularVelocity(v);
        
    //     scene.getObjectById(player).__dirtyPosition = true;
    //     scene.getObjectById(player).__dirtyRotation = true;
    //     scene.getObjectById(player).position.set(0, 30, 0);
    //     scene.getObjectById(player).rotation.set(0, 0, 0);
    //     v.x = 15;
    //     v.y = 20;
    //     v.z = 0;
    //     scene.getObjectById(player).setLinearVelocity(v);
    //     reset = false;
    //     return;
    // }
    //console.log("BS");
    if(reset){
        // let t = new Date().getTime();
        // while(new Date().getTime() - t < 1000){}
        // reset = false;
        // return;
    }
    let velocity = new THREE.Vector3();
    let cv = scene.getObjectById(player).getLinearVelocity();
    if(moveIn){
        if(cv.z > 0){
            velocity.z -= 1000;
        }
        else if(cv.z > -50){
            velocity.z -= 100;
        }
        //scene.getObjectById(player).applyCentralImpulse(velocity);
        //console.log("in");
    }
    if(moveOut){
        if(cv.z < 0){
            velocity.z += 1000;
        }
        else if(cv.z < 50){
            velocity.z += 100;
        }
        //scene.getObjectById(player).setLinearVelocity(velocity);
        //console.log("out");
    }
    if(moveLeft){
        if(cv.x > 0){
            velocity.x -= 1000;
        }
        else if(cv.x > -50){
            velocity.x -= 100;
        }
        //scene.getObjectById(player).setLinearVelocity(velocity);
        //console.log("right");
    }
    if(moveRight){
        if(cv.x < 0){
            velocity.x += 1000;
        }
        else if(cv.x < 50){
            velocity.x += 100;
        }
        //scene.getObjectById(player).setLinearVelocity(velocity);
        //console.log("left");
    }
    //********************************************************************************************************
    //********************************************************************************************************
    //********************************************************************************************************
    // every frame is calling the setlinearvelocity function, it's probaly screwing with the physics
    //********************************************************************************************************
    //********************************************************************************************************
    //********************************************************************************************************
    //scene.getObjectById(player).setLinearVelocity(velocity);
    scene.getObjectById(player).applyCentralImpulse(velocity);
    //console.log("BE");
    // if(lock == 2){
    //     lock=0;
    // }
    // else{
    //     console.log("Broken spinlock");
    // }
        
    //console.log("none");
        
}

function renderScene(){

    scene.simulate();
    requestAnimationFrame(renderScene);
    slide_controlls();
    camera.position.x = scene.getObjectById(player).position.x;
    camera.position.y = scene.getObjectById(player).position.y+25;
    renderer.render(scene, camera);
}

document.body.appendChild(renderer.domElement);

renderScene();