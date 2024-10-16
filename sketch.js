/*

The Game - // This code was created during the course "CM1005 Introduction to Programming 1" by Coursera University of London
//Professor Simon and Edward 6/2024 - 9/2024 
Scott Guinto STUDENT 
*/


var gameChar_x;
var gameChar_y;
var floorPos_y;
var cameraPosX;
var locator_x;
var isLeft;
var isRight;
var isPlummeting;
var isFalling;
var canyons;
var collectables;
var game_score;
var flagpole;
var lives;
var trees_x;
var treePos_y;
var cloudPos_y;
var clouds;
var mountainPos_y;
var mountain_x;
var jumpSound;
var platforms;
var enemies;

function preload()
{
    soundFormats('mp3','wav');  
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
}


function setup()
{
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
	lives = 3;
    startGame();
}

function draw()
{      
//sky
	background(100,155,255);
	noStroke();
	fill(0,155,0);
//green floor
    rect(0, floorPos_y, width, height - floorPos_y);    

//side scrolling 
    push();  //start translate
    translate(cameraPosX, 0);

// lives
    checkPlayerDie();
    
//the following 12 lines of code were created during course session, 
//Lesson 10 "Project Part4: Side Scrolling","Project Part5: Multiple Interactables" by Coursera University of London
//Professor Simon and Edward 6/2024 - 9/2024 
    
//clouds
    drawClouds();

//mountains
    drawMountains();
    
//trees
    drawTrees();
    
//platforms
 for (var i = 0; i < platforms.length; i++)  
    {
       platforms[i].draw();
    }   
//collectable
 for (var i = 0; i < collectables.length; i++)
      {
          if(!collectables[i].isFound)
              {
                  drawCollectable(collectables[i]);
                  checkCollectable(collectables[i]);
              }  
      }

//canyon
for(var i = 0; i < canyons.length; i++)
    {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }  
    
//flag    
renderFlagpole();

    
//enemy
for (var i=0; i < enemies.length; i++)
    {
        enemies[i].draw();
    }
//side scroll
pop();   
    
//the following 3 lines of code were created during course session, 
//Lesson 6.0 "Project Part6: Game Mechanics" by Coursera Goldsmiths University of London
//Professor Simon and Edward 7/2024     
fill(255,0,0,70);
stroke(0,0,0);
textSize(16);
text("Score: " + game_score, 20, 20); 
text("Player Lives: " + lives, 20, 40);

//the character
//jump left
	if(isLeft && isFalling)
	{       //torso and arms
            stroke (1);
            fill(0,102,104);
            rect(gameChar_x - 9, gameChar_y - 35, 16, 20);   
            rect(gameChar_x - 5, gameChar_y - 35, 8, 8);
            rect(gameChar_x -12, gameChar_y - 35, 8, 8);
            //pants and feet
            fill(0,0,0);
            rect(gameChar_x - 11,gameChar_y - 8, 8, 10);   
            rect(gameChar_x + 1, gameChar_y - 8, 8, 10);  
            rect(gameChar_x - 10, gameChar_y - 16, 18, 9);  
            //head torso
            fill(200,100,100);
            stroke (1);
            ellipse(gameChar_x -1, gameChar_y - 52, 30);
            rect(gameChar_x - 20, gameChar_y - 37, 10, 6); 
            // eyes
            fill(255,255,255);
            stroke (1);
            ellipse(gameChar_x, gameChar_y - 53, 5);
            ellipse(gameChar_x -12, gameChar_y - 53, 5);
            fill(0,0,0);
            ellipse(gameChar_x - 1, gameChar_y - 53, 2);
            ellipse(gameChar_x - 13, gameChar_y - 53, 2);
            ellipse(gameChar_x - 7, gameChar_y - 45, 2);
            stroke (1);
            fill(0,102,104);
            rect(gameChar_x - 9, gameChar_y - 35, 16, 20); 
            //back arm 
            stroke (1);
            fill(0,102,104);
            rect(gameChar_x - 9, gameChar_y - 35, 16, 20);   
            rect(gameChar_x +6, gameChar_y - 35, 8, 8);
            fill(200,100,100);
            stroke (1);
            rect(gameChar_x +2, gameChar_y - 30, 12, 8);
	}
    
// jump right
	else if(isRight && isFalling)
       
	{       //torso and arms
            stroke (1);
            fill(0,102,104);
            rect(gameChar_x - 9, gameChar_y - 35, 16, 20);   
            rect(gameChar_x + 3, gameChar_y - 35, 8, 8);

            //pants and feet
            fill(0,0,0);
            rect(gameChar_x - 11,gameChar_y - 8, 8, 10);   
            rect(gameChar_x + 1, gameChar_y - 8, 8, 10);  
            rect(gameChar_x - 10, gameChar_y - 16, 18, 9);  

            //head torso
            fill(200,100,100);
            stroke (1);
            ellipse(gameChar_x -1, gameChar_y - 52, 30);
            rect(gameChar_x + 12, gameChar_y - 38, 9, 6); 
            // eyes
            fill(255,255,255);
            stroke (1);
            ellipse(gameChar_x + 7, gameChar_y - 53, 5);
            ellipse(gameChar_x - 6, gameChar_y - 53, 5);
            fill(0,0,0);
            ellipse(gameChar_x + 8, gameChar_y - 53, 2);
            ellipse(gameChar_x - 5, gameChar_y - 53, 2);
            ellipse(gameChar_x + 2, gameChar_y - 45, 2);
            stroke (1);
            fill(0,102,104);
            rect(gameChar_x - 9, gameChar_y - 35, 16, 20); 
            //back arm 
            stroke (1);
            fill(0,102,104);  
            rect(gameChar_x -15, gameChar_y - 35, 8, 8);
            fill(200,100,100);
            stroke (1);
            rect(gameChar_x -15,gameChar_y - 30, 12, 8);
	}
// walk left
	else if(isLeft)
	{
            stroke (1);
            fill(0,102,104);
            rect(gameChar_x - 9, gameChar_y - 35, 16, 20);   
            rect(gameChar_x - 5, gameChar_y - 35, 8, 8);
            rect(gameChar_x -12, gameChar_y - 35, 8, 8);
            //pants and feet
            fill(0,0,0);
            rect(gameChar_x - 11,gameChar_y - 8, 8, 8);   
            rect(gameChar_x + 1, gameChar_y - 8, 8, 8);  
            rect(gameChar_x - 10, gameChar_y - 16, 18, 9);  
            //head torso
            fill(200,100,100);
            stroke (1);
            ellipse(gameChar_x -1, gameChar_y - 50, 30);
            rect(gameChar_x - 12, gameChar_y - 30, 8, 12); 
            // eyes
            fill(255,255,255);
            stroke (1);
            ellipse(gameChar_x, gameChar_y - 53, 5);
            ellipse(gameChar_x -12, gameChar_y - 53, 5);
            fill(0,0,0);
            ellipse(gameChar_x - 1, gameChar_y - 53, 2);
            ellipse(gameChar_x - 13, gameChar_y - 53, 2);
            ellipse(gameChar_x - 7, gameChar_y - 45, 2);
            stroke (1);
            fill(0,102,104);
            rect(gameChar_x - 9, gameChar_y - 35, 16, 20); 
            //back arm 
            stroke (1);
            fill(0,102,104);
            rect(gameChar_x - 9, gameChar_y - 35, 16, 20);   
            rect(gameChar_x +6, gameChar_y - 35, 8, 8);
            fill(200,100,100);
            stroke (1);
            rect(gameChar_x +6, gameChar_y - 30, 8, 12);
    }
// walk right
	else if(isRight)  
	{
            stroke (1);
            fill(0,102,104);
            rect(gameChar_x - 9, gameChar_y - 35, 16, 20);   
            rect(gameChar_x + 3, gameChar_y - 35, 8, 8);
            //pants and feet
            fill(0,0,0);
            rect(gameChar_x - 11,gameChar_y - 8, 8, 8);   
            rect(gameChar_x + 1, gameChar_y - 8, 8, 8);  
            rect(gameChar_x - 10, gameChar_y - 16, 18, 9);  
            //head torso
            fill(200,100,100);
            stroke (1);
            ellipse(gameChar_x -1, gameChar_y - 50, 30);
            rect(gameChar_x + 3, gameChar_y - 30, 8, 12); 
            // eyes
            fill(255,255,255);
            stroke (1);
            ellipse(gameChar_x + 7, gameChar_y - 53, 5);
            ellipse(gameChar_x - 6, gameChar_y - 53, 5);
            fill(0,0,0);
            ellipse(gameChar_x + 8, gameChar_y - 53, 2);
            ellipse(gameChar_x - 5, gameChar_y - 53, 2);
            ellipse(gameChar_x + 2, gameChar_y - 45, 2);
            stroke (1);
            fill(0,102,104);
            rect(gameChar_x - 9, gameChar_y - 35, 16, 20); 
            //back arm 
            stroke (1);
            fill(0,102,104);  
            rect(gameChar_x -15, gameChar_y - 35, 8, 8);
            fill(200,100,100);
            stroke (1);
            rect(gameChar_x -15,gameChar_y - 30, 8, 12);
    }
// jump forward
	else if(isFalling || isPlummeting)     
	{
    
            stroke(1);
            fill(200,100,100);
            ellipse(gameChar_x -1, gameChar_y - 52, 30);
            rect(gameChar_x + 12, gameChar_y - 30, 8, 8);
            rect(gameChar_x - 19, gameChar_y - 30, 8, 8); 
            fill(200,110,100);
            //eyes and mouth
            fill(255,255,255);
            stroke (1);
            ellipse(gameChar_x +3, gameChar_y - 55, 5);
            ellipse(gameChar_x -5, gameChar_y - 55, 5);
            ellipse(gameChar_x -1, gameChar_y - 43, 4);  
            fill(0,0,0);
            ellipse(gameChar_x +3, gameChar_y - 53, 2);
            ellipse(gameChar_x -5, gameChar_y - 53, 2);
            //torso and arms
            stroke (1);
            fill(0,102,104);
            rect(gameChar_x - 9, gameChar_y - 35, 16, 20);   
            rect(gameChar_x + 7, gameChar_y - 35, 8, 8);
            rect(gameChar_x - 16, gameChar_y - 35, 8, 8);   
            //pants and feet
            fill(0,0,0);
            rect(gameChar_x - 11,gameChar_y - 6, 8, 8);   
            rect(gameChar_x + 1, gameChar_y - 6, 8, 8);  
            rect(gameChar_x - 10, gameChar_y - 16, 18, 9);  
	}
// stand forward
	else  
	{
            fill(200,100,100);
            stroke (1);
            ellipse(gameChar_x -1, gameChar_y - 50, 30);
            rect(gameChar_x + 7, gameChar_y - 30, 8, 12);
            rect(gameChar_x - 16, gameChar_y - 30, 8, 12);
            fill(255,255,255);
            //eyes and mouth
            stroke (1);
            ellipse(gameChar_x +3, gameChar_y - 53, 5);
            ellipse(gameChar_x -5, gameChar_y - 53, 5);
            fill(0,0,0);
            rect(gameChar_x -3, gameChar_y - 43, 3,1);
            ellipse(gameChar_x +3, gameChar_y - 53, 2);
            ellipse(gameChar_x -5, gameChar_y - 53, 2);
            //torso and arms
            fill(0,102,104);
            rect(gameChar_x - 9, gameChar_y - 35, 16, 20);   
            rect(gameChar_x + 7, gameChar_y - 35, 8, 8);
            rect(gameChar_x - 16, gameChar_y - 35, 8, 8);
            //pants and feet
            fill(0,0,0);
            rect(gameChar_x - 11,gameChar_y - 8, 8, 8);   
            rect(gameChar_x + 1, gameChar_y - 8, 8, 8);  
            rect(gameChar_x - 10, gameChar_y - 16, 18, 9);  
	}

//the following 8 lines of code was created during course session, 
//Lesson 4.4 "Game Project 3a - interaction with the game character" by Coursera University of London
//Professor Simon and Edward 6/2024   
    
// character movement
if(isLeft)
    {
        if(gameChar_x > width * .2)
            {
                gameChar_x -= 5;
            }
        else
            {
                cameraPosX += 5;
            }
    }
    
if(isRight)
    {
        if(gameChar_x < width * .8)
            {
                gameChar_x += 5;
            }
        else
            {
                cameraPosX -= 5;
            }
    }

// vertical movement 
if(gameChar_y <  floorPos_y)
    {  
        var isContact = false;
        for(var i = 0; i < platforms.length; i ++)
           {
               
              if(platforms[i].checkContact(locator_x, gameChar_y) == true)
                  {
                      isContact = true;
                      break;
                  }
           }
        if(isContact == false)
                    {
                        gameChar_y += 2;
                       isFalling = true;
                    }
    }
    else   
      {
      isFalling = false;
      }

if(isPlummeting)
    {
        gameChar_y +=5;
    }
    
    
 
//flag interaction
//the following lines of code were created during course session, 
//Lesson 6.0 "Project Part6: Game Mechanics" by Coursera Goldsmiths University of London
//Professor Simon and Edward 6/2024 
    
if(flagpole.isReached == false)
    {
        checkFlagpole();
    }
    
if(flagpole.isReached == true)
    {
        fill(255,105,224,100);
        textSize(25);
        text("Level Complete. Press space to continue.", height / 2, width / 2);
    }
    
///enemy
for(var i = 0; i < enemies.length; i++)
    {
        enemies[i].draw();
        
        var isContact = enemies[i].checkContact(locator_x, gameChar_y)
        if (isContact)
            {
                if(lives > 0)
                {
                    startGame();
                    break;
                }
                
            }
    }
    
locator_x = gameChar_x - cameraPosX;

}

