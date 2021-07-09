var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;
var a1,a2,a3,car;
var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.jpg");
  car1 = loadImage("images/c1.png")
  car2 = loadImage("images/car5.png")
  car3 = loadImage("images/car6.png")
  gameOverImg = loadImage("images/gameOver.png");
  horn = loadSound("car horn.mp3")
  engine = loadSound("hehe.mp3")
  restart = loadImage("images/RESTART.jpg")
  //nos = loadImage("images/boost.png")
}

function setup(){
 engine.loop();
 
  createCanvas(1536, 752);
  // Moving background
path=createSprite(100,380);
path.addImage(pathImg);

//creating boy running
car = createSprite(200,380)
car.addImage(car1)
car.scale = 0.4


/*nitro = createSprite(40,380)
nitro.addImage(nos)
nitro.scale = 0.2
nitro.visible = 0
*/
wall = createSprite(750,700,10000)
wall.visible = 0
wall1 = createSprite(750,50,10000)
wall1.visible = 0

r = createSprite(750,500);
r.addImage(restart);
r.scale = 0.8;
r.visible = false;

gameOver = createSprite(750,250);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
bot1 = new Group();
bot2 = new Group();
bot3 = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(40);
  fill("white");
  stroke(4) 
  text("METRES YOU DROVE =  "+ distance,500,30);
  text("🏎TIP: PRESS SPACE FOR HORN & ⬆ for Nitro🏎",350,100)
  path.velocityX = -(6 + 4*distance/150);
  car.collide(wall)
  car.collide(wall1)
  if(gameState===PLAY){
    //nitro.y = car.y
    path.velocityX = -9;

  
  bot1.collide(bot2 && bot3)
  bot2.collide(bot1 && bot2)



  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/1;
  }
  
  //code to play cycle bell sound
   if(keyDown("LEFT_ARROW")|| keyDown("W")){
     car.y = car.y - 6
   }
   if(keyDown("RIGHT_ARROW") || keyDown("S")){
    car.y = car.y + 6
  }
  if(keyDown("space")){
    horn.play()
  }

  if(keyDown("UP")){
   // nitro.visible = 1
    path.velocityX = -9*9
  }else{
    path.velocityX = -50
    //nitro.visible = 0

  }
  distance = distance + Math.round(getFrameRate()/50);


  //creating continous opponent players
  if(frameCount % 200 == 0){
    c1();
  }  
  if(frameCount % 300 == 0){
    c2();
  }

  if(car.isTouching(bot1)){
    gameState = END
  }
  if(car.isTouching(bot2)){
    gameState = END
  }

}else if (gameState === END) {
    gameOver.visible = true;
    r.visible = true;

  
    path.velocityX = 0;

   
  
    bot1.setVelocityXEach(0);
  
    bot2.setVelocityXEach(0);
  
    bot3.setVelocityXEach(0);
    
    if(mousePressedOver(r)) {
      reset();
    }
}
}
function c1(){
  a1 = createSprite(1500,random(100,400))
  a1.addImage(car2);
  a1.scale = 0.4
  a1.velocityX = -7
  a1.collide(wall)
  a1.collide(wall1)
  a1.lifetime = 400
  bot1.add(a1);

}
function c2(){
  a2 = createSprite(1500,random(400,600))
  a2.addImage(car3);
  a2.scale = 0.5
  a2.velocityX = -6
  a2.collide(wall)
  a2.collide(wall1)
  a2.lifetime = 400
  bot1.add(a2);

}




function reset(){
  gameState = PLAY;
  r.visible = false;
  gameOver.visible = false;

  
  bot1.destroyEach();
  bot2.destroyEach();
  bot3.destroyEach();
  
  distance = 0;
}