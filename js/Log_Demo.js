'use strict';

var LOADING_NOT_DONE = true;
var loadingManager = null;
var amount_loaded = 0.0;

var renderer;
var scene;
var camera;
var player;

var loading = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000),
	box: new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshBasicMaterial({color:"rgb(255,0,0)"})
	)
};

function setUp(){
	
	loading.box.position.set(0,0,0);
	loading.camera.lookAt(loading.box.position);
	loading.camera.position.z=10;
	loading.scene.add(loading.box);
	loading.scene.add(loading.camera);
	loading.scene.add( new THREE.AmbientLight( 0x404040) );

	loadingManager = new THREE.LoadingManager();

	loadingManager.onProgress = function(item, loaded, total){
		console.log(item, total, loaded);
		amount_loaded = loaded/total*100;
	}
	loadingManager.onLoad = function(){
		console.log("Loaded");
		LOADING_NOT_DONE = false;
	}

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize (window.innerWidth-20, window.innerHeight-20);
	renderer.outputEncoding = THREE.sRGBEncoding;
	document.body.appendChild(renderer.domElement);
	
	camera.position.z= 10;
	var light = new THREE.AmbientLight( 0x404040, 10.0 ); // soft white light
	scene.add( light );

	//red light
	var pLightR = new THREE.PointLight( 0xff0000, 10.0, 100 );
	pLightR.position.x = 50;
	pLightR.position.y = 50;
	pLightR.position.z = 10;
	scene.add( pLightR );

	//yellow light
	var pLightY = new THREE.PointLight( 0xffff00, 10.0, 100 );
	pLightY.position.x = -50;
	pLightY.position.y = 50;
	pLightY.position.z = 10;
	scene.add( pLightY );

	//blue light
	var pLightB = new THREE.PointLight( 0x0000ff, 10.0, 100 );
	pLightB.position.x = -50;
	pLightB.position.y = -50;
	pLightB.position.z = 10;
	scene.add( pLightB );

	//white light
	var pLightW = new THREE.PointLight( 0xffffff, 10.0, 100 );
	pLightW.position.x = 50;
	pLightW.position.y = -50;
	pLightW.position.z = 10;
	scene.add( pLightW );

	//GLTF loader code provided by Three.js
	//https://threejs.org/docs/#examples/en/loaders/GLTFLoader
	//Accessed: 01/25/2020
	var loader = new THREE.GLTFLoader(loadingManager);
	var log_done = false;
	var pod_done = false;
	loader.load(
		// resource URL
		'../../Models/Player_Models/Log.glb',
		// called when the resource is loaded
		function ( gltf ) {

			scene.add( gltf.scene );
			
			player = (gltf.scene).id;//!!!! saves the model into a varible for manipulation
			
			// gltf.animations; // Array<THREE.AnimationClip>
			// gltf.scene; // THREE.Scene
			// gltf.scenes; // Array<THREE.Scene>
			// gltf.cameras; // Array<THREE.Camera>
			// gltf.asset; // Object

		},
		// called while loading is progressing
		function ( xhr ) {

			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		// called when loading has errors
		function ( error ) {

			console.log( 'An error happened' );

		}
	);

	loader.load(
		'../../Models/Player_Models/podium.gltf',
		function ( gltf ) {

			scene.add( gltf.scene );
			
			let model2 = gltf.scene;//!!!! saves the model into a varible for manipulation
			model2.position.y = (-2.2);
			model2.rotation.y = 45+(45/2);

		},
		function ( xhr ) {

			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		function ( error ) {

			console.log( 'An error happened' );

		}
	);
}

function render(){
  requestAnimationFrame (render);
  	scene.getObjectById(player).rotation.y += 0.025;
  renderer.render (scene, camera);
}

function loadingRenderer(){
	if(LOADING_NOT_DONE){
		requestAnimationFrame (loadingRenderer);
		loading.box.scale.x = amount_loaded;
		renderer.render (loading.scene, loading.camera);
	}
	else{
		render();
	}
}

setUp();
loadingRenderer();