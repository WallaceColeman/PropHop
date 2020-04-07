class GetPhysiModels{
    constructor(loadingManager){
        this.loadingManager = loadingManager;
    }

    getPhysiModelByName(name, scene,x = 0,y = 0,z = 0,xr = 0,yr = 0,zr = 0){
        switch(name.toLowerCase()){
            case "desk":
                this.getDesk(scene,x,y,z,xr,yr,zr);
                break;
            default:
                

        }
    }

    getPhysiModelById(id){

    }

    getDesk(scene,x = 0,y = 0,z = 0,xr = 0,yr = 0,zr = 0){
        let GLTF_loader = new THREE.GLTFLoader(this.loadingManager);
        GLTF_loader.load('../../Models/Player_Models/Level1/Desk.glb',
        function ( gltf ) {
          let deskModel = gltf.scene;
          let ddrawers = new Physijs.BoxMesh(new THREE.BoxGeometry(25,40,33),new THREE.MeshLambertMaterial({  opacity: 0.9 }));
          let dbackside = new Physijs.BoxMesh(new THREE.BoxGeometry(100,30,1),new THREE.MeshLambertMaterial({  opacity: 0.9 }));
          let dleg = new Physijs.BoxMesh(new THREE.BoxGeometry(1,40,33),new THREE.MeshLambertMaterial({ opacity: 0.9 }));
          let dtop = new Physijs.BoxMesh(new THREE.BoxGeometry(130,2,44),new THREE.MeshLambertMaterial({ opacity: 0.9 }));

          dbackside.castShadow = true;

          dbackside.add(dtop);
          dtop.position.x += 10;
          dtop.position.y += 15.5;
          dtop.position.z += 12;
          dtop.castShadow = true;
          dtop.receiveShadow = true;

          dbackside.add(ddrawers);
          ddrawers.position.x += 60;
          ddrawers.position.y += -5;
          ddrawers.position.z += 15;
          ddrawers.mass = 6000;
          ddrawers.castShadow = true;

          dbackside.add(dleg);
          dleg.mass = 4000;
          dleg.position.x += -50;
          dleg.position.y += -5;
          dleg.position.z += 15;
          dleg.castShadow = true;

          dbackside.userData = new Player(dbackside, 1);
          deskModel.scale.set(6,6,6);

          dbackside.name = "player:slide";
          dtop.name = "parent";
          ddrawers.name = "parent";
          dleg.name = "parent";
         
          // Please dont modify this, it is the location of the model to the physijs shapes, not the object location
          // you got it dude -Wallace
          dbackside.add( deskModel );
          deskModel.position.y += -25;
          deskModel.position.z += 12;
          deskModel.position.x += 10;

          dbackside.position.set(new THREE.Vector3(x,y,z));
          dbackside.rotation.set(new THREE.Vector3(xr,yr,zr));
          console.log(scene);
          scene.getObjectByName("player:slide:start").applyCentralImpulse(new THREE.Vector3(0,200,0));
          scene.add(dbackside);
        });
    }

}