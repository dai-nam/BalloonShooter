class AudioManager{
  
    constructor() {
      this.clickSounds = [];
      this.burstSounds = [];
      this.damageSound;
      this.loadSounds();
      //Arrow-Syntx nötig, damit this sich auf den AudioManager bezieht und nicht das Event-Objekt
      document.addEventListener("ballCollision", () => this.playDamageSound());    
    }
    
    loadSounds()
    {
      //todo: file IO
       for(let i = 1; i <= 8; i++)
        {
          let click = loadSound(`assets/click/click${i}.wav`);
          click.playMode('sustain');
          this.clickSounds.push(click);
          let burst = loadSound(`assets/burst/chimes${i}.mp3`);
          burst.playMode('sustain');
          this.burstSounds.push(burst);
        }
      
      this.damageSound = loadSound(`assets/player/damage.mp3`);
      console.log("Sounds loaded"); 
    }
    
    playSound(sound)
    {
      if(!sound)
        return;

      if(!sound.isPlaying())
        {
          sound.play();
        }
    }

    playDamageSound()
    {
      this.playSound(this.damageSound);
    }
  }