class DrumSequener{

constructor(){
  this.count = 0;
  this.resolution = 16;  //16th as smallest unit
  this.globalTimer();
}
    
async globalTimer() {

    while (true) {
      this.tick();  
      await waitForSeconds(gameState.speedInMs/1000.0);
    }
  }
  
    tick()
    {
      this.sendTick(this.count);
      this.count++;
      if(this.count >= this.resolution)
      {
        this.handleEvent(); //unschön
        this.count = 0;
      }
    }

    sendTick(param)
    {
      const tickEvent = new CustomEvent('tickEvent', {detail: param });
      document.dispatchEvent(tickEvent);
    }
  
  
    //todo: auslagern in entspr. Klassen
    handleEvent()
    {
      spawnNewBall(random(width), random(height));
      spawnNewBomb(random(width), random(height));
      if(gameState.updateFlag)
      {
        gameState.updateFlag = false;
      }
      if(bomb && bomb.activated)
      {
        bomb.explode();
      }
    }
    
    getCurrentBPM()
    {
       return Math.round(0.5 * (1000.0 / gameState.speedInMs) * 60.0);
    }
  
  }