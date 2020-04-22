"use strict";

Physijs.scripts.worker = '/js/ThreeLib/physijs_worker.js';
Physijs.scripts.ammo = "http://chandlerprall.github.io/Physijs/examples/js/ammo.js";

let LOADING_NOT_DONE = true;
let loadingManager = null;
let amount_loaded = 0.0;
let requested_level = 0;
let go_to_load = false;
let on_main_menu = true;
let current_level = -2; // start at tutorial

let levelDone = false;

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
		new THREE.BoxGeometry(2,2,2),
		new THREE.MeshBasicMaterial({color:"rgb(255,0,0)"})
	)
};

loading.box.position.set(0,0,0);
loading.camera.lookAt(loading.box.position);
loading.camera.position.z=10;
loading.scene.add(loading.box);
loading.scene.add(loading.camera);
loading.scene.add( new THREE.AmbientLight( 0x404040) );

let fontLoader = new THREE.FontLoader();
fontLoader.load(
	'./Models/Font/Barcade_Regular_R.json',
	function ( font ) {
	  // do something with the font
	  let shapes = font.generateShapes("<Loading>", 2);
	  let geometry = new THREE.ShapeBufferGeometry(shapes);
	  geometry.computeBoundingBox();
	  let xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
	  geometry.translate(xMid, 0, 0);
	  let material = new THREE.MeshBasicMaterial({
		color: "rgb(0,0,0)",
		side: THREE.DoubleSide
	  });

	  let text = new Physijs.BoxMesh(geometry,material);
	  text.position.y = -5;
	  loading.scene.add( text );
	},
  
	// onProgress callback
	function ( xhr ) {
	  console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},
  
	// onError callback
	function ( err ) {
	  console.log( err );
	}
  );

loadingManager = new THREE.LoadingManager();

loadingManager.onProgress = function(item, loaded, total){
	//console.log(item, total, loaded);
	amount_loaded = (loaded/levels.get_level_size());
}
loadingManager.onLoad = function(){
	console.log("Loaded");
	LOADING_NOT_DONE = false;
}

let levels = new Levels(loadingManager, renderer);

let scene = levels.get_level(0);

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
				go_to_load = true;
				requested_level = 0;
				enable_controls = false;
			}
		}
	}
}

function controls(){//applyCentralImpulse is updated every render.
    if(enable_controls){
        scene.getObjectById(player).userData.movement(moveIn, moveOut, moveLeft, moveRight, jump, jumpCaster);
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
	
	raycaster.setFromCamera( mouse, camera );
	
	levels.level_click_controls(raycaster, scene.getObjectById(player));//this lets us have level specific clickables
	
	let intersects = raycaster.intersectObjects( scene.children, true );

	if (on_main_menu){
		if (intersects[0].object.name == "start"){
			console.log("Clicked Start");
			on_main_menu = false;
			requested_level = levels.max_level;
			go_to_load = true;
		}
		else if (intersects[0].object.name == "level_select"){
			scene.getObjectById(player).__dirtyPosition = true;
			scene.getObjectById(player).position.x = 1000;
		}
		else if (intersects[0].object.name == "credits"){

		}
		else{
			on_main_menu = false;
			switch(intersects[0].object.name){
				case "Level_1":
					requested_level = 1;
					go_to_load = true;
					break;
				case "Level_2":
					requested_level = 2;
					go_to_load = true;
					break;
				case "Level_3":
					requested_level = 3;
					go_to_load = true;
					break;
				case "Level_4":
					requested_level = -1;
					go_to_load = true;
					break;
				
				default:
					on_main_menu = true;
			}
			console.log(on_main_menu);
		}
	}
	else if(intersects.length > 0){
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
        jumpCaster.far = scene.getObjectById(player).userData.jumpCasterFar;

    }
};

function onMouseMove( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

window.addEventListener( 'mousemove', onMouseMove, false );

function updateCamAndRaycaster(){
	camera.position.x = scene.getObjectById(player).position.x;
	if(on_main_menu){
		camera.position.y = scene.getObjectById(player).position.y;
	}
	else{
		camera.position.y = scene.getObjectById(player).position.y+25;
	}
    jumpCaster.set(scene.getObjectById(player).position, new THREE.Vector3(0,-1,0));
    
    //console.log("Raycaster Length: " + jumpCaster.far)

    camera.lookAt(scene.getObjectById(player).position);
}

function renderScene(){
	if(go_to_load){
		console.log("Go to load: " + requested_level);
		enable_controls = false;
		scene = levels.get_level(requested_level);
		if(requested_level == 0){
			on_main_menu = true;
		}
		LOADING_NOT_DONE = true;
		loadingManager = new THREE.LoadingManager();
		loadingManager.onProgress = function(item, loaded, total){
			//console.log(item, total, loaded);
			amount_loaded = (loaded/levels.get_level_size());
		}
		loadingManager.onLoad = function(){
			//console.log("Loaded");
			LOADING_NOT_DONE = false;
		}
		levels.new_loading_manager(loadingManager);
		amount_loaded = 0;
		
		
		player = scene.getObjectByName("player:slide:start").id;
		
		jumpCaster.far = scene.getObjectById(player).userData.jumpCasterFar;

		go_to_load = false;
		loadingRenderer();
	}
	else{
		scene.simulate();
		requestAnimationFrame(renderScene);
		let levelDone = levels.level_controls(scene.getObjectById(player));
		if(levelDone){
			requested_level = 0;
			go_to_load = true;
		}
		controls();
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
		//loading.box.scale.x = amount_loaded*20;//*20 to make the bar take up more of the screen.
		loading.box.rotation.x = loading.box.rotation.x + 0.05;
		loading.box.rotation.y = loading.box.rotation.x * 1.5;
		renderer.render (loading.scene, loading.camera);
	}//--------------------------------Loading Screen--------------------------------
	else{
		enable_controls = true;
		renderScene();
	}
}

loadingRenderer();