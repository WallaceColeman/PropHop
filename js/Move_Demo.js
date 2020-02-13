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
var planeGeometry = new THREE.PlaneGeometry(2000,50,1,1);
//var planeMaterial = new THREE.MeshBasicMaterial({color:"rgb(10,200,10)"});
let planeMaterial = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({ color:"rgb(10,10,200)"}),
    0.2,
    0.2
);
var plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5*Math.PI;
//plane.rotation.y = (0.125)*Math.PI;
scene.add(plane);

//markers
for (let index = 0; index < 100; index++) {
    //let marker = new THREE.Mesh( new THREE.BoxGeometry( 1, 5, 1 ), new THREE.MeshBasicMaterial( {color: 0x00ff00} ) );
    let marker = new Physijs.BoxMesh( new THREE.CubeGeometry(1,10,1), Physijs.createMaterial(
        new THREE.MeshBasicMaterial({ color:"rgb(10,200,10)"}),
        1.0,
        1.0
    ));
    marker.mass = 0;
    marker.position.x = index*10;
    marker.position.y = 5;
    scene.add( marker );
    
}

//Cube
let cubeGeometry = new THREE.CubeGeometry(6,6,6);
let cubeMaterial = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({ color:"rgb(255,0,0)"}),
    1.0,
    1.0
);
var cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
cube.position.y = 3;
cube.position.x = -5
scene.add(cube);

var moveIn = false;
var moveOut = false;
var moveLeft = false;
var moveRight = false;

var reset = false;

//var lock = 0;

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
