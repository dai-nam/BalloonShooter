
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