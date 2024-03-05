class AudioManager{
  
    constructor() {
      this.clickSounds = [];
      this.burstSounds = [];
      this.loadSounds();
  
    }
    
    loadSounds()
    {
       for(let i = 1; i <= 8; i++)
        {
          let click = loadSound(`assets/click/click${i}.wav`);
          click.playMode('sustain')
          this.clickSounds.push(click);
          let burst = loadSound(`assets/burst/chimes${i}.wav`);
          burst.playMode('sustain');
          this.burstSounds.push(burst);
        }
      console.log("Sounds loaded"); 
    }
    
    playSound(sound)
    {
      if(!sound)
        return;

      if(!sound.isPlaying())
        {
           // sound.play();
        }
    }
  }