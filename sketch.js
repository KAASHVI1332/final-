var back,backimg;
var g1,g2,g3,ghost;
var girl,girlan;
var ground;
var END=0;
var PLAY=1;
var gameState=PLAY;
var standing;
var score=0;
function preload(){
 backimg=loadImage("wall.jpg");
 g1=loadImage("g1.png");
 g2=loadImage("g2.png");
 g3=loadImage("g3.png");
 girlan=loadAnimation("1.png","2.png","3.png","4.png");
 standing=loadAnimation("1.png");

}
function setup() {
  createCanvas(displayWidth,displayHeight);
  back=createSprite(displayWidth/2,displayHeight/2);
  back.addImage(backimg);
 // back.scale=0.85;
back.velocityX=-3;
ghostGroup=new Group();
girl=createSprite(200,600,20,20);
girl.addAnimation("running",girlan);
girl.scale=0.5;


ground=createSprite(displayWidth/2,displayHeight-10,displayWidth,35);
ground.shapeColor="brown";

}

function draw() {
  background(200);
  girl.collide(ground);
  if (back.x < 500){
    back.x = back.width/2;
  }
//
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
   
    if(keyDown("space") && girl.y >= 159) {
      girl.velocityY = -20;
    }
    girl.velocityY = girl.velocityY + 2
   
    spawnObstacles();

    if(ghostGroup.isTouching(girl)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    girl.addAnimation("GIRLSTANDING",standing);
    girl.changeAnimation("GIRLSTANDING");
    back.velocityX=0;
   
    }

    drawSprites();
    textSize(30);
    fill("white");
    text("Score:"+score,100,100);

    if(gameState===END){
      textSize(50);
      fill("white");
      text("GAMEOVER",200,200);
    }
  }
  
  
 
  



function spawnObstacles() {
  if(frameCount % 100 === 0) {
    ghost=createSprite(displayWidth/2,displayHeight-150,20,20);
    //obstacle.debug = true;
    ghost.velocityX = -6 
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: ghost.addImage(g1);
              break;
      case 2: ghost.addImage(g2);
              break;
      case 3: ghost.addImage(g3);
              break;
      default: break;
    }
    //assign scale and lifetime to the obstacle           
    ghost.scale = 0.5;
    ghost.lifetime = 300;
    //add each obstacle to the group
    ghostGroup.add(ghost);
  }
}
