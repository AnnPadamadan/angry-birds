const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
//game objects
var box1,box2,box3,box4,box5; 
var pig1,pig3;
var log1,log3,log4,log5;
var bird, slingshot,platform;

//game sounds
var birdSelectSound,birdFlySound;

//background images
var backgroundImage;
var bg = "sprites/bg.png";


//games state
var gameState = "onSling";

//score
var score = 0;



//birds
var birds=[];
function preload() {

    getBackgroundImage();
    bgImg=loadImage(bg);

    birdFlySound=loadSound("bird_flying.mp3")
    
    birdSelectSound=loadSound("bird_select.mp3")
    
}



function setup(){
    var canvas = createCanvas(1200,400);
    canvas.position(15, 70);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird2 = new Bird(150,170);   
    bird3 = new Bird(100,170);     
    bird4 = new Bird(50,170); 

    birds.push(bird4)
    birds.push(bird3)
    birds.push(bird2)
    birds.push(bird)

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}





function draw(){
    if(backgroundImage){
        background(backgroundImage);
        
        noStroke();
        textFont("Impact")
        textSize(20)
        fill("orange")
        text("Score : " + score, width-300, 20); 
        
        if(birds.length>0){
            text("Press Space Key for Next Bird", width/2-200, 25); 
            text("Bird :  "+birds.length,width/2-100, 60)
           
        }
        else{
            text("Click on 'Reload Button' to reload the Game Level",width/2-200, 70)
        }
        
    }
    else{
        //background("lightblue");
        background(bgImg);
        noStroke();
        textFont("Impact")
        textSize(20)
        fill("orange")
        text("Score : " + score, width-300, 20); 
        
        if(birds.length>0){
            text("Press Space Key for Next Bird", width/2-200, 25); 
            text("Bird :  "+birds.length,width/2-100, 60)
            
        }
        else{
            text("Click on 'Reload Button' to reload the Game Level",width/2-200, 70)
        }

  


    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}}









function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    birdFlySound.play()
    birds.pop();
    gameState = "launched";
    return  false;
}

function keyPressed(){
    if(keyCode === 32&& gameState == "launched"){
       // slingshot.attach(bird.body);
       if(birds.length>=0 ){   
        Matter.Body.setPosition(birds[birds.length-1].body, {x: 200 , y: 50});         
        slingshot.attach(birds[birds.length-1].body);
        
        gameState = "onSling";
        birdSelectSound.play()
    }
    }
}

async function getBackgroundImage(){
var response = await fetch("http://worldtimeapi.org/timezone/America/New_York");

var responseJSON = await response.json();

var datetime = responseJSON.datetime;

var hour = datetime.slice(11,13);

if (hour>=06 && hour<=19){
    bg = "sprites/bg.png";
}

else{
    bg = "sprites/bg2.jpg";
}


backgroundImage = loadImage(bg);
}
