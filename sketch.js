var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostAni = loadAnimation("ghost-standing.png", "ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
 
  createCanvas(800,700)
  tower = createSprite(400,350);
  tower.addImage(towerImg)
  tower.scale = 1.3
  tower.velocityY = 2

  doorsGroup = createGroup()
  climbersGroup = createGroup()
  invisibleBlockGroup = createGroup()

  ghost = createSprite(350,400,)
  ghost.addAnimation("jumping", ghostAni)
  ghost.scale = 0.5
  ghost.setCollider("circle", 0, 0, 100)
  
}

function draw() {
  background("black");
  
  if(gameState == "play"){
        if(tower.y > 750){
          tower.y = 350
        }
          
        spawnDoor()
      
        if(keyDown("right_arrow")){
        ghost.x = ghost.x + 2.5
        }
      
        if(keyDown("left_arrow")){
          ghost.x = ghost.x - 2.5
        }
      
        if(keyDown("space")){
        ghost.velocityY = - 7.5
        }
      
      
        // adding gravity
        ghost.velocityY = ghost.velocityY +0.5
      
        if(climbersGroup.isTouching(ghost)){
          ghost.velocityY = 0
        }
      
        if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 650){
          ghost.destroy()
          
          gameState = "end"
         
        }
        drawSprites()
  }

  if(gameState == "end"){
    textSize(60)
    fill("red")
   text("GAME OVER", 200, 250)
  }
 
  

}

function spawnDoor() {
 
  if(frameCount % 150 == 0){
   door = createSprite(Math.round(random(200,600)),-45)
   door.velocityY = 2
   door.addImage(doorImg)
   door.lifetime = 435
   doorsGroup.add(door)

   climber = createSprite(door.x, 10)
   climber.velocityY = 2
   climber.addImage(climberImg)
   climbersGroup.add(climber)
   climber.lifetime = 435

   invisibleBlock = createSprite(door.x, 10, climber.width,0.5)
   invisibleBlock.velocityY = 2
   invisibleBlockGroup.add(invisibleBlock);
   invisibleBlock.visible = true

 

   ghost.depth  = door.depth + 1 
   
  }
}