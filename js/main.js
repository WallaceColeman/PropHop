"use strict";

Physijs.scripts.worker = '/js/ThreeLib/physijs_worker.js';
Physijs.scripts.ammo = "http://chandlerprall.github.io/Physijs/examples/js/ammo.js";

let LOADING_NOT_DONE = true;
let loadingManager = null;
let amount_loaded = 0.0;
let requested_level = 0;
let go_to_menu = false;
let on_main_menu = false;

let enable_controls = false;

let renderer = new THREE.WebGLRenderer({performance, antialias: true });

renderer.setClearColor("rgb(135,206,235)");//skyblue
renderer.setSize(window.innerWidth-20, window.innerHeight-20);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

let loading = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000),
	box: new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshBasicMaterial({color:"rgb(255,0,0)"})
	)
};

loading.box.position.set(0,0,0);
loading.camera.lookAt(loading.box.position);
loading.camera.position.z=10;
loading.scene.add(loading.box);
loading.scene.add(loading.camera);
loading.scene.add( new THREE.AmbientLight( 0x404040) );

loadingManager = new THREE.LoadingManager();

loadingManager.onProgress = function(item, loaded, total){
	console.log(item, total, loaded);
	amount_loaded = (loaded/levels.get_level_size());
}
loadingManager.onLoad = function(){
	console.log("Loaded");
	LOADING_NOT_DONE = false;
}

let levels = new Levels(loadingManager, renderer);

let scene = levels.get_level(-1);

let player = scene.getObjectByName("player:slide:start").id;

let camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 30;
camera.position.z = 100;
//camera.lookAt(scene.position);



let jumpCaster = new THREE.Raycaster();
jumpCaster.far = 3.5;
jumpCaster.set(new THREE.Vector3(0,0,0), new THREE.Vector3(0,-1,0));

//Controls
let moveIn = false;
let moveOut = false;
let moveLeft = false;
let moveRight = false;

let jump = false;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
	if(enable_controls){
		let keyCode = event.which;
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
	}
       
};

document.addEventListener("keyup", onDocumentKeyUp, false);
function onDocumentKeyUp(){
	if(enable_controls){
		let keyCode = event.which;
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
			
		} else if(keyCode == 27){
			if(levels.current_level != 9){
				go_to_menu = true;
				enable_controls = false;
			}
		}
	}
}

function slide_controls(){//applyCentralImpulse is updated every render.
    if(enable_controls){
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
			let intersects = jumpCaster.intersectObjects( scene.children, true);
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

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

document.addEventListener('mousedown', onMouseDown, false);
function onMouseDown(e){
    //console.log("click");
    //!!!!!!!!!!!!!RayCaster!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	let intersects = raycaster.intersectObjects( scene.children, true );

	if (on_main_menu){
		if (intersects[0].object.name == "start"){

		}
		else if (intersects[0].object.name == "level_select"){
			
		}
		else if (intersects[0].object.name == "credits"){

		}
		else if (intersects[0].object.name == "level_1"){

		}
		else if (intersects[0].object.name == "level_2"){

		}
		else if (intersects[0].object.name == "level_3"){

		}
		else if (intersects[0].object.name == "level_4"){

		}
		
	}
	else if(intersects.length > 0){
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
	if(go_to_menu){
		enable_controls = false;
		scene = levels.get_level(0);
		LOADING_NOT_DONE = true;
		loadingManager = new THREE.LoadingManager();
		loadingManager.onProgress = function(item, loaded, total){
			console.log(item, total, loaded);
			amount_loaded = (loaded/levels.get_level_size());
		}
		loadingManager.onLoad = function(){
			console.log("Loaded");
			LOADING_NOT_DONE = false;
		}
		levels.new_loading_manager(loadingManager);
		amount_loaded = 0;
		go_to_menu = false;
		player = scene.getObjectByName("player:slide:start").id;
		
		loadingRenderer();
	}
	else{
		scene.simulate();
		requestAnimationFrame(renderScene);
		slide_controls();
		updateCamAndRaycaster();
		renderer.render(scene, camera);
	}
}

document.body.appendChild(renderer.domElement);
  
function loadingRenderer(){
	//--------------------------------Loading Screen--------------------------------
	//Based on: xSaucecode
	//Loaction: https://www.youtube.com/watch?v=3umV-dEYttU&ab_channel=xSaucecode
	//Posted:   08/05/2016
	//Accessed: 02/08/2020
	if(LOADING_NOT_DONE){
		requestAnimationFrame (loadingRenderer);
		loading.box.scale.x = amount_loaded*20;//*20 to make the bar take up more of the screen.
		renderer.render (loading.scene, loading.camera);
	}//--------------------------------Loading Screen--------------------------------
	else{
		enable_controls = true;
		renderScene();
	}
}

loadingRenderer();