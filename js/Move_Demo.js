"use strict";

Physijs.scripts.worker = '/js/ThreeLib/physijs_worker.js';
Physijs.scripts.ammo = "http://chandlerprall.github.io/Physijs/examples/js/ammo.js";

var scene = new Physijs.Scene;
scene.setGravity(new THREE.Vector3(0,-25,0));

var camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 30;
camera.position.z = 100;
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("rgb(135,206,235)");//skyblue
renderer.setSize(window.innerWidth-20, window.innerHeight-20);

//plane
var planeGeometry = new THREE.PlaneGeometry(100,50,1,1);
var planeMaterial = new THREE.MeshBasicMaterial({color:"rgb(10,200,10)"});

var plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5*Math.PI;
//plane.rotation.y = (0.125)*Math.PI;
scene.add(plane);

//Cube
var cubeGeometry = new THREE.CubeGeometry(6,6,6);
var cubeMaterial = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({ color:"rgb(255,0,0)"}),
    0.5,
    0.5
);
var cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
cube.position.y = 30;
scene.add(cube);

var moveIn = false;
var moveOut = false;
var moveLeft = false;
var moveRight = false;

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
    } else if (keyCode == 32) {//Space Bar
        scene.getObjectById(player).position.set(0, 30, 0);
        scene.getObjectById(player).__dirtyPosition = true;
        velocity = new THREE.Vector3()
        velocity.x = 15;
        velocity.y = 20;
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
}

var vel = THREE.Vector3();
function slide_controlls(){
    var velocity = scene.getObjectById(player).getLinearVelocity();
    if(moveIn && !moveOut){
        velocity.z -= 0.5;
    }
    if(moveOut && !moveIn){
        velocity.z += 0.5;
    }
    if(moveLeft && !moveRight){
        velocity.x -= 0.5;
    }
    if(moveRight && !moveLeft){
        velocity.x += 0.5;
    }
    scene.getObjectById(player).setLinearVelocity(velocity);
}

function renderScene(){

    scene.simulate();
    requestAnimationFrame(renderScene);
    slide_controlls();
    renderer.render(scene, camera);
}

document.body.appendChild(renderer.domElement);
renderScene();