//the following functions KeyPressed and KeyReleased were created during course session, 
//Lesson 4.4 "Game Project 3a - interaction with the game character" by Coursera University of London
//Professor Simon and Edward 6/2024   

function keyPressed()
{  
    if(keyCode == 37)
    {
        isLeft = true;
    }
    if(keyCode == 65)
    {
        isLeft = true;
    }
    if(keyCode == 39)
    {
        isRight = true;
    }
    if(keyCode == 68)
    {
        isRight = true;
    }
    if(keyCode == 87)
    {
        gameChar_y -= 60;   
        jumpSound.play();   
    }
    if(keyCode == 38)
    {
        gameChar_y -= 60;
        jumpSound.play();      
    }
}

function keyReleased()
{ 
    if(keyCode == 37)
    {
        isLeft = false;
    }
    if(keyCode == 65)
    {
        isLeft = false;
    }
    if(keyCode == 39)
    {
        isRight = false;
    }
    if(keyCode == 68)
    {
        isRight = false;
    }    
}

function drawClouds()
{
         for(var i = 0; i < clouds.length; i++)
         {     
         noStroke(); 
         fill(255,255,255);
         ellipse(clouds[i] + 385,cloudPos_y - 177,80,75);
         ellipse(clouds[i] + 430,cloudPos_y - 160,90,95);
         ellipse(clouds[i] + 330,cloudPos_y -165,80,80);
         ellipse(clouds[i] + 375,cloudPos_y -140,50,50); 
         fill(192,192,192,220);
         ellipse(clouds[i] + 290,cloudPos_y - 267,90,75);
         ellipse(clouds[i] + 335,cloudPos_y - 250,60,65);
         ellipse(clouds[i] + 200,cloudPos_y -255,90,80);
         ellipse(clouds[i] + 255,cloudPos_y -240,35,25); 
         }
}

