
//Game Variables
let audioManager;
let drums;
let gameStarted = false;
let score = 0;
let gameState;
let backgroundColor;

//Game Object Variables
let player;
let immuneTime = 2.5;
let timeSinceLastHit = immuneTime * 60 + 1; //set to a value higher than immuneTime to avoid flashing at startup (hacky solution)

let balls;
const maxBalls = 32;
let ballDestroyedAnimations;

var bomb = null;
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

  ballDestroyedAnimations = [];
}

function draw() {
  background(backgroundColor);

  if(!gameStarted)
  {
    return;
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

  if(bomb) {
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
  drums = new DrumSequener(gameState);
  logEverySecond();
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
  if(bomb) return;
  if(random(100) > gameState.bombProbabilty) return;
  if(balls.length <= 1) return;

  bomb = new Bomb(x, y);
}


function updateScore(amount) {
  score += amount;
  gameState.points += amount;
  if(gameState.points >= gameState.pointsUntilNewLevel)
  {
    gameState.setNewLevel(gameState.level + 1);
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
  text("Level: " + gameState.level, width - 440, 40);
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

function getRandomColor(alpha)
{
  if(!alpha)
  {
    return color(random(255), random(255), random(255));
  }
    return color(random(255), random(255), random(255), 20);

}
