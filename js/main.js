function level_one(){

}

var level = 0;
var main_menu = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000),
	raycaster
};
function main_menu_render(){
	requestAnimationFrame (render);
		
	renderer.render (scene, camera);
}
function l1_load_render(){

}
function l1_render(){

}
main_menu_render();