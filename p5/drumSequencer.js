class DrumSequener{

constructor(level){
    //Sequencer Variables
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

this.bpm = level.speed;
this.level = level;

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
      //todo: Bug, neues gamespeed immer auf neuem vollem beat triggern.
  
      this.currentMilli = millis();
      this.quarterNoteTrigger();
      this.eigthNoteTrigger();
      this.wholeNoteTrigger();
    }
  
     wholeNoteTrigger()
    {
        this.prevWholeNoteCount = this.wholeNoteCount;
        this.wholeNoteCount = (this.currentMilli - this.prevMilli) % (this.bpm * this.wholeNote);
      if(this.prevWholeNoteCount > this.wholeNoteCount) //detect signal transition
      {
              //console.log("Trigger Event");
        spawnNewBall(random(width), random(height));
        triggerKick();  
        this.updateBPM();
      }
    }
  
     quarterNoteTrigger()
  {
    this.prevQuarterNoteCount =this. quarterNoteCount;
    this.quarterNoteCount = (this.currentMilli - this.prevMilli) % (this.bpm * this.quarterNote);
    if(this.prevQuarterNoteCount > this.quarterNoteCount)
    {
      triggerSnare();  
    }
  }
  
   eigthNoteTrigger()
  {
    this.prevEigthNoteCount = this.eigthNoteCount;
    this.eigthNoteCount = (this.currentMilli - this.prevMilli) % (this.bpm * this.eigthNote);
    if(this.prevEigthNoteCount > this.eigthNoteCount)
    {
      triggerHihat();        
    }
  }
  
  //Bug
   updateBPM()
  {
     if(level.updated)
     {
        this.prevMilli = millis();  
       this.bpm = level.speed;
       level.updated = false;
       this.wholeNoteCount = 0;
       this.quarterNoteCount = 0;
       this.eigthNoteCount = 0;
     }   
  
     function beatMapping()
     {
      //1:
      
     }
  }
}