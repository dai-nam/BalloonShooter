class Bomb {
    constructor(x, y) {
      this.size = 50;
      this.x = constrain(x, this.size / 2, width - this.size / 2);
      this.y = constrain(y, this.size / 2, height - this.size / 2);
    }
  
    display() {
      push();
      fill(255, 0, 0);
      noStroke();
      rectMode(CENTER);
      rect(this.x, this.y, this.size, this.size);
      pop();
    }
  
    explode() {
      new ExplosionAnimation(this.x, this.y);
      if (balls.length == 0) return;
  
      let oldLength = balls.length;
      if (balls.length <= 3) {
        balls[0].destroy();
      } else if (balls.length <= 6) {
        balls[1].destroy();
        balls[0].destroy();
      } else if (balls.length <= 10) {
        balls[2].destroy();
        balls[1].destroy();
  
        balls[0].destroy();
      } else {
        let num = int(random(4, balls.length));
        for (let i = 0; i < num; i++) {
          balls[num-i].destroy();  //rückwärts iterieren
        }
      }
  
      let numberOfRemovedBalls = oldLength - balls.length;
      updateScore(numberOfRemovedBalls);
      bombs.splice(bombs.indexOf(this), 1);
    }
  }
  