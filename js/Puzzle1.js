//Puzzle 1

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
 
var renderer = new THREE.WebGLRenderer();
renderer.setSize (window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
 
camera.position.z= 100;

var geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
var mat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
var plane = new THREE.Mesh(geo, mat);

scene.add(plane);
plane.rotateX( - Math.PI / 2);