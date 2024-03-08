class DrumSequener{

constructor(){
this.wholeNote = 8;
this.quarterNote = 4;
this.eigthNote = 2;

this.wholeNoteCount = 0;
this.quarterNoteCount = 0;
this.eigthNoteCount = 0;
this.prevWholeNoteCount;
this.prevQuarterNoteCount;
this.prevEigthNoteCount;
this.currentMilli = 0;
this.prevMilli = 0;

this.speedInMs = gameState.speed;

this.globalTimer();
}
    
async globalTimer() {

    while (true) {
      this.sendTriggers();  
      await waitForSeconds(0.01);
    }
  }
  
     sendTriggers()
    {  
      this.currentMilli = millis();
      this.quarterNoteTrigger();
      this.eigthNoteTrigger();
      this.wholeNoteTrigger();
    }
  
     wholeNoteTrigger()
    {
        this.prevWholeNoteCount = this.wholeNoteCount;
        this.wholeNoteCount = (this.currentMilli - this.prevMilli) % (this.speedInMs * this.wholeNote);
      if(this.prevWholeNoteCount > this.wholeNoteCount) //detect signal transition
      {
        spawnNewBall(random(width), random(height));
        spawnNewBomb(random(width), random(height));
        triggerKick();  
        this.updateSpeed();
        if(bomb && bomb.activated)
        {
          bomb.explode();
        }
      }
    }
  
     quarterNoteTrigger()
  {
    this.prevQuarterNoteCount =this. quarterNoteCount;
    this.quarterNoteCount = (this.currentMilli - this.prevMilli) % (this.speedInMs * this.quarterNote);
    if(this.prevQuarterNoteCount > this.quarterNoteCount)
    {
      triggerSnare();  
    }
  }
  
   eigthNoteTrigger()
  {
    this.prevEigthNoteCount = this.eigthNoteCount;
    this.eigthNoteCount = (this.currentMilli - this.prevMilli) % (this.speedInMs * this.eigthNote);
    if(this.prevEigthNoteCount > this.eigthNoteCount)
    {
     triggerHihat();        
    }
  }
  
   updateSpeed()
  {
     if(gameState.updated)
     {
        this.prevMilli = millis();  
       this.speedInMs = gameState.speed;
       gameState.updated = false;
       this.wholeNoteCount = 0;
       this.quarterNoteCount = 0;
       this.eigthNoteCount = 0;
       console.log("Current BPM: " + this.getCurrentBPM());
     }   
    }
  
    
    getCurrentBPM()
    {
       return Math.round(0.5 * (1000.0 / this.speedInMs) * 60.0);
    }
  
  }


  //Todo: Logik refactoren -> Tick based 16tel Events. Noten-Trigger als 1 im Array mit L#änge 16