function drawMountains()
{
        for(var i = 0; i < mountains.length; i++)
        {
        fill(173,255,47);        
        triangle(mountains[i] - 200,mountainPos_y,mountains[i]  - 320, mountainPos_y + 142, mountains[i], mountainPos_y + 142);
        fill(107,142,35);
        triangle(mountains[i] - 100,mountainPos_y - 100,mountains[i] - 10, mountainPos_y + 142, mountains[i] - 130, mountainPos_y + 142);   
        fill(128);
        triangle(mountains[i] - 10,mountainPos_y + 142,mountains[i]- 230, mountainPos_y + 142, mountains[i]-175, mountainPos_y + 80);
        }
}

function drawTrees()
{
//the following 8 lines of code were created during course session, 
//Lesson 3.5 "Game project part 2b: using variables"
//Lesson 5.5 "Project Part4: Side Scrolling" by Coursera Goldsmiths University of London
//Lesson 6.0 "Project Part6: Game Mechanics" by Coursera Goldsmiths University of London
//Professor Simon and Edward 6/2024 
    for(var i = 0; i < trees_x.length; i++)
        {
        fill(120,100,40);
        rect(trees_x[i] + 10,treePos_y - 2, 40, 145);
        fill(0,155,0);
        triangle(trees_x[i] -50, treePos_y, trees_x[i] + 30, treePos_y - 100, trees_x[i] +110, treePos_y);
        triangle(trees_x[i] -50, treePos_y + 50 , trees_x[i] + 30, treePos_y - 50, trees_x[i] + 110, treePos_y + 50);
        }
}

