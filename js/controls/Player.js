"use strict";
//make a class to be attached to a 3d object that contains things like
//special controls and

//!!!!!!!!!!!!!!!!!!!!!!!!!!THE LENGTH THAT THE JUMPCASTER SHOULD BE!!!!!!!!!!!!!!!!!!!!!!!!!!

class Player {  
    constructor(playerObject,  jumpCasterFar) {
        this.player = playerObject;        
        this.jumpCasterFar = jumpCasterFar;
    }
    movement(moveIn, moveOut, moveLeft, moveRight, jump, jumpCaster){
        let m = this.player.mass/300;
		let velocity = new THREE.Vector3();
        let cv = this.player.getLinearVelocity();
		if(moveIn){
			if(cv.z > 0){
				velocity.z -= 1000*m;
			}
			else if(cv.z > -50){
				velocity.z -= 100*m;
			}
		}
		if(moveOut){
			if(cv.z < 0){
				velocity.z += 1000*m;
			}
			else if(cv.z < 50){
				velocity.z += 100*m;
			}
		}
		if(moveLeft){
			if(cv.x > 0){
				velocity.x -= 1000*m;
			}
			else if(cv.x > -50){
				velocity.x -= 100*m;
			}
		}
		if(moveRight){
			if(cv.x < 0){
				velocity.x += 1000*m;
			}
			else if(cv.x < 50){
				velocity.x += 100*m;
			}
		}
		if(jump){
			let intersects = jumpCaster.intersectObjects( scene.children, true);
			//console.log("intersects: " + intersects.length);
				try{
					//console.log(1);
					if(intersects[0].object.parent.parent != undefined){
						//console.log(2);
						if(intersects.length >= 2){
							//console.log(3);
							velocity.y += 1000*m;
						}
						else{
							//console.log(3.1);
						}
					}
					else if(intersects.length >= 1){
						//console.log(4);
						velocity.y += 1000*m;
					}
					else{
						//console.log(5);
					}
				}
				catch{
					//console.log("jump failed");
				}
		}
		this.player.applyCentralImpulse(velocity);
    }
}

class SlidePlayer extends Player{
    constructor(playerObject,  jumpCasterFar) {
        super(playerObject, jumpCasterFar);
    }
}

class RollPlayer extends Player{
    constructor(){

    }
    movement(){
    let m = this.player.mass/300;
    let velocity = new THREE.Vector3();
    let cv = this.player.getLinearVelocity();
    
    if(moveIn && !moveOut){
        if(cv.z > 0){
            velocity.z -= 1000*m;
        }
        else if(cv.z > -50){
            velocity.z -= 100*m;
        }
    }
    else if(moveOut){
        if(cv.z < 0){
            velocity.z += 1000*m;
        }
        else if(cv.z < 50){
            velocity.z += 100*m;
        }
    }
    else{
        velocity.z = Math.floor(cv/2);
    }
    if(moveLeft && !moveRight){
        if(cv.x > 0){
            velocity.x -= 1000*m;
        }
        else if(cv.x > -50){
            velocity.x -= 100*m;
        }
    }
    else if(moveRight){
        if(cv.x < 0){
            velocity.x += 1000*m;
        }
        else if(cv.x < 50){
            velocity.x += 100*m;
        }
    }
    else{
        velocity.x = Math.floor(cv/2);
    }
    if(jump){

        let intersects = this.jumpCaster.intersectObjects( scene.children, true);
            try{
                if(intersects[0].object.parent.parent != undefined){
                    if(intersects.length >= 2){
                        velocity.y += 1000*m;
                    }
                }
                else if(intersects.length >= 1){
                    velocity.y += 1000*m;
                }
            }
            catch{
                //console.log("jump failed");
            }
    }
    let pos = new THREE.Vector3(0,2,0);

    this.player.applyImpulse(velocity,pos);
    }
}