class Levels {
  
    constructor(LM, R) {
      this.LoadingManager = LM;
      this.render = R;
      this.current_level = 0;
      this.scene = new Physijs.Scene;
    }
    
    new_loading_manager(LM){
      this.LoadingManager = LM;
    }
    
    get_level(num){
      switch (parseInt(num)) {
        case -1:
          this.current_level = -1;
          return this.get_level_demo_scene();
          break;
        case 0:
          this.current_level = 0;
          return this.get_main_menu();
          break;
        case 1:
          this.current_level = 0;
          return this.get_level_1_scene();
          break;
        // case 2:
        //    day = "Tuesday";
        //   break;
        // case 3:
        //   day = "Wednesday";
        //   break;
        // case 4:
        //   day = "Thursday";
        //   break;
        // case 5:
        //   day = "Friday";
        //   break;
        // case 6:
        //   day = "Saturday";
      }
    }
  
    get_level_size(){
      switch(this.current_level){
        case -1://demo
          return 15;
          break;
        case 0://main menu
          return 15;
          break;
        case 1://level 1
          return -1;
          break;
      }
    }
    
    get_main_menu(){
      
      while(this.scene.children.length > 0){ 
        this.scene.remove(this.scene.children[0]); 
      }
      let scene = this.scene;
      let loader = new THREE.TextureLoader(this.LoadingManager);
      scene.setGravity(new THREE.Vector3(0,-25,0));
  
      //light
      let light = new THREE.AmbientLight( 0x404040 ); // soft white light so entire room isn't super dark. Disable this for dark room!
      scene.add(light);
  
      let spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(-40,60,40);
      spotLight.castShadow = true;
      scene.add(spotLight);   
  
  
      //title
      let cubeGeometry = new THREE.CubeGeometry(6,6,6);
      let cubeMaterial = Physijs.createMaterial(
          new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/hardwood2_diffuse.jpg' )}),
          0.4,
          0.5
      );
      cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
      cubeMaterial.map.repeat.set( 1, .5 );
      let cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
      cube.receiveShadow = true;
      cube.castShadow = true;
      cube.position.y = 10;
      cube.position.x = 45;
      //cube.mass = 0;
      cube.name = "player:slide:start";
  
      scene.add(cube);
  
      //plane
      var planeGeometry = new THREE.PlaneGeometry(400,400,1,1);
      //var planeMaterial = new THREE.MeshBasicMaterial({color:"rgb(10,200,10)"});
      let planeMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/smooth-ice.jpg' )}),
        0.2,
        0.2
      );
      planeMaterial.map.wrapS = planeMaterial.map.wrapT = THREE.RepeatWrapping;
      planeMaterial.map.repeat.set( 1, .5 );
      //floor
      var plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
      plane.rotation.x = -.5*Math.PI;
      //plane.rotation.y = (0.125)*Math.PI;
      plane.receiveShadow = true;
      scene.add(plane);

      //front wall
//plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
//plane.rotation.x = -1*Math.PI;
//plane.position.z = 75;
//plane.receiveShadow = true;
//scene.add(plane);

//back wall
//plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
//plane.position.z = -50;
//plane.receiveShadow = true;
//scene.add(plane);

//left wall
//plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
//plane.rotation.y = .5*Math.PI;
//plane.position.x = -75;
//plane.receiveShadow = true;
//scene.add(plane);

//right wall

//plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
//plane.rotation.y = -.5*Math.PI;
//plane.position.x = 75;
//scene.add(plane);
  
  
      let GLTF_loader = new THREE.GLTFLoader(loadingManager);
        
      GLTF_loader.load(//Log
          // resource URL
          '../../Models/Player_Models/Log.glb',
          // called when the resource is loaded
          function ( gltf ) {
  
            let log = gltf.scene;
  
            let geometry = new THREE.CylinderGeometry( 3, 3, 15, 16 );
            let material = Physijs.createMaterial(
                new THREE.MeshLambertMaterial(/*{ wireframe: true, opacity: 0.5 }/*/{ transparent: true, opacity: 0.0 }),
                1.0,
                0.5
            );
            let cylinder = new Physijs.CylinderMesh( geometry, material );
  
            cylinder.rotation.x = -0.5*Math.PI;
            cylinder.position.y = 3;
            cylinder.position.x = -15;
            
            
            //*******************************************************************
            //Based on:  xprogram
            //Published: 04/12/2016
            //Location:  https://github.com/chandlerprall/Physijs/issues/268
            //Accessed:  02/16/2020
            cylinder.addEventListener("ready", function(){
                cylinder.setAngularFactor(new THREE.Vector3(0, 0, 1));
            });
            //*******************************************************************
  
            cylinder.name = "player:slide";
  
            cylinder.add( log );
            log.rotation.x = -0.5*Math.PI;
            log.scale.set(3,3,3);
            scene.add( cylinder );
            log.traverse( function( child ) { 
  
                if ( child.isMesh ) {
    
                    child.castShadow = true;
                    child.receiveShadow = true;
                    return;
                }
    
            } );
      
  
          }
        );
  
  
  