function checkCollectable(t_collectable)
{
        if(dist(locator_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 70)
        {
           t_collectable.isFound = true;
            game_score += 1;
        }
}

function drawCollectable(t_collectable)
{
        
        if(t_collectable.isFound == false)
    {
        fill(255,215,0);
        stroke(1); 
        ellipse(t_collectable.x_pos, t_collectable.y_pos,27,27);
        fill(255,0,107);
        ellipse(t_collectable.x_pos, t_collectable.y_pos,17,17);
    }
}


function drawCanyon(t_canyon)
{
        stroke(1);
        fill(0);
        rect(t_canyon.x_pos,t_canyon.y_pos, 111, 145);
        fill(205,133,63); 
}


function checkCanyon(t_canyon)
{
        if
        (locator_x > t_canyon.x_pos && locator_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y)     
        {
          isPlummeting = true; 
        }
        else 
        {
          isPlummeting = false;
        }
        
        if (isPlummeting)
            {
            gameChar_y += 10000;
            isRight = false;
            isLeft = false;
            lives -= 1;
            gameChar_x = width/2;
            gameChar_y = 432;
            }
}

function renderFlagpole()
{  
    push();
    strokeWeight(5);
    stroke(200);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 300);
    fill(255,255,20);
    noStroke();
    
    if(flagpole.isReached)
    {
        rect(flagpole.x_pos, floorPos_y - 300, 80,40);
    }
       else 
    {
    
        rect(flagpole.x_pos, floorPos_y - 50, 80,40);
    }
    
    pop();
}

