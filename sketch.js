const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
let bg;
let g ;
var astro , asImg;
var stImg , stImg2 , stImg3;
var gameState = 1;// 0 means pause , 1 means play, 2 means end 
var stoneGroup;
var rewardImg;
var rwdgroup;
var count = 0;
var starImg;
var starSound;
var score , scoreImg ,scoreImg2; 
function preload()
{
 bg = loadImage("image/bg4.jpg");
 asImg = loadImage("image/astronaut.png");
 stImg = loadImage("image/stone.png");
 stImg2 = loadImage("image/stone2.png");
 stImg3 = loadImage("image/stone3.png");
 rewardImg = loadImage("image/reward.png");
 starImg = loadImage("image/star.png")
 starSound = loadSound("image/starSound.wav");
 scoreImg = loadImage("image/empty.png");
 scoreImg2 = loadImage("image/one_star.png");
 scoreImg3 = loadImage("image/stars.png");
}

function setup() {
 createCanvas(1200,500);
  
 astro = createSprite(100,400,50,50);
 astro.addImage(asImg) ;
 astro.scale = 0.08;
 astro.debug = true;

 score = createSprite(1000,50,100,50);
 score.addImage(scoreImg3);
 score.addImage(scoreImg2);
 score.addImage(scoreImg);
 score.changeImage(scoreImg);
 score.scale = 0.5
 stoneGroup = new Group() 
 rwdgroup = new Group();
}

function draw() 
{
  background(bg);
  if(gameState === 1 ){

    if (keyDown ("space")){
  astro.velocityY = -5;
}

if (keyDown (LEFT_ARROW)){
  astro.velocityX = -5;
}

if (keyDown (RIGHT_ARROW)){
  astro.velocityX = 5;
}
  
  astro.velocityY += 0.08;
  if(stoneGroup.isTouching(astro)){
    astro.velocityY = 0;
  }

  if(rwdgroup.isTouching(astro)){
    starSound.play();
    rwdgroup.destroyEach();
    count ++;
    console.log(count)
  }

  reward() ;
  stone() ;

}
if(count === 1 ){
  score.addImage(scoreImg2);
}

if(count === 2 ){
    gameState = 0;
}



if(gameState === 0){

  astro.setVelocity(0,0) ;
  stoneGroup.setVelocityEach(0,0);
  text("our solar system has 8 planets",500,250);
  count  = 0 ;
  if(keyDown("space")){
    gameState = 1;
  } 
}
   if(astro.y>450 || astro.x>1100){
       astro.x = 100;
       astro.y = 400;
    }


  drawSprites();
}

function stone() {
if (frameCount % 200 === 0){
  var  x  = Math.round(random(1,3))    ;
  console.log(x+ "this is the value of x");
  var st = createSprite(1200,450,50,50);
  st.velocityX = -2;
  switch(x){
    case 1 : 
    st.addImage(stImg);
    break ; 
    
    case 2 :
    st.addImage(stImg2)  ;
    break ; 

    case 3: 
    st.addImage(stImg3);
    break; 
}
  
  st.scale  = 0.08;
  st.debug = true;
  st.setCollider("rectangle",0,0,50,50)
  stoneGroup.add(st) ;
  }
}

function reward(){
if(frameCount % 800 === 0){
  var y = Math.round(random(100,200))
 var rwd = createSprite(1200,y,50,50);
 rwd.velocityX = -3;
 rwd.addImage(starImg);
 rwd.scale = 0.08 ; 
 rwdgroup.add(rwd);
}
}