      GLTF_loader.load('../../Models/Player_Models/Level1/Chair.glb',
          function ( gltf ) {
              let chairModel = gltf.scene;
              //scene.add(chairModel);
              //chairModel.position.x = 45;
              //chairModel.position.z = 45;
              //chairModel.rotation.y = 1.25*Math.PI;
              //chairModel.scale.set(3,3,3);
  
              //build ramp
              //let green = "rgb(10,200,10)";
              //let blue = "rgb(10,10,200)";
              let base = new Physijs.BoxMesh(new THREE.BoxGeometry(10,10,10),new THREE.MeshLambertMaterial({ transparent: true, opacity: 0.0 }));
              //let side = new Physijs.BoxMesh(new THREE.BoxGeometry(0.1,6,12),new THREE.MeshLambertMaterial({ transparent: true, opacity: 0.0 }));
              //let ramp = new Physijs.BoxMesh(new THREE.BoxGeometry(10,0.1,12),new THREE.MeshLambertMaterial({ transparent: true, opacity: 0.0 }));
  
              //base.add(side);
              //side.position.x += 4;
              //side.position.y += 3;
  
              //base.add(ramp);
              //ramp.position.y = 3;
              //ramp.rotation.z = Math.atan(3/4);
  
              //base.position.x = 45;
              //base.position.z = 45;
              base.position.y = 1.25*Math.PI;
              
              base.mass = 300;
  
              scene.add(base);
              //side.name = "parent";
              //ramp.name = "parent";
              chairModel.name = "parent";
              base.name = "player:slide";
  
              base.add( chairModel );
              //chairModel.position.x = 45;
              //chairModel.position.z = 45;
              chairModel.rotation.y = 1.25*Math.PI;
              chairModel.scale.set(3,3,3);
              
  
  
              chairModel.traverse( function( child ) { 
  
                  if ( child.isMesh ) {
  
                      child.castShadow = true;
                      child.receiveShadow = true;
                      return;
                  }
  
              } );
  
  
          }
      );


