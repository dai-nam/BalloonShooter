class ExplosionAnimation{
  
    constructor(x,y){
      explosionAnimation = this;
      this.x = x;
      this.y = y;
      this.txt = "Booom!";
      this.size = 10;
      this.triggerAnimation();
      this.rotation = radians(random(-30, 30));
    }
      
    display()
    {
      push();
      strokeWeight(4);
      textSize(this.size);
      stroke(255, 0, 0);
      translate(this.x, this.y);
      rotate(this.rotation);
      fill(255, 201, 0);
      text(this.txt, 0, 0); //0, 0 wegen translate
      pop();
    }
    
   
    
    waitForSeconds(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }
  
    async triggerAnimation() {
    while(this.size < 100){
      await this.waitForSeconds(0.01);
      this.size += 2.8;
    }
      explosionAnimation = null;
  }
    
  }