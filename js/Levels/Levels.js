class Levels {
  
  constructor(LM, R) {
    this.LoadingManager = LM;
    this.render = R;
    this.current_level = 0;
    this.last_level = -2;
    this.max_level = -2;
    this.scene = new Physijs.Scene;
    //this.modelLoader = new GetPhysiModels(LM);
  }
  
  new_loading_manager(LM){
    this.LoadingManager = LM;
  }
  
  get_level(num){
    switch (parseInt(num)) {
      case -2:
        this.current_level = -2;
        this.last_level = -2;
        console.log("HERERERE")
        return this.get_tutorial_scene();
        break;
      case -1:
        this.current_level = -1;
        this.last_level = -1;
        return this.get_level_demo_scene();
        break;
      case 0:
        this.current_level = 0;
        return this.get_main_menu();
        break;
      case 1:
        this.current_level = 1;
        this.last_level = 1;
        return this.get_level_1_scene();
        break;
      case 2:
        this.current_level = 2;
        this.last_level = 2;
        return this.get_level_2_scene();
        break;
       case 3:
         this.current_level = 3;
         this.last_level = 3;
         return this.get_level_3_scene();
         break;
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

  level_controls(player){//!W! this method will find the correct 
    switch (this.current_level) {
      case -2:
        return this.tutorial_controls(player) //be sure to return the cotrol method call !W!
        break;
      case -1: //!W! put demo win conditions here
        
        break;
      case 0: //!W! menu here, but they are already in main.js so I'll handle moveing them, or we'll leave them there
        
        break;
      case 1: //level 1
        
        break;
      case 2: // you get the point

        break;
       case 3:
         
        break;
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
  
  level_click_controls(rayCaster, player){// !W! same as level controls but you clicking
    switch (this.current_level) {
      case -2:
        //tutorial_click_controls(keyCode);
        this.tutorial_click_controls(rayCaster, player);
        break;
      case -1:
        
        break;
      case 0:
        
        break;
      case 1:
        
        break;
      case 2:

        break;
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

  get_level_size(){//this will be the last thing we finish so ignore it for now !W!
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
      case 2://level 2 
        return 2;
        break;
      default:
        return 1;
        break;
    }
  }
    
  get_main_menu(){
    while(this.scene.children.length > 0){ 
      this.scene.remove(this.scene.children[0]); 
    }
    let scene = this.scene;
    let loader = new THREE.TextureLoader(this.LoadingManager);
    let fontLoader = new THREE.FontLoader(this.LoadingManager);
    scene.setGravity(new THREE.Vector3(0,-25,0));

    //light
    scene.add(new THREE.AmbientLight( 0x404040 ));
    let cubeGeometry = new THREE.CubeGeometry(0.1,0.1,0.1);
    let cubeMaterial = Physijs.createMaterial(
      new THREE.MeshBasicMaterial(/*{transparent: true, opacity: 0.0}*/ {color: 0x241BB6}),
      0.5,
      0.5
    );
      
    //title
    fontLoader.load(
      // resource URL
      '../../Models/Font/Barcade_Regular_R.json',
      // onLoad callback
      function ( font ) {
        // do something with the font
        let shapes = font.generateShapes("(Prop Hop}", 15);
        let geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        let xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        geometry.translate(xMid, 0, 0);
        let material = new THREE.MeshBasicMaterial({
          color: "rgb(0,0,0)",
          side: THREE.DoubleSide
        });

        let text = new Physijs.BoxMesh(geometry,material);
        text.position.y = 40
        scene.add( text );
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

    //start
    fontLoader.load(
      // resource URL
      '../../Models/Font/Barcade_Regular_R.json',
    
      // onLoad callback
      function ( font ) {
        // do something with the font
        //console.log("here");
        let shapes = font.generateShapes("<START>", 10);
        let geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        let xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        let yMid = -0.5 * (geometry.boundingBox.max.y);
        geometry.translate(xMid, yMid, 0);
        let material = new THREE.MeshBasicMaterial({
          color: "rgb(0,0,0)",
          side: THREE.DoubleSide
        });

        let text = new Physijs.BoxMesh(geometry,material);
        

        text.position.y = 1.5;

        //start
        let planeGeometry = new THREE.PlaneGeometry(55,15,1,1);
        let planeMaterial = new THREE.MeshLambertMaterial({ color:'rgb(100,100,100)', transparent:true, opacity:0.0 });
    
        let plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
        
        plane.position.y = 10;
        //plane.position.z = 1;
        plane.name = "start";
        text.name = "start";
    
        scene.add( plane );

        plane.add( text ); 
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

    //level select
    fontLoader.load(
      // resource URL
      '../../Models/Font/Barcade_Regular_R.json',

      // onLoad callback
      function ( font ) {
        // do something with the font
        //console.log("here");
        let shapes = font.generateShapes("<Level Select>", 10);
        let geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        let xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        let yMid = -0.5 * (geometry.boundingBox.max.y);
        geometry.translate(xMid, yMid, 0);
        let material = new THREE.MeshBasicMaterial({
          color: "rgb(0,0,0)",
          side: THREE.DoubleSide
        });

        let text = new Physijs.BoxMesh(geometry,material);
        

        text.position.y = 1.5;

        //start
        let planeGeometry = new THREE.PlaneGeometry(100,15,1,1);
        let planeMaterial = new THREE.MeshLambertMaterial({ color:'rgb(100,100,100)', transparent:true, opacity:0.0 });

        let plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
        
        plane.position.y = -10;
        //plane.position.z = 1;
        plane.name = "level_select";
        text.name = "level_select";

        scene.add( plane );

        plane.add( text ); 
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
    
    let cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.mass = 0;
    cube.name = "player:slide:start";
    cube.userData = new Player(cube,  1);
    scene.add(cube);

    //title
    let planeGeometry = new THREE.PlaneGeometry(90,30,1,1);
    //let planeMaterial = new THREE.MeshBasicMaterial({color: 0x241BB6});
    let planeMaterial = new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/PropHopSkin.jpg' )});

    let plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);

    // //Level Select Screen****************************************************
    
    //Level Select Menu
    fontLoader.load(
      // resource URL
      '../../Models/Font/Barcade_Regular_R.json',
    
      // onLoad callback
      function ( font ) {
        // do something with the font
        let shapes = font.generateShapes("<LEVEL SELECT>", 15);
        let geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        let xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        let yMid = -0.5 * (geometry.boundingBox.max.y);
        geometry.translate(xMid, yMid, 0);
        let material = new THREE.MeshBasicMaterial({
          color: "rgb(0,0,0)",
          side: THREE.DoubleSide
        });

        let text = new Physijs.BoxMesh(geometry,material);
        
        text.position.y += 40;
        text.position.x = 1000;

        scene.add( text );
        
        //Level 1
        shapes = font.generateShapes("( I }", 10);
        geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        yMid = -0.5 * (geometry.boundingBox.max.y);
        geometry.translate(xMid, yMid, 0);
        material = new THREE.MeshBasicMaterial({
          color: "rgb(0,0,0)",
          side: THREE.DoubleSide
        });

        text = new Physijs.BoxMesh(geometry,material);
        
        text.position.y = 1.5;

        
        planeGeometry = new THREE.PlaneGeometry(20,15,1,1);
        planeMaterial = new THREE.MeshBasicMaterial({ color:'rgb(100,100,100)', transparent:true, opacity:0.0 });
    
        plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
        
        plane.position.x = 955;
        plane.name = "Level_1";
        text.name = "Level_1";
    
        scene.add( plane );

        plane.add( text );

        //Level 2
        shapes = font.generateShapes("(I I}", 10);
        geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        yMid = -0.5 * (geometry.boundingBox.max.y);
        geometry.translate(xMid, yMid, 0);
        material = new THREE.MeshBasicMaterial({
          color: "rgb(0,0,0)",
          side: THREE.DoubleSide
        });

        text = new Physijs.BoxMesh(geometry,material);
        
        text.position.y = 1.5;

        
        planeGeometry = new THREE.PlaneGeometry(20,15,1,1);
        planeMaterial = new THREE.MeshBasicMaterial({ color:'rgb(100,100,100)', transparent:true, opacity:0.0 });
    
        plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
        
        plane.position.x = 985;
        plane.name = "Level_2";
        text.name = "Level_2";
    
        scene.add( plane );

        plane.add( text );

        //Level 3
        shapes = font.generateShapes("(III}", 10);
        geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        yMid = -0.5 * (geometry.boundingBox.max.y);
        geometry.translate(xMid, yMid, 0);
        material = new THREE.MeshBasicMaterial({
          color: "rgb(0,0,0)",
          side: THREE.DoubleSide
        });

        text = new Physijs.BoxMesh(geometry,material);
        
        text.position.y = 1.5;

        
        planeGeometry = new THREE.PlaneGeometry(20,15,1,1);
        planeMaterial = new THREE.MeshBasicMaterial({ color:'rgb(100,100,100)', transparent:true, opacity:0.0 });
    
        plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
        
        plane.position.x = 1015;
        plane.name = "Level_3";
        text.name = "Level_3";
    
        scene.add( plane );

        plane.add( text );

        //Level 4
        shapes = font.generateShapes("(IV}", 10);
        geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        yMid = -0.5 * (geometry.boundingBox.max.y);
        geometry.translate(xMid, yMid, 0);
        material = new THREE.MeshBasicMaterial({
          color: "rgb(0,0,0)",
          side: THREE.DoubleSide
        });

        text = new Physijs.BoxMesh(geometry,material);
        
        text.position.y = 1.5;

        
        planeGeometry = new THREE.PlaneGeometry(22,15,1,1);
        planeMaterial = new THREE.MeshBasicMaterial({ color:'rgb(100,100,100)', transparent:true, opacity:0.0 });
    
        plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
        
        plane.position.x = 1045;
        plane.name = "Level_4";
        text.name = "Level_4";
    
        scene.add( plane );

        plane.add( text );

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

    return scene;
  }
  
  get_tutorial_scene(){
    while(this.scene.children.length > 0){ 
      this.scene.remove(this.scene.children[0]); 
    }
    let scene = this.scene;
    let loader = new THREE.TextureLoader(this.LoadingManager);
    let fontLoader = new THREE.FontLoader(this.LoadingManager);
    scene.setGravity(new THREE.Vector3(0,-25,0));

    let lightA = new THREE.AmbientLight( 0x404040 ); // soft white light so entire room isn't super dark. Disable this for dark room!
    scene.add(lightA);

    let light = new THREE.PointLight( 0x404040, 1, 1000 );
    light.position.set( -100, 100, 100 );
    light.castShadow = true;
    scene.add( light );

    light = new THREE.PointLight( 0x404040, 1, 1000 );
    light.position.set( -1000, -900, 0 );
    light.castShadow = true;
    scene.add( light );

    //Cube
    let cubeGeometry = new THREE.CubeGeometry(6,6,6);
    let cubeMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/hardwood2_diffuse.jpg' )}),
        0.4,
        0.1
    );
    cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
    cubeMaterial.map.repeat.set( 1, .5 );
    let cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.castShadow = true;
    cube.position.y = 10;
    cube.position.x = 0;
    
    cube.name = "player:slide:start";
    cube.userData = new Player(cube,  3.5);

    cube.mass = 0;
    scene.add(cube);

    //To Zoom in and out use the scroll wheel on your mouse
    fontLoader.load(
      // resource URL
      '../../Models/Font/Barcade_Regular_R.json',
      // onLoad callback
      function ( font ) {
        // do something with the font
        let shapes = font.generateShapes("[Zoom with the scroll wheel]", 10);
        let geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        let xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        geometry.translate(xMid, 0, 0);
        let material = new THREE.MeshBasicMaterial({
          color: "rgb(0,0,0)",
          side: THREE.DoubleSide
        });

        let text = new Physijs.BoxMesh(geometry,material);
        text.position.y = 20;
        //text.lookAt(new THREE.Vector3(0,25,100));
        scene.add( text );


        //Next button
        shapes = font.generateShapes("[Next>", 5);
        geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        geometry.translate(xMid, 0, 0);

        text = new Physijs.BoxMesh(geometry,material);

        let planeGeometry = new THREE.PlaneGeometry(22,8,1,1);
        let planeMaterial = new THREE.MeshBasicMaterial({ color:'rgb(100,100,100)', transparent:true, opacity:0.5 });
    
        let plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
        
        plane.position.x = 175;
        plane.name = "Next";
        text.name = "Next";
        text.position.y = -2;
    
        plane.add( text );

        scene.add( plane );


        //second stage of tutorial
        //Floor
        cubeGeometry = new THREE.CubeGeometry(250,250,150);
        cubeMaterial = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/Grass.png' )}),
            0.9,
            0.9
        );
        cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
        cubeMaterial.map.repeat.set( 1, .5 );
        cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
        cube.receiveShadow = true;
        cube.castShadow = true;
        cube.position.y = -1125;
        cube.position.x = -1000;
        cube.mass = 0;
        scene.add(cube);
        
        //Backwall
        cubeGeometry = new THREE.CubeGeometry(185,50,1);
        cubeMaterial = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/White_Paint.png' )}),
            0.2,
            1.0
        );
        cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
        cubeMaterial.map.repeat.set( 1, .5 );
        cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
        cube.receiveShadow = true;
        cube.castShadow = true;
        cube.position.y = -975;
        cube.position.x = -1000;
        cube.position.z = -25
        cube.mass = 0;
        scene.add(cube);

        shapes = font.generateShapes("{Move with the wasd keys and the space bar}\n{change into other objects by clicking them}\n(try to move off the the platform>", 5);
        geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        geometry.translate(xMid, 0, 0);

        text = new Physijs.BoxMesh(geometry,material);
        text.position.y = -965;
        text.position.x = -1000;
        text.position.z = -24.4;
        //text.lookAt(new THREE.Vector3(0,25,100));
        scene.add( text );

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
          cylinder.position.y = -975;
          cylinder.position.x = -975;
          
          
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
          cylinder.userData = new RollPlayer(cylinder, 3.5);
          scene.add( cylinder );
          log.traverse( function( child ) { 
              if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
                return;
              }
          });
        }
      );

      // tennis ball
      let sphereGeometry = new THREE.SphereGeometry(3,36,36);
      let sphereMaterial = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/Tennis_Ball2.png' )}),
        0.1,
        1.5
      );

      sphereMaterial.map.wrapS = sphereMaterial.map.wrapT = THREE.RepeatWrapping;
      sphereMaterial.map.repeat.set( 1, .5 );
      let sphere = new Physijs.SphereMesh(sphereGeometry, sphereMaterial);
      console.log("tennis ball mass: " + sphere.mass);
      sphere.mass = 5;
      sphere.receiveShadow = true;
      sphere.castShadow = true;

      sphere.position.y = -975;
      sphere.position.x = -980;
      sphere.position.z = 0;
      sphere.name = "player:slide";
      sphere.userData = new Player(sphere, 5);
      scene.add(sphere);

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

    return scene;
  }

  tutorial_click_controls(rayCaster, player){
    let intersects = rayCaster.intersectObjects( scene.children, true );

    if (intersects[0].object.name == "Next"){
			console.log("Clicked Next");
			player.__dirtyPosition = true;
      player.position.x = -1000;
      player.position.y = -1000;
      player.mass = 10;
			
		}
    //!W! put any special clickable controls here this may or may not pan out, as we may not have special clickables
  }

  tutorial_controls(player){ //!W! all the comments for this method are important
    if(player.position.y < -1020){
      player.mass = 0;
      player.position.x = 1000;
      player.position.y = 1000;
      player.position.z == 0;
      this.last_level = -2;
      this.max_level = 1;
      return true;
    }
    if(player.position.x == 1000 && player.position.y == 1000 && player.position.z == 0){//"win" condition !W!
      this.last_level = -2;
      this.max_level = 1;
      return true;//player finished level
    }
    //any special controls for the level go here !W!
    //like if we implemented flip gravity
    //NOT SPECIAL CONTROLLS FOR AN OBJECT! !W! !W!
    return false;//player hasn't finished
  }

  get_level_1_scene(){
    while(this.scene.children.length > 0){ 
      this.scene.remove(this.scene.children[0]); 
    }
    let scene = this.scene;
    let loader = new THREE.TextureLoader(this.LoadingManager);
    let white1 = "rgb(111, 127, 136)";
    let pink = "rgb(255,192,203)";
    scene.setGravity(new THREE.Vector3(0,-25,0));

    //light
    let light = new THREE.AmbientLight( 0x404040 ); // soft white light so entire room isn't super dark. Disable this for dark room!
    scene.add(light);

    //  let spotLight = new THREE.SpotLight(0xffffff);
    //  spotLight.position.set(-50,75,-10);
    //  spotLight.lookAt(0,0,0);
    //  spotLight.castShadow = true;
    //  scene.add(spotLight); 

    //back wall
    let cubeGeometry = new THREE.CubeGeometry(300,200,1,1);
    let cubeMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial(white1, 0.8, 0.2));
    let cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = -2;
    cube.position.x = 0;
    cube.position.z = -50;
    cube.mass = 0;
    scene.add(cube);
    

    //floor
    cubeGeometry = new THREE.CubeGeometry(607,5,160);
    cubeMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/hardwood2_diffuse.jpg' )}),
        0.9,
        0.9
    );
    cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
    cubeMaterial.map.repeat.set( 1, 1 );
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = -100; //keep
    cube.position.x = 150;
    cube.position.z = 26;
    cube.mass = 0;
    scene.add(cube);

    //right wall
    cubeGeometry = new THREE.CubeGeometry(3,225,155,1);
    cubeMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial(white1,
        0.8,
        0.2
    ));
    // cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
    // cubeMaterial.map.repeat.set( 1, .5 );
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = 0;
    cube.position.x = 150;
    cube.position.z = 25;
    cube.mass = 0;
    scene.add(cube);

    //left wall
    cubeGeometry = new THREE.CubeGeometry(3,200,155,1);
    cubeMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial(white1,
        0.8,
        0.2
    ));
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = 0;
    cube.position.x = -150;
    cube.position.z = 25;
    cube.mass = 0;
    scene.add(cube);

    //front wall
    cubeGeometry = new THREE.CubeGeometry(600,100,5,1);
    cubeMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial(white1,
        0.8,
        0.2
    ));
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = -100;
    cube.position.x = 0;
    cube.position.z = 105;
    cube.mass = 0;
    scene.add(cube);

    //shelf to slide along with lamp
    //the player will have to catch the lip of the shelf with the lampshade to slide over danger
    //shelf above bed
    cubeGeometry = new THREE.CubeGeometry(100,3,20);
    cubeMaterial = Physijs.createMaterial(
      new THREE.MeshLambertMaterial(white1,
      0.2,
      0.2
    ));
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.mass = 0;
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = -40;
    scene.add(cube);
    
    //trophy on shelf
    //might want to use joints instead of adding to a base
    let trophybase = new Physijs.CylinderMesh(new THREE.CylinderGeometry(3,3,1,12),new THREE.MeshLambertMaterial({color:'#808080', reflectivity:1}));
    let trophymid = new Physijs.CylinderMesh(new THREE.CylinderGeometry(1,1,5,12),new THREE.MeshLambertMaterial({color:'#808080', reflectivity:1}));
    let trophycup = new Physijs.CylinderMesh(new THREE.CylinderGeometry(5,3,4,12),new THREE.MeshLambertMaterial({color:'#808080', reflectivity:1}));
    trophybase.add(trophymid);
    trophymid.position.y = 2.5;
    trophybase.add(trophycup);
    trophycup.position.y = 7;
    trophybase.position.y = 2;
    trophybase.position.z = -45;
    scene.add(trophybase);

    //books on shelf
    //Add some more maybe
    cubeGeometry = new THREE.CubeGeometry(3,12,9);
    cubeMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/BookBinding.png' )}),
        0.9,
        0.2
    );
    cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
    cubeMaterial.map.repeat.set( 1, 1 );
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = 7;
    cube.position.x = 12;
    cube.position.z = -45;
    scene.add(cube);
    
    cubeMaterial = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/BookBinding2.png' )}),
      0.9,
      0.2
    );
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = 7;
    cube.position.x = 15.2;
    cube.position.z = -45;
    scene.add(cube);
    
    
    //nightStand
    //lamp starts on nightstand
    

    //bed
    
    //bed head
    cubeGeometry = new THREE.CubeGeometry(100,50,5);
    cubeMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/HeadBoard.png' )}),
        0.9,
        0.2
    );
    cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
    cubeMaterial.map.repeat.set( 1, 1 );
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = -40;
    cube.position.x = 0;
    cube.position.z = -45;
    cube.mass = 0;
    scene.add(cube);

    //bed foot
    cubeGeometry = new THREE.CubeGeometry(100,25,5);
    cubeMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/Footboard.png' )}),
        0.9,
        0.2
    );
    cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
    cubeMaterial.map.repeat.set( 1, 1 );
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = -50;
    cube.position.x = 0;
    cube.position.z = 20;
    cube.mass = 0;
    scene.add(cube);


    //bed matteress/base
    cubeGeometry = new THREE.CubeGeometry(95,30,60);
    cubeMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/Sheets.png' )}),
        0.9,
        0.2
    );
    cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
    cubeMaterial.map.repeat.set( 1, 1 );
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = -60;
    cube.position.x = 0;
    cube.position.z = -12.5;
    cube.mass = 0;
    scene.add(cube);

    //bed legs
    

    // player
    let sphereGeometry = new THREE.SphereGeometry(6,36,36);
    let sphereMaterial = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/abstract.jpg' )}),
      0.1,
      1.5
    );

      sphereMaterial.map.wrapS = sphereMaterial.map.wrapT = THREE.RepeatWrapping;
      sphereMaterial.map.repeat.set( 1, .5 );
      let sphere = new Physijs.SphereMesh(sphereGeometry, sphereMaterial);
      sphere.receiveShadow = true;
      sphere.castShadow = true;
      sphere.position.y = 0;
      sphere.position.x = 0
      sphere.name = "player:slide:start";
      sphere.userData = new Player(sphere, 6.5);
      scene.add(sphere);

      
      sphereGeometry = new THREE.SphereGeometry(3,36,36);
      sphereMaterial = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/Tennis_Ball2.png' )}),
      0.9,
      0.1
      );

      sphereMaterial.map.wrapS = sphereMaterial.map.wrapT = THREE.RepeatWrapping;
      sphereMaterial.map.repeat.set( 1, .5 );
      sphere = new Physijs.SphereMesh(sphereGeometry, sphereMaterial);
      sphere.receiveShadow = true;
      sphere.castShadow = true;
      sphere.position.y = 0;
      sphere.position.x = 25;
      sphere.name = "player:slide";
      sphere.userData = new Player(sphere, 3.5);
      scene.add(sphere);

      // lamp
      let lampbase = new Physijs.CylinderMesh(new THREE.CylinderGeometry(4,4,1,12),new THREE.MeshLambertMaterial({color:'#808080', reflectivity:1}));
      let lamppole = new Physijs.CylinderMesh(new THREE.CylinderGeometry(0.5,0.5,28,12),new THREE.MeshLambertMaterial({color:'#808080', reflectivity:1}));
      //let lampshade = new Physijs.ConcaveMesh(new THREE.CylinderGeometry(5,5,8.5,12),new THREE.MeshLambertMaterial({ wireframe: true, opacity: 0.0 }));
      //opacity: 0.5, reflectivity:1
      let lampshade = new Physijs.CylinderMesh(new THREE.CylinderGeometry(5,5,15,12,1,true),new THREE.MeshLambertMaterial({side:THREE.DoubleSide, color:'#204036', emissive:"rgb(220,220,220)", emissiveIntensity:.5}),0.0,0.5);
      lampshade.side = THREE.BackSide;
  
      lampbase.add(lamppole);
      lampbase.castShadow = true;
      lamppole.castShadow = true;
      lamppole.position.y += 14;
  
      lampbase.add(lampshade);
      //lampshade.castShadow = true;//commented out to try to get a better working lamp
      lampshade.position.y += 25;

      lampbase.position.x = -140;
      lampbase.position.y = 0;
      lampbase.position.z = -10;
  
      lampbase.name = "player:slide";
      lampshade.name = "parent";
      lamppole.name = "parent";
      lampbase.userData = new Player(lampbase, 3); 
                
      lampbase.position.y += 1;
  
      let pointLight1 = new THREE.PointLight(0x404040, 1, 250);//better lamp maybe
      //let pointLight2 = new THREE.PointLight(0x404040, 5, 25);//commented out to try to get a better working lamp
      pointLight1.castShadow = true;
      //pointLight2.castShadow = true;//commented out to try to get a better working lamp
  
      lampshade.add(pointLight1);

      //lampshade.add(pointLight2);//commented out to try to get a better working lamp
      //pointLight1.position.x += 2;//commented out to try to get a better working lamp
      pointLight1.position.y += 7;
      //pointLight2.position.x += -2;//commented out to try to get a better working lamp
      //pointLight2.position.y += 7;//commented out to try to get a better working lamp

      
      lampbase.addEventListener("ready", function(){//this will keep the lamp from tipping over
        
        lampbase.setAngularFactor(new THREE.Vector3(0, 0, 0));
        
      });
      scene.add(lampbase);

    return scene;
  }

  level_1_click_controls(rayCaster, player){

  }

  get_level_2_scene(){
    while(this.scene.children.length > 0){ 
      this.scene.remove(this.scene.children[0]); 
    }
    let scene = this.scene;
    let loader = new THREE.TextureLoader(this.LoadingManager);
    let white1 = "rgb(111, 127, 136)";
    let pink = "rgb(255,192,203)";
    scene.setGravity(new THREE.Vector3(0,-25,0));

    //light
    //let light = new THREE.AmbientLight( 0x404040 ); // soft white light so entire room isn't super dark. Disable this for dark room!
    //scene.add(light);

    // light for testing:
    //let light = new THREE.AmbientLight( 0xDDDDDD ); // Testing light, this should be commented out normally
    //scene.add(light);

    //  let spotLight = new THREE.SpotLight(0xffffff);
    //  spotLight.position.set(-50,75,-10);
    //  spotLight.lookAt(0,0,0);
    //  spotLight.castShadow = true;
    //  scene.add(spotLight); 

    //back wall
    let cubeGeometry = new THREE.CubeGeometry(288,200,1,1);
    let cubeMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial(white1, 0.8, 0.2));
    let cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = -2;
    cube.position.x = 7;
    cube.position.z = -46;
    cube.mass = 0;
    scene.add(cube);
    cubeGeometry = new THREE.CubeGeometry(13,190,1,1);
    cubeMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial(white1, 0.8, 0.2));
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = 5;
    cube.position.x = -143;
    cube.position.z = -46;
    cube.mass = 0;
    scene.add(cube);

    let geometry = new THREE.CubeGeometry(11.5,10,1);
    //let material = new THREE.MeshLambertMaterial( {color: "rgb(255,255,255)"} ); // this is if we want the wall to blend completely
    let material = new THREE.MeshLambertMaterial( {color: white1} ); // this hidden door is a different color
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = -142.7;
    cube.position.y = -95;
    cube.position.z = -46;
    scene.add(cube);


    // hidden corridor
    cubeGeometry = new THREE.CubeGeometry(317,16,5,1);
    cubeMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial(white1, 0.8, 0.2));
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = -90;
    cube.position.x = 5;
    cube.position.z = -55;
    cube.mass = 0;
    scene.add(cube);
    cubeGeometry = new THREE.CubeGeometry(313,2,10,1);
    cubeMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial(white1, 0.8, 0.2));
    let cube2 = new Physijs.BoxMesh(cubeGeometry, cubeMaterial,0);
    cube2.position.y = -83;
    cube2.position.x = 7;
    cube2.position.z = -55;
    scene.add(cube2);
    cube2.receiveShadow = true;
    cubeGeometry = new THREE.CubeGeometry(2,15,13,1);
    cubeMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial(white1, 0.8, 0.2));
    let cube3 = new Physijs.BoxMesh(cubeGeometry, cubeMaterial,0);
    cube3.position.y = -90;
    cube3.position.x = 163;
    cube3.position.z = -50;
    scene.add(cube3);
    cube3.receiveShadow = true;

    //floor
    cubeGeometry = new THREE.CubeGeometry(607,5,160,500);
    cubeMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/hardwood2_diffuse.jpg' )}),
        0.9,
        0.9
    );
    cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
    cubeMaterial.map.repeat.set( 1, 1 );
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = -100; //keep
    cube.position.x = 150;
    cube.position.z = 26;
    cube.mass = 0;
    scene.add(cube);

    //right wall
    cubeGeometry = new THREE.CubeGeometry(3,200,155,1);
    cubeMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial(white1,
        0.8,
        0.2
    ));
    // cubeMaterial.map.wrapS = cubeMaterial.map.wrapT = THREE.RepeatWrapping;
    // cubeMaterial.map.repeat.set( 1, .5 );
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = 0;
    cube.position.x = 150;
    cube.position.z = 33;
    cube.mass = 0;
    scene.add(cube);

    //left wall
    cubeGeometry = new THREE.CubeGeometry(3,200,155,1);
    cubeMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial(white1,
        0.8,
        0.2
    ));
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = 0;
    cube.position.x = -150;
    cube.position.z = 25;
    cube.mass = 0;
    scene.add(cube);

    //front wall
    cubeGeometry = new THREE.CubeGeometry(600,100,5,1);
    cubeMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial(white1,
        0.8,
        0.2
    ));
    cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
    cube.receiveShadow = true;
    cube.position.y = -100;
    cube.position.x = 0;
    cube.position.z = 105;
    cube.mass = 0;
    scene.add(cube);

    // player
    let sphereGeometry = new THREE.SphereGeometry(6,36,36);
    let sphereMaterial = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/abstract.jpg' )}),
      0.1,
      1.5
    );

      sphereMaterial.map.wrapS = sphereMaterial.map.wrapT = THREE.RepeatWrapping;
      sphereMaterial.map.repeat.set( 1, .5 );
      let sphere = new Physijs.SphereMesh(sphereGeometry, sphereMaterial);
      sphere.receiveShadow = true;
      sphere.castShadow = true;
      sphere.position.y = 0;
      sphere.position.x = 0
      sphere.name = "player:slide:start";
      sphere.userData = new Player(sphere, 6.5);
      scene.add(sphere);

      // lamp
      let lampbase = new Physijs.CylinderMesh(new THREE.CylinderGeometry(4,4,1,12),new THREE.MeshLambertMaterial({color:'#808080', reflectivity:1}));
      let lamppole = new Physijs.CylinderMesh(new THREE.CylinderGeometry(0.5,0.5,28,12),new THREE.MeshLambertMaterial({color:'#808080', reflectivity:1}));
      //let lampshade = new Physijs.ConcaveMesh(new THREE.CylinderGeometry(5,5,8.5,12),new THREE.MeshLambertMaterial({ wireframe: true, opacity: 0.0 }));
      //opacity: 0.5, reflectivity:1
      let lampshade = new Physijs.CylinderMesh(new THREE.CylinderGeometry(5,5,15,12,1,true),new THREE.MeshLambertMaterial({side:THREE.DoubleSide, color:'#204036', emissive:"rgb(220,220,220)", emissiveIntensity:.5}));
      lampshade.side = THREE.BackSide;
  
      lampbase.add(lamppole);
      lampbase.castShadow = true;
      lamppole.castShadow = true;
      lamppole.position.y += 14;
  
      lampbase.add(lampshade);
      //lampshade.castShadow = true;//commented out to try to get a better working lamp
      lampshade.position.y += 25;

      lampbase.position.x = -140;
      lampbase.position.y = -55;
      lampbase.position.z = -10;
  
      lampbase.name = "player:slide";
      lampshade.name = "parent";
      lamppole.name = "parent";
      lampbase.userData = new Player(lampbase, 3); 
                
      lampbase.position.y += 1;
  
      let pointLight1 = new THREE.PointLight(0x404040, 1, 250);//better lamp maybe
      //let pointLight2 = new THREE.PointLight(0x404040, 5, 25);//commented out to try to get a better working lamp
      pointLight1.castShadow = true;
      //pointLight2.castShadow = true;//commented out to try to get a better working lamp
  
      lampshade.add(pointLight1);

      //lampshade.add(pointLight2);//commented out to try to get a better working lamp
      //pointLight1.position.x += 2;//commented out to try to get a better working lamp
      pointLight1.position.y += 7;
      //pointLight2.position.x += -2;//commented out to try to get a better working lamp
      //pointLight2.position.y += 7;//commented out to try to get a better working lamp

      
      lampbase.addEventListener("ready", function(){//this will keep the lamp from tipping over
        
        lampbase.setAngularFactor(new THREE.Vector3(0, 0, 0));
        
      });
      scene.add(lampbase);

      let GLTF_loader = new THREE.GLTFLoader(loadingManager);
      GLTF_loader.load('../../Models/Player_Models/Level1/Desk.glb',
        function ( gltf ) {
          let deskModel = gltf.scene;
          let ddrawers = new Physijs.BoxMesh(new THREE.BoxGeometry(25,40,33),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0 }));
          let dbackside = new Physijs.BoxMesh(new THREE.BoxGeometry(100,30,1),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0 }));
          let dleg = new Physijs.BoxMesh(new THREE.BoxGeometry(1,40,33),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0 }));
          let dtop = new Physijs.BoxMesh(new THREE.BoxGeometry(130,2,44),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0 }));

          dbackside.position.x += -138;
          dbackside.position.y += -73;
          dbackside.position.z += 30;
          dbackside.rotation.y = Math.tan(1);
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
          scene.add(dbackside);
        });

        GLTF_loader.load('../../Models/Player_Models/Level1/Desk_Chair.glb',
        function ( gltf ) {
          let deskchairModel = gltf.scene;

          //let dcwheels = new Physijs.BoxMesh(new THREE.BoxGeometry(5,5,5),new THREE.MeshLambertMaterial({wireframe: true, opacity: 0.9 })); // yes I know they are cubes
          // are the wheels really necessary?
          let dcbase1 = new Physijs.BoxMesh(new THREE.BoxGeometry(2.5,3,28.5),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0}));
          let dcbase2 = new Physijs.BoxMesh(new THREE.BoxGeometry(28.5,3,2.5),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0}));
          let dcbutt = new Physijs.CylinderMesh(new THREE.CylinderGeometry(16,16,5,25),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0}));
          let dcbase = new Physijs.CylinderMesh(new THREE.CylinderGeometry(2,2,18,10),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0}));
          let dcback = new Physijs.ConvexMesh(new THREE.CylinderGeometry(22,16,45,10,4,4, true, 60,60),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0}));
          let dcarmL = new Physijs.CylinderMesh(new THREE.CylinderGeometry(6,6,3,0,7),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0})); //left arm
          let dcarmL2 = new Physijs.BoxMesh(new THREE.BoxGeometry(2.5,1.5,10),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0})); // left not-curved arm
          let dcarmR = new Physijs.CylinderMesh(new THREE.CylinderGeometry(6,6,3,0,7),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0})); //right arm
          let dcarmR2 = new Physijs.BoxMesh(new THREE.BoxGeometry(2.5,1.5,10),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0})); // right not-curved arm
          dcbutt.userData = new Player(dcbutt, 0.1);
          dcbutt.position.y += -70;
          dcbutt.castShadow = true;
          dcbutt.receiveShadow = true;

          deskchairModel.scale.set(6,6,6);
          deskchairModel.position.y += 15;
          deskchairModel.position.z += -5;

          dcbutt.add(dcbase);
          dcbase.position.y += -10;
          dcbase.castShadow = true;
          dcbase.receiveShadow = true;

          // bases have high mass so it wobbles less?
          dcbutt.add(dcbase1);
          dcbase1.position.y += -17.5;
          dcbase1.mass = 1500;
          dcbutt.add(dcbase2);
          dcbase2.position.y += -17.5;
          dcbase2.mass = 1500;
          dcbase1.castShadow = true;
          dcbase1.receiveShadow = true;
          dcbase2.castShadow = true;
          dcbase2.receiveShadow = true;

          dcbutt.add(dcback);
          dcback.position.y += 25;
          dcback.rotation.y += -0.8*Math.PI;
          dcbutt.castShadow = true;
          dcbutt.receiveShadow = true;

          // chair: left arm
          dcbutt.add(dcarmL);
          dcarmL.position.x += 16;
          dcarmL.rotation.x += Math.PI/2;
          dcarmL.position.y += 7;
          dcarmL.rotation.z += -Math.PI/2;
          dcarmL.position.z += 7;
          dcbutt.add(dcarmL2);
          dcarmL2.position.x += 15.5;
          dcarmL2.position.y += 13;
          // shadows for arms will look jacked so I didn't add them, will fix this later.
          // commenting "Jenna" so I can ctrl F find this easier later for making this pretty

          // chair: right arm
          dcbutt.add(dcarmR);
          dcarmR.position.x += -16;
          dcarmR.rotation.x += Math.PI/2;
          dcarmR.position.y += 7;
          dcarmR.rotation.z += Math.PI/2;
          dcarmR.position.z += 7;
          dcbutt.add(dcarmR2);
          dcarmR2.position.x += -15.5;
          dcarmR2.position.y += 13;

          dcbutt.add(deskchairModel);
          dcbutt.name = "player:slide";
          dcbase.name = "parent";
          dcbase1.name = "parent";
          dcbase2.name = "parent";
          dcback.name = "parent";
          scene.add(dcbutt);
        });
      
        GLTF_loader.load('../../Models/Player_Models/Laptop.glb',
        function ( gltf ) {
          let laptopModel = gltf.scene;

          let laptopscreen = new Physijs.BoxMesh(new THREE.BoxGeometry(0.5,18,28),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0}));
          let keyboard = new Physijs.BoxMesh(new THREE.BoxGeometry(20,1,20),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0}));
          // transparent: true, opacity: 0.0

          keyboard.userData = new Player(keyboard, 0.1);
          keyboard.position.x += -120;
          keyboard.position.y += -10;
          keyboard.rotation.y += Math.PI;
          keyboard.position.z += 40;
          keyboard.castShadow = true;

          keyboard.add(laptopscreen);
          laptopscreen.position.x += 10.5;
          laptopscreen.position.y += 10;
          laptopscreen.position.z += 0;
          laptopscreen.castShadow = true;

          laptopModel.scale.set(9,9,9);
          laptopModel.position.x += 8;

          keyboard.add(laptopModel);
          keyboard.name = "player:slide";
          laptopscreen.name = "parent";

          scene.add(keyboard);
        });

        // I am still going to move this to the objects class!
        // please don't that class does not work -Wallace
        GLTF_loader.load('../../Models/Player_Models/mouse-gamer-free-model-by-oscar-creativo.glb',
        function ( gltf ) {
          let mouseModel = gltf.scene;

          let mouse = new Physijs.BoxMesh(new THREE.BoxGeometry(4.5,1.5,8),new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0}));
          let topmouse = new Physijs.ConvexMesh( new THREE.SphereGeometry(3.5,8,8, Math.PI/2, Math.PI*2, 0, 0.5 * Math.PI), new THREE.MeshLambertMaterial({transparent: true, opacity: 0.0}));

          mouse.userData = new Player(mouse, 0.5);
          mouse.name = "player:slide";
          topmouse.name = "parent";
          mouseModel.name = "parent";

          mouse.add(mouseModel);
          mouseModel.scale.set(250,250,250);
          mouseModel.position.y += -1;
          mouseModel.position.z += -2.5;

          mouse.position.x += -120;
          mouse.position.y += -45;
          mouse.mass = 100;
          mouse.rotation.y += Math.PI/3;

          mouse.castShadow = true;
          mouse.receiveShadow = true;

          mouse.add(topmouse);
          topmouse.position.x += 0;
          topmouse.position.y += -1;
          topmouse.position.z += 0.5;
          topmouse.castShadow = true;
          topmouse.receiveShadow = true;

          scene.add(mouse);
        });

    return scene;
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

    cube.userData = new Player(cube, 3.5);

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
        
    });
    bridge.mass = 8000;
    scene.add(bridge);
    

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
          cylinder.userData = new RollPlayer(cylinder, 3.5);
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
          base.userData = new Player(base, .6);

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

    });
    return scene;
  }

  get_level_3_scene(){

    while(this.scene.children.length > 0){ 
      this.scene.remove(this.scene.children[0]); 
    }
    let scene = this.scene;
    let loader = new THREE.TextureLoader(this.LoadingManager);
    let GLTF_loader = new THREE.GLTFLoader(loadingManager);
    
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
    cube.userData = new SlidePlayer(cube, 3.5);

    
    scene.add(cube);

    //plane
    let planeGeometry = new THREE.PlaneGeometry(400,400,1,1);
    //let planeMaterial = new THREE.MeshBasicMaterial({color:"rgb(10,200,10)"});
    let planeMaterial = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({ map: loader.load( 'Models/Images/smooth-ice.jpg' )}),
      0.2,
      0.2
    );
    planeMaterial.map.wrapS = planeMaterial.map.wrapT = THREE.RepeatWrapping;
    planeMaterial.map.repeat.set( 1, .5 );
    //floor
    let plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
    plane.rotation.x = -.5*Math.PI;
    //plane.rotation.y = (0.125)*Math.PI;
    plane.receiveShadow = true;
    scene.add(plane);

    GLTF_loader.load('../../Models/Player_Models/Level1/Chair.glb',
    function ( gltf ) {
        let chairModel = gltf.scene;

        let base = new Physijs.BoxMesh(new THREE.BoxGeometry(10,10,10),new THREE.MeshLambertMaterial({ transparent: true, opacity: 0.0 }));

        base.position.y = 1.25*Math.PI;
        
        base.mass = 300;

        scene.add(base);

        chairModel.name = "parent";
        base.name = "player:slide";

        base.add( chairModel );

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
          cylinder.position.y = -975;
          cylinder.position.x = -975;
          
          
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
          cylinder.userData = new RollPlayer(cylinder, 3.5);
          scene.add( cylinder );
          log.traverse( function( child ) { 
              if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
                return;
              }
          });
        }
      );
    return scene;
  }
}