//the following function createPlatforms was created during course session, 
//Lesson 10.3 "Creating enemies with constrictor functions" by Coursera University of London
//Professor Simon and Edward 8/2024   
function createPlatforms(x, y, length)
{
     var p = {
         x: x,
         y: y,
         length: length,
         draw: function(){
             fill(160,82,45);
             stroke(0,0,0);
             rect(this.x, this.y, this.length, 12);
            },
         checkContact: function(gameChar_x, gameChar_y)
         {
         
         if(gameChar_x > this.x && gameChar_x < this.x + this.length)
                {
                    var d = this.y - gameChar_y;
                    if (d >=0 && d < 5)
                        {
                            return true;
                        }
                }
         return false;
         }
     
     }
     return p;
}

function checkFlagpole()
{
    var d = abs(locator_x - flagpole.x_pos);
    
    if(d < 20)
        {
            flagpole.isReached = true;
        }
}


function checkPlayerDie()
{
    if(lives < 1)
        {
        fill(255,255,010);
        textSize(25);
        text("Game Over. Press space to continue.", height / 2, width / 2);
        return;
        }
}
function startGame()
{
   gameChar_x = width/2;
   gameChar_y = 432;
    isLeft = false;
    isRight = false;
    isPlummeting = false;
    isFalling = false;
    
    trees_x = [250,440,650,1700,1925,2400,3200];
    treePos_y = floorPos_y -142;
    cloudPos_y = floorPos_y -200;
    cloudPos_x = -100;
    clouds = [75,350,600,700,950,1100,1450,1800,2275,2700];

    mountainPos_y = floorPos_y -142;
    mountainPos_x = 400;
    mountains = [160,600,1200,1750,2300,2690,3100];
    cameraPosX = 0;
    
    enemies = [];
    enemies.push(new Enemy(100, floorPos_y -10, 100));
    
    
    collectables = [{x_pos: 990, y_pos: floorPos_y, size: 30, isFound: false},
                    {x_pos: 400, y_pos: floorPos_y, size: 20, isFound: false},
                    {x_pos: 1600, y_pos: floorPos_y, size: 15, isFound: false}
                    ];
    
    canyons = [{x_pos: 100, y_pos: floorPos_y, width:100},
               {x_pos: 739, y_pos: floorPos_y, width:100},
               {x_pos: 1900, y_pos: floorPos_y, width:100}
              ];
    
    platforms =[];
    platforms.push(createPlatforms(1380, floorPos_y -40, 70));
    platforms.push(createPlatforms(1220, floorPos_y -40, 70));
    game_score = 0;
    
    flagpole = {isReached: false, x_pos: 2600}; 
    
}

//the following function enemy was created during course session, 
//Lesson 10.3 "Creating enemies with constrictor functions" by Coursera University of London
//Professor Simon and Edward 8/2024   

function Enemy(x, y, range)

{
    this.x = x;
    this.y = y;
    this.range = range;
    this.currentX = x;
    this.inc = 1;

    this.update = function()
    {
        this.currentX += this.inc;

        if(this.currentX >= this.x + this.range)
            {
                this.inc = -1;
            }
        else if(this.currentX < this.x)
            { 
                this.inc = 1;
            }
    }
    
    this.draw = function(){
        this.update();
        fill(255,0,255);
        ellipse(this.currentX + 4, this.y - 20, 20, 20);
        ellipse(this.currentX, this.y, 20, 20);
        ellipse(this.currentX, this.y - 40, 20, 20);    
        ellipse(this.currentX + 1, this.y -37, 2, 2);
        fill(255,255,255);
        ellipse(this.currentX +2, this.y -42, 2,2);
        ellipse(this.currentX -2, this.y -42, 2,2);
    }
    

    this.checkContact = function(gameChar_x, gameChar_y)
    {
        var d = dist(gameChar_x, gameChar_y, this.currentX, this.y)
        
        if(d < 20)
            {
                return true;
            }
        return false;
    }

}