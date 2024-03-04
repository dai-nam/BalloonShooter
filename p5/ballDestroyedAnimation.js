class BallDestroyedAnimation {
    constructor(x, y, c) {
      this.x = x;
      this.y = y;
      this.c = c;
      this.maxOffset = 70;
      this.offsetLength = 10;
      this.numberOfParticles = 12;
      this.particles = [];
      this.createParticles();
      this.triggerAnimation();
      this.alphaVal = 255;
    }
  
    display() {
      for (let particle of this.particles) {
        let radians = (particle.index * TWO_PI - HALF_PI) / this.numberOfParticles;
        let offset = createVector(cos(radians), sin(radians)).setMag(
          this.offsetLength
        );
        particle.display(offset, this.alphaVal);
      }
    }
  
    createParticles() {
      for (let i = 0; i <= this.numberOfParticles; i++) {
        this.particles.push(new Particle(this.x, this.y, this.c, i));
      }
    }
  
    waitForSeconds(seconds) {
      return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    }
  
    async triggerAnimation() {
      while (this.offsetLength < this.maxOffset) {
        await this.waitForSeconds(0.01);
        this.offsetLength += 1;
        this.alphaVal -= 7;
      }
      this.particles = [];
      ballDestroyedAnimations.slice(ballDestroyedAnimations.indexOf(this), 1);
    }
  }
  
  class Particle {
    constructor(x, y, c, index) {
      this.x = x;
      this.y = y;
      this.c = c
      this.rad = 9;
      this.index = index;
    }
  
    display(offset, alphaVal) {
      push();
      let posX = this.x + offset.x;
      let posY = this.y + offset.y;
      this.c.setAlpha(alphaVal);
      fill(this.c);
      noStroke();
      circle(posX, posY, this.rad);
      pop();
    }
  }
  