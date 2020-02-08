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
    else if(keyCode == 32) {//Space Bar
        reset = true;
    }
}

var Semaphore = {
    value: 1
};
function L(s){//Lock
    if(s.value == 1){
        s.value = 0;
        return true;
    }
    else{
        return false;
    }
}
function R(s){//Release
    s.value = 1;
}

function slide_controlls(){
    if(L(Semaphore)){
        var velocity = scene.getObjectById(player).getLinearVelocity();
        if(moveIn && !moveOut){
            velocity.z -= 0.5;
            //scene.getObjectById(player).setLinearVelocity(velocity);
            //console.log("in");
        }
        if(moveOut && !moveIn){
            velocity.z += 0.5;
            //scene.getObjectById(player).setLinearVelocity(velocity);
            //console.log("out");
        }
        if(moveLeft && !moveRight){
            velocity.x -= 0.5;
            //scene.getObjectById(player).setLinearVelocity(velocity);
            //console.log("right");
        }
        if(moveRight && !moveLeft){
            velocity.x += 0.5;
            //scene.getObjectById(player).setLinearVelocity(velocity);
            //console.log("left");
        }
        if(reset){
            
            scene.getObjectById(player).__dirtyPosition = true;
            scene.getObjectById(player).position.set(0, 30, 0);
            //scene.getObjectById(player).setLinearVelocity(new THREE.Vector3(15,20,0));
            velocity = new THREE.Vector3();
            velocity.x = 15;
            velocity.y = 20;
            scene.getObjectById(player).setAngularVelocity(new THREE.Vector3(0, 0, 0));
            reset = false;
            //console.log("reset")
        }
        //console.log("none");
        scene.getObjectById(player).setLinearVelocity(velocity);
        R(Semaphore);
    }
    else{
        console.log("blocked");
    }
    
}

// struct semaphore { 
//     enum value(0, 1); 
  
//     // q contains all Process Control Blocks (PCBs) 
//     // corresponding to processes got blocked 
//     // while performing down operation. 
//     Queue<process> q; 
  
// } P(semaphore s) 
// { 
//     if (s.value == 1) { 
//         s.value = 0; 
//     } 
//     else { 
//         // add the process to the waiting queue 
//         q.push(P) 
//             sleep(); 
//     } 
// } 
// V(Semaphore s) 
// { 
//     if (s.q is empty) { 
//         s.value = 1; 
//     } 
//     else { 
  
//         // select a process from waiting queue 
//         q.pop(); 
//         wakeup(); 
//     } 
// } 



function renderScene(){

    scene.simulate();
    requestAnimationFrame(renderScene);
    slide_controlls();
    renderer.render(scene, camera);
}

document.body.appendChild(renderer.domElement);
renderScene();