
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
 
var renderer = new THREE.WebGLRenderer();
renderer.setSize (window.innerWidth-20, window.innerHeight-20);
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);
camera.position.z= 10;

var light = new THREE.AmbientLight( 0x404040, 10.0 ); // soft white light
scene.add( light );


//GLTF loader code provided by Three.js
//https://threejs.org/docs/#examples/en/loaders/GLTFLoader
//Accessed: 01/25/2020
var loader = new THREE.GLTFLoader();

loader.load(
	'../../Models/Levels/CityScape.glb',
	function ( gltf ) {
		scene.add( gltf.scene );
		model = gltf.scene;//!!!! saves the model into a varible for manipulation
		model.scale.set(100,100,100);
		model.position.y = -5;
		// gltf.animations; // Array<THREE.AnimationClip>
		// gltf.scene; // THREE.Scene
		// gltf.scenes; // Array<THREE.Scene>
		// gltf.cameras; // Array<THREE.Camera>
		// gltf.asset; // Object
	},
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		console.log( 'An error happened' );
	}
);

// loader.load(
// 	'../../Models/Player_Models/podium.gltf',
// 	function ( gltf ) {
// 		scene.add( gltf.scene );
// 		model2 = gltf.scene;//!!!! saves the model into a varible for manipulation
// 	},
// 	function ( xhr ) {
// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
// 	},
// 	function ( error ) {
// 		console.log( 'An error happened' );
// 	}
// );

function render(){
  requestAnimationFrame (render);
  	
  renderer.render (scene, camera);
}

render();