
var userCar, wallL, wallR, obs;
var obs_group;
var obs1, obs2, obs3, obs4;

var myCar;


var start = 0;
var play = 1;
var end = 2;

var bg, bg_image;

var distance = 0;

var gameOver, gameOverImage;


var gameState = start;

var rand;



function preload(){
    obs1 = loadImage("car1.png");
    obs2 = loadImage("car2.png");
    obs3 = loadImage("car3.png");
    obs4 = loadImage("car4.png");

    myCar = loadImage("myCar.png");
    
    gameOverImage = loadImage("gameOver.png");

    bg_image = loadImage("road.jpg");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    userCar = createSprite(width/2, height/2, 30,30)

    wallL = createSprite(width-width+450, height/2, 20,height)
    wallR = createSprite(width-790, height/2, 20,height)

    bg = createSprite(680,200,10,10);
    bg.addImage(bg_image)
    bg.scale = 3.5;
    bg.depth = userCar.depth-1;

    gameOver = createSprite(width/2-300, height/2-300, 70,20)
    gameOver.addImage(gameOverImage);
    gameOver.visible = false;
    
    userCar.addImage(myCar);
    userCar.scale = 0.1;
    

    obs_group = createGroup();
}

function draw() {
    background('white');
    fill('yellow')
    drawSprites();
    userCar.collide(wallL);
    userCar.collide(wallR);
    textSize(18)
    text("Distance: " + distance, wallR.x-130, height-(height-30))
    
    
    if(bg.y > 500){
        bg.y = 200;
    }

    if(gameState===start){
        textSize(30);
        text("Use arrow keys to play \n Press space to start", width/2-300,300)
        if(keyWentDown("space")){
            gameState = play;
        }
    }
    
    
    if(gameState===play){

    gameOver.visible = false;

    bg.velocityY = 7;
    
    if(frameCount % 2 === 0){
        distance = distance+1;
    }

    if(keyDown("left")){
        userCar.x = userCar.x-5;
    }
    if(keyDown("right")){
        userCar.x = userCar.x+5;
    }
    if(keyDown("up")){
        userCar.y = userCar.y-5;
    }
    if(keyDown("down")){
        userCar.y = userCar.y+5;
    }

    if(frameCount % 10 === 0){
        rand = Math.round(random(wallL.x+23,wallR.x-23));
        spawnObs();
    }
    
    if(userCar.isTouching(obs_group) || userCar.isTouching(wallL) || userCar.isTouching(wallR)){
        gameState = end;
    }

    }

    if(gameState===end){
        // obs_group.setVelocityYEach(0);
        // userCar.velocityY = 0;
        obs_group.destroyEach();
        bg.velocityY = 0;
        textSize(30)
        gameOver.visible = true;
        text("Press space to restart", width/2-250, height-(height-160));
        if(keyWentDown("space")){
            userCar.x = width/2;
            userCar.y = height/2;
            distance = 0;
            gameState = play;
        }
    }

}

function spawnObs() {

    var animRand = Math.round(random(1,4))

    obs = createSprite(rand,0,20,20);
    obs.scale = 0.08;
    obs.velocityY = 7;
    obs.lifetime = height/3;

    switch (animRand) {
        case 1:
            obs.addImage(obs1)
            obs.scale = 0.15;
            break;
        case 2:
            obs.addImage(obs2)
            break;
        case 3:
            obs.addImage(obs3)
            obs.scale = 0.15;
            break;
        case 4:
            obs.addImage(obs4)
            obs.scale = 0.1;
            break;
        default:
            break;
    }
    obs_group.add(obs);
}
