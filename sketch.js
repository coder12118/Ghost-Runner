var tower, towerImg;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var door, doorImg, doorGroup;
var block, blockGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  towerImg = loadImage("tower.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
}

function setup(){
  createCanvas(600, 600);
  
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  tower.scale = 0.9;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  blockGroup = new Group();
}



function draw(){
  background("black");
  
  if(gameState === PLAY){
    if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  } 
                                                 
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
    ghost.velocityY = ghost.velocityY + 0.8;
    
  if (tower.y > 400){
      tower.y = 300;
    }
    
    if(ghost.isTouching(climberGroup)){
      ghost.velocityY = 0;
    } 
    
    if(ghost.isTouching(blockGroup) || ghost.y > 600){
      gameState = END;
    } 
  
  spawnDoor();
  drawSprites();
  }
  
  else if(gameState === END){
    tower.velocityY = 0;
    climberGroup.destroyEach();
    blockGroup.destroyEach();
    doorGroup.destroyEach();
    textSize(20);
    fill("white");
    text("GAME OVER", 300, 300);
  }
  
  
  
  
  
  
}

function spawnDoor(){
  if(frameCount%240 === 0){
    door = createSprite(200, -50, 10, 10);
    door.addImage("door", doorImg);
    
    climber = createSprite(200, 10, 10, 10);
    climber.addImage("climber", climberImg);
    
    block = createSprite(200, 15, climber.width, 2);
    
    door.x = Math.round(random(120, 400));
    door.velocityY = 1;
    
    climber.x = door.x;
    climber.velocityY = 1;
    
    block.x = door.x;
    block.velocityY = 1;
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    climber.lifetime = 600;
    climberGroup.add(climber);
    
    door.lifetime = 600;
    doorGroup.add(door);
    
    block.lifetime = 600;
    blockGroup.add(block);
    block.debug = true;
    //block.visible = false;
    
  }
}

