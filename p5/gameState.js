class GameState{

    constructor(level)
    {
        this.level = level;
        this.score = 0;
        this.points = 0;
        this.pointsUntilNewLevel = this.level;
        this.speedInMs = 280;   //ms between beats
        this.speedLoss = 15;
        this.bombProbabilty = 100;
        this.updateFlag = false;
        this.started = false;
    }

    setNewLevel(level)
    {
        this.level = level;
        this.points = 0;
        this.pointsUntilNewLevel = this.level * 2;

        this.speedInMs = 300 - this.level * this.speedLoss;
        this.speedInMs = constrain(this.speedInMs, 60, 350);
        this.bombProbabilty = 100 - this.level * 5;
        this.bombProbabilty = constrain(this.bombProbabilty, 10, 100);  
        //todo speed und probabl syncen, damit sie proportional zueinande sinken in gleich vielen steps
        updateSynth();
        backgroundColor = getRandomBackgroundColor();
        this.updateFlag = true;
    }

    updateScore(amount) {
        this.score += amount;
        this.points += amount;
        if(this.points >= this.pointsUntilNewLevel)
        {
          this.setNewLevel(this.level + 1);
        }
      }

}