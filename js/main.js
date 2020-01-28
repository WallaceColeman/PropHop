
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
 
var renderer = new THREE.WebGLRenderer();
renderer.setSize (window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);
 
camera.position.z= 10;
var light = new THREE.AmbientLight( 0x404040, 10.0 ); // soft white light
scene.add( light );


var pLightR = new THREE.PointLight( 0xff0000, 10.0, 100 );
pLightR.position.x = 50;
pLightR.position.y = 50;
pLightR.position.z = 10;
scene.add( pLightR );

var pLightY = new THREE.PointLight( 0xffff00, 10.0, 100 );
pLightY.position.x = -50;
pLightY.position.y = 50;
pLightY.position.z = 10;
scene.add( pLightY );

var pLightB = new THREE.PointLight( 0x0000ff, 10.0, 100 );
pLightB.position.x = -50;
pLightB.position.y = -50;
pLightB.position.z = 10;
scene.add( pLightB );

var pLightW = new THREE.PointLight( 0xffffff, 10.0, 100 );
pLightW.position.x = 50;
pLightW.position.y = -50;
pLightW.position.z = 10;
scene.add( pLightW );

//GLTF loader code provided by Three.js
//https://threejs.org/docs/#examples/en/loaders/GLTFLoader
//Accessed: 01/25/2020
var loader = new THREE.GLTFLoader();

loader.load(
	// resource URL
	'js/Models/Log.glb',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );
		
		model = gltf.scene;//!!!! saves the model into a varible for manipulation
		
		
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
	'js/Models/podium.gltf',
	function ( gltf ) {

		scene.add( gltf.scene );
		
		model2 = gltf.scene;//!!!! saves the model into a varible for manipulation
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

function render(){
  requestAnimationFrame (render);
  	model.rotation.y += 0.025;
  renderer.render (scene, camera);
}

render();