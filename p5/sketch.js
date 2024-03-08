//Globals
var gameState;
var bomb;


//Game Variables
let audioManager;
let drums;
let backgroundColor;

//Game Object Variables
let player;
let immuneTime = 2.5;
let timeSinceLastHit = immuneTime * 60 + 1; //set to a value higher than immuneTime to avoid flashing at startup (hacky solution)

let balls;
const maxBalls = 32;
let ballDestroyedAnimations;

let maxBombs = 1;
let explosionAnimation;

//-------------- GAME CODE --------------------------------------------------------------------------

function preload() {
  audioManager = new AudioManager();
}

function setup() {
  createCanvas(800, 800);
  backgroundColor = getRandomColor(true);
  gameState = new GameState(1);

  player = new Player();
  balls = [];
  bomb = null;
  ballDestroyedAnimations = [];
}

function draw() {
  background(backgroundColor);

  if(!gameState.started) { return; }

  updatePlayer();
  updateBalls();
  updateBomb();

  showAnimations();
  showTextBar();
}

function updatePlayer() {
  player.updateImmuneStatus();
  player.move();
  player.display();
}

function updateBalls() {
  for (let ball of balls) {
    ball.move();
    ball.bounce();
    ball.display();
    if (!player.isImmune && player.hasCollidedBall(ball)) {
      player.handleBallCollision();
    }
  }
}

function updateBomb() {
  if (bomb) {
    bomb.display();
    if (player.hasCollidedBomb(bomb)) {
      player.handleBombCollision(bomb);
    }
  }
}

function startGame()
{
  startAudio();
  drums = new DrumSequener();
  logEverySecond();
  gameState.started = true;
}

function mousePressed() {
  if(!gameState.started)
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
  if(bomb) return;
  if(random(100) > gameState.bombProbabilty) return;
  if(balls.length <= 1) return;

  bomb = new Bomb(x, y);
}



function showAnimations() {
  if (explosionAnimation != null) {
    explosionAnimation.display();
  }

  for (let ballAnimation of ballDestroyedAnimations) {
    ballAnimation.display();
  }
}


function waitForSeconds(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}



function getRandomColor(alpha)
{
  return alpha ? color(random(255), random(255), random(255), 20) : color(random(255), random(255), random(255));
}
