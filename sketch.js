//game states
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//variables of monkey
var monkey, monkey_running, monkeyhit;

//banana
var banana, ibanana, bananaGroup;
var ban1, ban2, iban1, iban2;

//obstacles
var obstacle, obstacleImage, obstacleGroup;

//score
var score;

//background jungle
var back, iback;

//invisible ground
var ig;

//crate
var oc, ioc;

//reset button
var reset, ireset, bluffreset;

//sounds
var backsound;



function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  ibanana = loadImage("banana.png");
  iobstacle = loadImage("obstacle.png");

  iback = loadImage("back.png");

  ioc = loadImage("crate.png");

  monkeyhit = loadImage("sprite_0.png");

  ireset = loadImage("restart.png");

  iban1 = loadImage("ban1.png");
  iban2 = loadImage("ban2.png");







}



function setup() {
  createCanvas(600, 200);


  monkey = createSprite(30, 170);
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("hit", monkeyhit);
  monkey.scale = 0.1;

  back = createSprite(300, 100);
  back.addImage("background", iback);
  back.scale = 2;


  bluffreset = createSprite(300, 130, 100, 30);

  ig = createSprite(50, 207, 100, 10);

  ocGroup = createGroup();
  obstacleGroup = createGroup();
  bananaGroup = createGroup();

  reset = createSprite(300, 100);
  reset.addImage("reset button", ireset);



}


function draw() {

  background(180);



  // adjusting depth
  monkey.depth = back.depth + 1;


  //giving collidation
  monkey.collide(ig);









  if (gameState === PLAY) {




    reset.visible = false;
    bluffreset.visible = false;


    //giving jump and gravity effect
    if (keyDown("space") && monkey.y >= 159) {

      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    
    //velocity of ground
    back.velocityX = -3;


    //giving looped ground
    if (back.x < 0) {

      back.x = back.width / 2;
    }
      //giving touched obstacle
      if (obstacleGroup.isTouching(monkey)) {

        gameState = END;
        monkey.changeAnimation("hit", monkeyhit);

      }

     //giving touched obstacle
      if (ocGroup.isTouching(monkey)) {

        gameState = END;
        monkey.changeAnimation("hit", monkeyhit);

      }
    




  spawnFood();

  spwanObstacles();

  spawnCrate();



   if(bananaGroup.isTouching (monkey)){
      
      bananaGroup.destroyEach();
      
      
      }






    

  } else if (gameState === END) {

    back.velocityX = 0;

    //visibility of reset button
    reset.visible = true;
    bluffreset.visible = true;


    obstacleGroup.setLifetimeEach(-1);
    //bananaGroup.setLifetimeEach(-1);
    ocGroup.setLifetimeEach(-1);

    //stopping hurdles
    obstacleGroup.setVelocityXEach(0);
    ocGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

    if (mousePressedOver(reset)) {
      reseter();
    }


  }

  monkey.setCollider("circle", 0, 0, 300);









  drawSprites();
}

function reseter() {


  gameState = PLAY;

  //destroying clouds to mave trex 
  ocGroup.destroyEach();
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();

  //running monkey
  monkey.changeAnimation("monkey", monkey_running);




}









function spwanObstacles() {

  if (frameCount % 100 === 0) {
    var obstacle = createSprite(600, 175);
    obstacle.addImage("obstacles", iobstacle);
    obstacle.velocityX = -6;
    obstacle.scale = 0.15;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 100;

    obstacle.setCollider("circle",0,0,180);
    
  }
}


function spawnCrate() {

  if (frameCount % 150 === 0) {
    var oc = createSprite(600, 175);
    oc.addImage("fruit crate", ioc);
    oc.velocityX = -6;
    oc.scale = 0.15;
    ocGroup.add(oc);
    oc.lifetime = 100;

  }
}



function spawnFood() {

  if (frameCount % 120 === 0) {
    var banana = createSprite(600, 100);
    banana.y = Math.round(random(80, 120));
    banana.addImage("food", ibanana);
    banana.velocityX = -6;
    banana.scale = 0.06;
    bananaGroup.add(banana);
    reset.depth =  banana.depth + 1
    banana.lifetime = 100;

  }
}

