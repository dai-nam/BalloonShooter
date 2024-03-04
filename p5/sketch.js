
//Game Variables
let audioManager;
let gameStarted = false;
let score = 0;
let level = 0;
let newLevelSet = false;


//Game Object Variables
let player;
let immuneTime = 2.5;
let timeSinceLastHit = immuneTime * 60 + 1; //set to a value higher than immuneTime to avoid flashing at startup (hacky solution)

let balls;
let maxBalls = 32;
let ballSpawnTime;
let ballTimer = 0;  //todo: millis() implementdiscieren statt timer
let ballDestroyedAnimations;

let bomb;
let bombs;
let maxBombs = 1;
let bombSpawnTime;
let bombTimer = 0;
let explosionAnimation;

//Sequencer Variables
let gameSpeed = 400;  //ms between beats

let wholeNote = 8;
let quarterNote = 4;
let eigthNote = 2;

let wholeNoteCount = 0;
let quarterNoteCount = 0;
let eigthNoteCount = 0;

let prevWholeNoteCount;
let prevQuarterNoteCount;
let prevEigthNoteCount;


//-------------- GAME CODE --------------------------------------------------------------------------

function preload() {
  audioManager = new AudioManager();
}

function setup() {
  createCanvas(800, 800);
  //ballSpawnTime = 2.0;
  //bombSpawnTime = 9.0;
  ballSpawnTime = 0.4;
  bombSpawnTime = 1.0;
  player = new Player();
  balls = [];
  bombs = [];

  ballDestroyedAnimations = [];
}

function draw() {
  background(220);

  if(!gameStarted)
  {
    return;
  }

  /*
  if (readyToSpawnNewBall()) {
    spawnNewBall(random(width), random(height));
  }
  */

  if (readyToSpawnNewBomb()) {
    spawnNewBomb(random(width), random(height));
  }

  player.updateImmuneStatus();
  player.move();
  player.display();

  for (let ball of balls) {
    ball.move();
    ball.bounce();
    ball.display();
    if (!player.isImmune && player.hasCollidedBall(ball)) {
      player.handleBallCollision();
    }
  }

  for (let bomb of bombs) {
    bomb.display();
    if (player.hasCollidedBomb(bomb)) {
      player.handleBombCollision(bomb);
    }
  }

  showAnimations();
  showTextBar();
}

function startGame()
{
  startAudio();
  logEverySecond();
  globalTimer();
  gameStarted = true;
}

function mousePressed() {
  if(!gameStarted)
  {
    startGame();
  }

  for (let ball of balls) {
    ball.shoot();
  }
}

function spawnNewBall(x, y) {
  if (balls.length >= maxBalls) return;

  const minDist = 300;
  if (dist(x, y, player.x, player.y) < minDist) {
    return spawnNewBall(random(width), random(height));
  }
  balls.push(new Ball(x, y));
}

function spawnNewBomb(x, y) {
  if (bombs.length >= maxBombs) return;
  bombs.push(new Bomb(x, y));
}

function readyToSpawnNewBall() {
  if (ballTimer++ > ballSpawnTime * 60) {
    ballTimer = 0;
    return true;
  }
  return false;
}

function readyToSpawnNewBomb() {
  if (bombTimer++ > bombSpawnTime * 60) {
    bombTimer = 0;
    return true;
  }
  return false;
}

function updateScore(amount) {
  score += amount;
  let oldLevel = level;

  level = Math.floor(score / 3);

  if (oldLevel != level) {
   newLevelSet = true;
  }
}

function showAnimations() {
  if (explosionAnimation != null) {
    explosionAnimation.display();
  }

  for (let anim of ballDestroyedAnimations) {
    anim.display();
  }
}

function startScreen() {}

function endScreen() {}

function showTextBar() {
  textSize(20);
  fill(0);
  text("Level: " + level, width - 440, 40);
  text("Score: " + score, width - 220, 40);
  text("Balls: " + balls.length, width - 330, 40);
  text("Health: " + player.health, width - 110, 40);
}


function waitForSeconds(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

async function logEverySecond() {
  while (true) {
    await waitForSeconds(1.0);
  }
}

async function globalTimer() {

  while (true) {
    sendTriggers();  
    await waitForSeconds(0.01);
  }
}

  function sendTriggers()
  {
    //todo: Bug, neues gamespeed immer auf neuem vollem beat triggern.
    if(newLevelSet)
    {
      gameSpeed -= 10;
      newLevelSet = false;
    }   
    wholeNoteTrigger();
    quarterNotTrigger();
    eigthNoteTrigger();
  }

  function wholeNoteTrigger()
  {
    prevWholeNoteCount = wholeNoteCount;
    wholeNoteCount= millis() % (gameSpeed * wholeNote);
    if(prevWholeNoteCount > wholeNoteCount) //detect signal transition
    {
            //console.log("Trigger Event");
      spawnNewBall(random(width), random(height));
      triggerKick();     
    }
  }

  function quarterNotTrigger()
{
  prevQuarterNoteCount = quarterNoteCount;
  quarterNoteCount= millis() % (gameSpeed * quarterNote);
  if(prevQuarterNoteCount > quarterNoteCount)
  {
    triggerSnare();        
  }
}

function eigthNoteTrigger()
{
  prevEigthNoteCount = eigthNoteCount;
  eigthNoteCount= millis() % (gameSpeed * eigthNote);
  if(prevEigthNoteCount > eigthNoteCount)
  {
    triggerHihat();        
  }
}