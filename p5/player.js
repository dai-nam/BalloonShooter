class Player {
    constructor() {
      this.x = width / 2;
      this.y = height / 2;
      this.size = 40;
      this.speed = 2.5;
      this.c = 0;
      this.health = 5;
      this.isImmune = false;
  
      this.flashTimer = 0;
      this.flashSpeed = 0.1;
      this.toggleFlash = false;
    }
  
    display() {
      var col;
      if (this.isImmune) {
        this.flashingColor();
        col = this.toggleFlash ? 220 : 150;
      } else {
        col = this.c;
      }
  
      push();
      fill(col);
      noStroke();
      rectMode(CENTER);
      rect(this.x, this.y, this.size, this.size);
      pop();
    }
  
    move() {
      if (keyIsDown(UP_ARROW) || keyIsDown(87)) this.y -= this.speed;
      if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) this.y += this.speed;
      if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.x -= this.speed;
      if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.x += this.speed;
  
      this.wrapAround();
    }
  
    wrapAround() {
      if (this.x < -this.size / 2) this.x = width;
      if (this.x > width + this.size / 2) this.x = 0;
      if (this.y < -this.size / 2) this.y = height;
      if (this.y > height + this.size / 2) this.y = 0;
    }
  
    updateImmuneStatus() {
      timeSinceLastHit++;
      if (timeSinceLastHit > immuneTime * 60) {
        this.isImmune = false;
      } else {
        this.isImmune = true;
      }
    }
  
    hasCollidedBall(ball) {
      var d = dist(player.x, player.y, ball.x, ball.y);
      return d < ball.rad;
    }
  
    handleBallCollision() {
      this.health--;
      timeSinceLastHit = 0;
      // console.log(this.health);
      if (this.health <= 0) {
        console.log("you die");
      }
    }
    
    hasCollidedBomb(bomb) {
      var d = dist(player.x, player.y, bomb.x, bomb.y);
      return d < bomb.size/2;
    }
    
    handleBombCollision(bomb)
    {
      bomb.explode();
    }
  
    flashingColor() {
      if (this.flashTimer++ > this.flashSpeed * 60) {
        this.flashTimer = 0;
        this.toggleFlash = !this.toggleFlash;
      }
    }
  }
  