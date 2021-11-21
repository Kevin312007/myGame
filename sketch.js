var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bulletsGroup,zombiesGroup;
var score,direction;
var gameState;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  playerImage=loadAnimation("assets/player.png","assets/ezgif.com-gif-maker__4_-removebg-preview.png"
  ,"assets/ezgif.com-gif-maker__6_-removebg-preview.png","assets/ezgif.com-gif-maker__7_-removebg-preview.png")
  
  zombieImg=loadAnimation("assets/zombie copy.png","assets/zombie3.png")

  gameOver=loadImage("assets/gameOver.jpeg")
  


  bgImg = loadImage("assets/bg.jpeg")

  scary = loadSound("assets/scary music.mp3")
  spooky = loadSound("assets/spooky.wav")
  win = loadSound("assets/win.mp3")

  winning = loadImage("assets/winning.gif")

}

function setup() {
gameState="play"
direction=1
  
  createCanvas(windowWidth,windowHeight);
  bulletsGroup=new Group()
  zombiesGroup=new Group()

  scary.play()



  score=0
  fill("white")
  textSize(24)

  //adding the background image
  //bg = createSprite(displayWidth/2,displayHeight/2,20,20)
//bg.addImage(winning)
//bg.scale = 1.3
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addAnimation("p1",playerImage)
   player.scale = 0.7
   //player.debug = true
   //player.setCollider("rectangle",0,0,200,200)


}

function draw() {
   r=Math.round(random(1,2))
  background(bgImg); 
  
 if(gameState==="play"){
   console.log("hi")
  if(frameCount%60===0){
    zombies()
    
  }
    //moving the player up and down and making the game mobile compatible using touches
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
  player.y = player.y+30
  }

  if(keyDown("RIGHT_ARROW")||touches.length>0){
    direction=1
    player.mirrorX(-1)
    player.x = player.x+30
  }

  if(keyDown("LEFT_ARROW")||touches.length>0){
    direction=2
    player.mirrorX(1)
    player.x = player.x-30
  }
    //release bullets and change the image of shooter to shooting position when space is pressed
  if(keyWentDown("space")){
  
    bullets()
  
  }
    for(var i=0;i<zombiesGroup.length;i++){
      if(zombiesGroup.get(i)!==null&&bulletsGroup.isTouching(zombiesGroup.get(i))){
        zombiesGroup.get(i).destroy()
        score++
      }
    }
    if(zombiesGroup.isTouching(player)){
      gameState="end"
      
      spooky.play()
    }
      if(score===15){
        gameState="win"
        win.play()
      }
     } else if(gameState==="end"){
    scary.stop()
    bulletsGroup.destroyEach()
    zombiesGroup.destroyEach()
    player.destroy()
    imageMode(CENTER)
    image(gameOver,windowWidth/2,windowHeight/2)
    
    //text("GAME OVER",windowWidth/2,windowHeight/2)
 }
  else if(gameState==="win"){
  scary.stop()
  score=25
  bulletsGroup.destroyEach()
  zombiesGroup.destroyEach()
  player.destroy()
  imageMode(CENTER)
  image(winning,windowWidth/2,windowHeight/2,windowWidth,windowHeight)
  
  //text("GAME OVER",windowWidth/2,windowHeight/2)
}

 


  






drawSprites();
text("Score: "+score,displayWidth-500,50)

}

function zombies(){
  
  switch(r){
    case 1:
      zombie=createSprite(windowWidth,random(windowHeight/8,windowHeight-100))
      zombie.velocityX=random(-5,-9)
      break;
    case 2:
      zombie=createSprite(0,random(windowHeight/8,windowHeight-100))
      zombie.velocityX=random(5,9)
      zombie.mirrorX(-1)
      
  }
  
  zombie.addAnimation("creepy",zombieImg)
  
  zombie.lifetime=windowWidth/3
  zombiesGroup.add(zombie)


}

function bullets(){
  
  
  switch(direction){
    case 1:
      bullet=createSprite(player.x+50,player.y-50,20,7)
      bullet.velocityX=4;

      break;
    case 2:
      bullet=createSprite(player.x-50,player.y-50,20,7)
      bullet.velocityX=-4;
  }
  bullet.shapeColor="red"
  //bullet.velocityX=4
  bullet.lifetime=windowWidth/4
  bulletsGroup.add(bullet)


}
