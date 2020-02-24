"use strict";

Physijs.scripts.worker = '/js/ThreeLib/physijs_worker.js';
Physijs.scripts.ammo = "http://chandlerprall.github.io/Physijs/examples/js/ammo.js";

var levels = new Levels();


var scene = levels.get_level_demo_scene();

var player = scene.getObjectByName("player:slide:start").id;

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
    if(jump){
        // if(scene.getObjectById(player)._physijs.touches.length > 0){
        //     console.log("Touching Something");
        //     let intersects = jumpCaster.intersectObjects( scene.children);
        //     if(intersects.length >= 1){
        //         console.log("onGround");
        //         velocity.y += 1000;
        //     }
        // }

        //******************************Mostly Working Version******************************
        // let intersects = jumpCaster.intersectObjects( scene.children);
        // console.log(intersects[0].object.parent.id);
            
        //     if(intersects.length >= 1){
        //         velocity.y += 1000*m;
        //     }


        //******************************Experimental Version******************************
        let intersects = jumpCaster.intersectObjects( scene.children, true);
        //console.log(intersects[0].object.parent.id);
            try{
                if(intersects[0].object.parent.parent != undefined){
                    if(intersects.length >= 2){
                        velocity.y += 1000*m;
                    }
                }
                else if(intersects.length >= 1){
                    velocity.y += 1000*m;
                }
            }
            catch{}
    }

    scene.getObjectById(player).applyCentralImpulse(velocity);
    
}


function wheel(){
    let direction = event.wheelDelta;
    if(direction < 0 && camera.fov < 100){
        camera.fov += 5;
    }
    else if(direction > 0 && camera.fov > 5){
        camera.fov -= 5;
    }
    camera.updateProjectionMatrix();
}
document.addEventListener("wheel", wheel, true);

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

document.addEventListener('mousedown', onMouseDown, false);
function onMouseDown(e){
    //console.log("click");
    //!!!!!!!!!!!!!RayCaster!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
        let dr = 0.5;
        if(scene.getObjectById(player).rotation.x > ( Math.PI / 3) || (0 - scene.getObjectById(player).rotation.x) > ( Math.PI / 3)){
            if(scene.getObjectById(player).geometry.parameters.depth != undefined){
                jumpCaster.far = (scene.getObjectById(player).geometry.parameters.depth/2) + dr;
                console.log("depth: " + scene.getObjectById(player).geometry.parameters.depth);
            }
            else{
                jumpCaster.far = scene.getObjectById(player).geometry.parameters.radiusTop + dr;
                console.log("radius: " + scene.getObjectById(player).geometry.parameters.radiusTop);
            }
        }else{
            jumpCaster.far = (scene.getObjectById(player).geometry.parameters.height/2) + dr;
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