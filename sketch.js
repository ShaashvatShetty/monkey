
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1
 ground=createSprite(400,350,900,10);
 
ground.velocityX=-4;
ground.x=ground.width/2;
  console.log(ground.x)
  

  obstaclesGroup = createGroup();
foodGroup = createGroup();
survivalTime =0;
  
} 


function draw() {
background(255);
  
 //spawnBanana();
  stroke("white");
  textSize(20);
  fill("white");
  text("score:" + score,500,50);
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,100,50);
 //ground.velocityX = -(5+3*score/100) 
  score=score+ Math.round(getFrameRate()/60);
  if(keyDown("space")){
    monkey.velocityY=-12
  }
  if (ground.x<0){
    ground.x = ground.width/2;
  }
  monkey.velocityY=monkey.velocityY +0.8
  
  monkey.collide(ground);
  
 spawnObstacles(); 
  spawnfood();
   drawSprites();
 if(monkey.isTouching(obstaclesGroup)){
   ground.velocityX = 0;
   monkey.velocityX = 0;
obstaclesGroup.setVelocityXEach(0);
 foodGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach (-1);
   foodGroup.setLifetimeEach(-1);
  
   if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
   }
 }
  
}
function spawnfood(){
  if(frameCount % 80===0){
    banana = createSprite(600,400,40,10);
    banana.y = random(120,200);
    banana.velocityX = -4;
    banana.lifetime = 300;
    monkey.depth = banana.depth+1;
    banana.addImage(bananaImage); 
    banana.scale = 0.1;
    foodGroup.add(banana);
  }
}
function spawnObstacles(){
   if (frameCount % 300===0){
        obstacle = createSprite(400,335,40,40);
obstacle.velocityX = -4;
obstacle.addImage("obstacle",obstacleImage);
  obstacle.scale = 0.1;
    obstacle.lifetime = 300;
     
  obstaclesGroup.add(obstacle);
   }
}