      return scene;
    }
    
    get_level_1_scene(){
  
    }
  
    get_level_demo_scene(){
      while(this.scene.children.length > 0){ 
        this.scene.remove(this.scene.children[0]); 
      }
      let scene = this.scene;
      let loader = new THREE.TextureLoader(this.LoadingManager);
      scene.setGravity(new THREE.Vector3(0,-25,0));
  
  
      //light
      let light = new THREE.AmbientLight( 0x404040 ); // soft white light so entire room isn't super dark. Disable this for dark room!
      scene.add(light);
  
      let spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(-40,60,40);
      spotLight.castShadow = true;
      scene.add(spotLight);   
  
  
      //Cube
      let cubeGeometry = new THREE.CubeGeometry(6,6,6);
      let cubeMaterial = Physijs.createMaterial(
          new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/hardwood2_diffuse.jpg' )}),
          0.4,
          0.5
      );
      cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
      cubeMaterial.map.repeat.set( 1, .5 );
      let cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
      cube.receiveShadow = true;
      cube.castShadow = true;
      cube.position.y = -35;
      cube.position.x = 45
      cube.name = "player:slide:start";
  
      scene.add(cube); 
  
  
      //left side
      cubeGeometry = new THREE.CubeGeometry(50,10,25);
      cubeMaterial = Physijs.createMaterial(
          new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/Grass.png' )}),
          0.8,
          0.2
      );
      cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
      cubeMaterial.map.repeat.set( 1, .5 );
      cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
      cube.receiveShadow = true;
      cube.castShadow = true;
      cube.position.y = -5;
      cube.position.x = -5
      cube.mass = 0;
      scene.add(cube);
  
      //bridge
      cubeGeometry = new THREE.CubeGeometry(8,50,25);
      cubeMaterial = Physijs.createMaterial(
          new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/smooth-ice.jpg' )}),
          0.8,
          0.2
      );
      cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
      cubeMaterial.map.repeat.set( 1, .5 );
      let bridge = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
      bridge.receiveShadow = true;
      bridge.castShadow = true;
      bridge.position.y = 25;
      bridge.position.x = 12
      bridge.addEventListener("ready", function(){
          
          bridge.setAngularFactor(new THREE.Vector3(0, 0, 1));
          console.log("Bridge Mass: " + bridge.mass);
      });
      bridge.mass = 8000;
      scene.add(bridge);
      console.log("Bridge Mass: " + bridge.mass);
  
      //rightside
      cubeGeometry = new THREE.CubeGeometry(50,10,25);
      cubeMaterial = Physijs.createMaterial(
          new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/Grass.png' )}),
          0.8,
          0.2
      );
      cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
      cubeMaterial.map.repeat.set( 1, .5 );
      cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
      cube.receiveShadow = true;
      cube.castShadow = true;
      cube.position.y = -5;
      cube.position.x = 90;
      cube.mass = 0;
      scene.add(cube);
  
      //upper left Side
      cubeGeometry = new THREE.CubeGeometry(40,2,25);
      cubeMaterial = Physijs.createMaterial(
          new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/Grass.png' )}),
          0.8,
          0.2
      );
      cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
      cubeMaterial.map.repeat.set( 1, .5 );
      cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
      cube.receiveShadow = true;
      cube.castShadow = true;
      cube.position.y = 35;
      cube.position.x = -40;
      cube.mass = 0;
      scene.add(cube);
  
      //lower area
      cubeGeometry = new THREE.CubeGeometry(75,10,25);
      
      cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
      cubeMaterial.map.repeat.set( 1, .5 );
      cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
      cube.receiveShadow = true;
      cube.castShadow = true;
      cube.position.y = -45;
      cube.position.x = 40;
      //cube.rotation.z = 15*Math.PI/180;
      cube.mass = 0;
      scene.add(cube);
  
  
      let GLTF_loader = new THREE.GLTFLoader(loadingManager);
        GLTF_loader.load(//Log
          // resource URL
          '../../Models/Player_Models/Log.glb',
          // called when the resource is loaded
          function ( gltf ) {
  
                  let log = gltf.scene;
  
                  let geometry = new THREE.CylinderGeometry( 3, 3, 15, 16 );
                  let material = Physijs.createMaterial(
                      new THREE.MeshLambertMaterial(/*{ wireframe: true, opacity: 0.5 }/*/{ transparent: true, opacity: 0.0 }),
                      1.0,
                      0.5
                  );
                  let cylinder = new Physijs.CylinderMesh( geometry, material );
  
                  cylinder.rotation.x = -0.5*Math.PI;
                  cylinder.position.y = 40;
                  cylinder.position.x = -25;
                  
                  
                  //*******************************************************************
                  //Based on:  xprogram
                  //Published: 04/12/2016
                  //Location:  https://github.com/chandlerprall/Physijs/issues/268
                  //Accessed:  02/16/2020
                  cylinder.addEventListener("ready", function(){
                      cylinder.setAngularFactor(new THREE.Vector3(0, 0, 1));
                  });
                  //*******************************************************************
  
                  cylinder.name = "player:slide";
  
                  cylinder.add( log );
                  log.rotation.x = -0.5*Math.PI;
                  log.scale.set(3,3,3);
                  scene.add( cylinder );
                  log.traverse( function( child ) { 
  
                      if ( child.isMesh ) {
          
                          child.castShadow = true;
                          child.receiveShadow = true;
                          return;
                      }
          
                  } );
            
  
          }
        );
  
  
  
      GLTF_loader.load('../../Models/Player_Models/Ramp.glb',
          function ( gltf ) {
              let rampModel = gltf.scene;
  
              //build ramp
              let green = "rgb(10,200,10)";
              let blue = "rgb(10,10,200)";
              let base = new Physijs.BoxMesh(new THREE.BoxGeometry(8,0.1,12),new THREE.MeshLambertMaterial({ transparent: true, opacity: 0.0 }));
              let side = new Physijs.BoxMesh(new THREE.BoxGeometry(0.1,6,12),new THREE.MeshLambertMaterial({ transparent: true, opacity: 0.0 }));
              let ramp = new Physijs.BoxMesh(new THREE.BoxGeometry(10,0.1,12),new THREE.MeshLambertMaterial({ transparent: true, opacity: 0.0 }));
  
              base.add(side);
              side.position.x += 4;
              side.position.y += 3;
  
              base.add(ramp);
              ramp.position.y = 3;
              ramp.rotation.z = Math.atan(3/4);
  
              base.position.x = -20;
              base.position.y = 5;
              
              base.mass = 300;
  
              scene.add(base);
              side.name = "parent";
              ramp.name = "parent";
              rampModel.name = "parent";
              base.name = "player:slide";
  
              base.add( rampModel );
              rampModel.position.y = 3;
              rampModel.rotation.x = 0.5*Math.PI;
              rampModel.scale.set(10.5,12.5,10.5);
  
  
              rampModel.traverse( function( child ) { 
  
                  if ( child.isMesh ) {
  
                      child.castShadow = true;
                      child.receiveShadow = true;
                      return;
                  }
  
              } );
  
  
          }
      );
  
  
      GLTF_loader.load(//goal
          // resource URL
          '../../Models/Static_Models/Goal.glb',
          // called when the resource is loaded
          function ( gltf ) {
  
              let goal = gltf.scene;
  
              scene.add(goal);
  
              goal.position.x = 100;
              goal.position.y = 10;
              goal.rotation.y = .5*Math.PI;
              goal.scale.set(10,10,10);
  
          }
      );
      return scene;
    }
  }