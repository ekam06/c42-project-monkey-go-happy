
var ground
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var gameState=1

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 groundI=loadImage("base.png")
 bgI=loadImage("bg.jpg")
}



function setup() {
  createCanvas(displayWidth,displayHeight)
 
  monkey=createSprite(displayWidth/2-400,displayHeight/2-500,20,20)
  camera.position.x=monkey.x
  monkey.addAnimation('running',monkey_running)
  monkey.scale=0.1
  
 
  FoodGroup=createGroup()
 obstacleGroup=createGroup()


}

               
function draw() {
 
background(bgI)


  if(gameState===1){
  fill('black')
 

  
  ground=createSprite(0,displayHeight/2-400,displayWidth,20)
  ground.visible=false
  image(groundI,displayWidth/2-1175,displayHeight/2-410,displayWidth,20)
  ground.velocityX=-6
 // ground.x=ground.width/2-500
 // ground.addImage(groundI)
 // ground.scale=1
  ground.width=displayWidth*2
  
  if (keyDown("space")&&monkey.y>=displayHeight/2-550){
    monkey.velocityY=-20
  }
  
 monkey.velocityY=monkey.velocityY+1
  
  monkey.collide(ground)
   
//  monkey.depth=obstacleGroup.depth+1
 // console.log(monkey.depth)
         
  food()
  obstacles()
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach()
    score=score+2
    monkey.scale+=0.01
  }
  if(monkey.isTouching(obstacleGroup)){
    ground.velocityX=-6
    obstacle.velocityX=camera.position.x
    monkey.visible=false
    gameState=0
  }

  
  drawSprites()
}
  if(gameState===0){
    fill('red')                                                     
    textSize(20)
    text("Game Ended .Reload the page to play again.",displayWidth/2-600,displayHeight/2-600)
   ground.visible=false
  }
    console.log(gameState)
    
  
 
  
  fill('black')                                                     
  textSize(20)
  text('Score : '+ score,displayWidth/2-300,displayHeight/2-800)
  
  fill('black')
  textSize(20)
  survivalTime=Math.ceil(frameCount/frameRate())
  text('Survival Time ='+survivalTime,displayWidth/2-600,displayHeight/2-800)
}



function food(){
  if(frameCount%200===0){
    banana=createSprite(displayWidth-300,displayHeight/2-500,20,20)
    banana.addImage(bananaImage)
    banana.scale=0.1
    banana.y=Math.round(random(displayHeight/2-650,displayHeight/2-750))
    banana.velocityX=-2
    banana.Lifetime=displayWidth/2-300
    FoodGroup.add(banana)
  }
  
    
}

function obstacles(){
  if(frameCount%200===0){
    obstacle=createSprite(displayWidth-300,displayHeight/2-445,20,20)
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.2
    obstacle.velocityX=-3
    obstacle.Lifetime=displayWidth/2-300
    obstacleGroup.add(obstacle)
  }
  
  
  
}




