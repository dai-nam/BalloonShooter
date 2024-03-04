let balls;
let player;
let bombs;
let ballSpawnTime;
let bombSpawnTime;
let bomb;
let audioManager;

//todo: millis() implementdiscieren statt timer
let ballTimer = 0;
let bombTimer = 0;

let maxBalls = 32;
let maxBombs = 1;

let score = 0;
let level = 0;
let immuneTime = 2.5;
//set to a value higher than immuneTime to avoid flashing at startup (hacky solution)
let timeSinceLastHit = immuneTime * 60 + 1;

let explosionAnimation;
let ballDestroyedAnimations;

let positionInLoop = 0;
let gameSpeed = 300;  //ms between beats
let bars = 8;

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
  logEverySecond();
  globalTimer();
}

function draw() {
  background(220);

  if (readyToSpawnNewBall()) {
    spawnNewBall(random(width), random(height));
  }

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

function mousePressed() {
  for (let ball of balls) {
    ball.shoot();
  }
  //spawnNewBall(mouseX, mouseY);
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

  if (oldLevel != level && ballSpawnTime >= 0.4) {
    ballSpawnTime -= 0.1;
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
  let prevPosition;
  while (true) {
    prevPosition = positionInLoop;
    positionInLoop= millis() % (gameSpeed * bars);
    if(prevPosition > positionInLoop) //detect signal transition
      {
        console.log("Trigger Event");
        
      }
    await waitForSeconds(0.01);
  }
}
