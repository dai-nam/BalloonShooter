class Ball {
    constructor(x, y) {
      this.rad = 45;
      this.x = constrain(x, this.rad / 2, width - this.rad / 2);
      this.y = constrain(y, this.rad / 2, height - this.rad / 2);
  
      this.health = 3;
  
      this.xDirection = random(100) < 50 ? -1 : 1;
      this.yDirection = random(100) < 50 ? -1 : 1;
      this.xspeed = random(0.7, 2.4) * this.xDirection;
      this.yspeed = random(0.7, 2.4) * this.yDirection;
  
      this.c = getRandomColor(false);
    }
  
    display() {
      push();
      strokeWeight(this.health * 3);
      fill(this.c);
      circle(this.x, this.y, this.rad);
      pop();
    }
  
    move() {
      this.x += this.xspeed;
      this.y += this.yspeed;
    }
  
    bounce() {
      if (this.x < this.rad / 2 || this.x > width - this.rad / 2) {
        this.xspeed *= -1;
      }
      if (this.y < this.rad / 2 || this.y > height - this.rad / 2) {
        this.yspeed *= -1;
      }
    }
  
    shoot() {
      
      const d = dist(mouseX, mouseY, this.x, this.y);
      
      if (d < this.rad) {
        let index = int(random(audioManager.clickSounds.length));
        let sound = audioManager.clickSounds[index];
        audioManager.playSound(sound);
        
        this.health--;
        if (this.health <= 0) {
          this.destroy();
        }
      }
    }
  
    destroy() {
      gameState.updateScore(1);
      ballDestroyedAnimations.push(
        new BallDestroyedAnimation(this.x, this.y, this.c)
      );
      let index = int(random(audioManager.burstSounds.length));
      let sound = audioManager.burstSounds[index];
      audioManager.playSound(sound);
      balls.splice(balls.indexOf(this), 1);
    }
  }
  