'use strict';

//add some physics
Physijs.scripts.worker = '/js/ThreeLib/physijs_worker.js';
Physijs.scripts.ammo = "http://chandlerprall.github.io/Physijs/examples/js/ammo.js";

var LOADING_NOT_DONE = true;
var loadingManager = null;
var amount_loaded = 0.0;

var renderer;
var scene;
var camera;
var player;

//--------------------------------Loading Screen--------------------------------
	//Based on: xSaucecode
	//Loaction: https://www.youtube.com/watch?v=3umV-dEYttU&ab_channel=xSaucecode
	//Posted:   08/05/2016
	//Accessed: 02/08/2020
var loading = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000),
	box: new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshBasicMaterial({color:"rgb(255,0,0)"})
	)
};
//--------------------------------Loading Screen--------------------------------

function setUp(){
	
	//--------------------------------Loading Screen--------------------------------
	//Based on: xSaucecode
	//Loaction: https://www.youtube.com/watch?v=3umV-dEYttU&ab_channel=xSaucecode
	//Posted:   08/05/2016
	//Accessed: 02/08/2020
	loading.box.position.set(0,0,0);
	loading.camera.lookAt(loading.box.position);
	loading.camera.position.z=10;
	loading.scene.add(loading.box);
	loading.scene.add(loading.camera);
	loading.scene.add( new THREE.AmbientLight( 0x404040) );

	loadingManager = new THREE.LoadingManager();

	loadingManager.onProgress = function(item, loaded, total){
		console.log(item, total, loaded);
		amount_loaded = (loaded/31); //31 should be changed to the total number of things that needs to be loaded. this can be found in console after running the first time.
	}
	loadingManager.onLoad = function(){
		console.log("Loaded");
		LOADING_NOT_DONE = false;
	}
	//--------------------------------Loading Screen--------------------------------

    scene = new Physijs.Scene();
    scene.setGravity(new THREE.Vector3(0,-25,0));

	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize (window.innerWidth-20, window.innerHeight-20);
	renderer.outputEncoding = THREE.sRGBEncoding;
	document.body.appendChild(renderer.domElement);
	
	camera.position.z= 100;
	var light = new THREE.AmbientLight( 0x404040, 10.0 ); // soft white light
	scene.add( light );

    var loader = new THREE.GLTFLoader(loadingManager);
    
    loader.load(//RoomTest
		// resource URL
		'../../Models/Levels/RoomTemplate.glb',
		// called when the resource is loaded
		function ( gltf ) {

			scene.add( gltf.scene );
			
			let room = gltf.scene; //!!!!! saves for manipulation
			room.position.y = 1;
			room.position.x = 1;
			room.scale.x = 100;
			room.scale.y = 100;
            room.scale.z = 100;
            
            room.addEventListener('collision', function( objCollidedWith, linearVelOfCollision, angularVelOfCollision ) {
            });

		},
		// called while loading is progressing
		function ( xhr ) {

			//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		// called when loading has errors
		function ( error ) {

			console.log( 'A room test error happened' );

		}
	);

//Plane
var planeGeometry = new THREE.PlaneGeometry(100,100,1,1);
var planeMaterial = new THREE.MeshBasicMaterial({color:0x00FF00});

var plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
plane.rotation.x = 0.5*Math.PI;
scene.add(plane);

//Cube
var cubeGeometry = new THREE.CubeGeometry(6,6,6);
//var cubeMaterial = new THREE.MeshLambertMaterial({color:red});
var cubeMaterial = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({ color: 0x241BB6}),
    0.5,
    0.5
);
var cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;
cube.receiveShadow = true;
cube.position.x = -10;
cube.position.y = 30;
scene.add(cube);
cube.addEventListener('collision', function( objCollidedWith, linearVelOfCollision, angularVelOfCollision ) {
});



var maxVelocity = 15;
player = cube.id;
var ground = plane.position.y;
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
   var keyCode = event.which;
   //var velocity = new THREE.Vector3();
   var velocity = scene.getObjectById(player).getLinearVelocity();
   if (keyCode == 87) {//w
       //scene.getObjectById(player).se
       velocity.z -= 0.5; 
   } else if (keyCode == 83) {//s
       //scene.getObjectById(player).position.y -= ySpeed;
       velocity.z += 0.5; 
   } else if (keyCode == 65) {//a
       //scene.getObjectById(player).position.x -= xSpeed;
       velocity.x -= 0.5; 
   } else if (keyCode == 68) {//d
       //scene.getObjectById(player).position.x += xSpeed;
       velocity.x += 0.5; 
   } else if (keyCode == 82) {//Letter "r: to restart, might change later
       scene.getObjectById(player).position.set(0, 30, 0);
       scene.getObjectById(player).__dirtyPosition = true;
       velocity = new THREE.Vector3()
       velocity.x = 15;
       velocity.y = 20;
   } else if (keyCode == 32 && velocity.y < maxVelocity) {//Space Bar, to jump
        velocity.y += 15;
   }
   scene.getObjectById(player).setLinearVelocity(velocity);
};



}

 

function render(){

    scene.simulate();
  requestAnimationFrame (render);
  camera.position.x = scene.getObjectById(player).position.x;
        camera.position.y = scene.getObjectById(player).position.y+25;
  renderer.render (scene, camera);
}

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
		render();
	}
}

setUp();
loadingRenderer();