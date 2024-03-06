class GameState{

    constructor(level)
    {
        this.level = level;
        this.points = 0;
        this.pointsUntilNewLevel = this.level;
        this.speed = 350;   //ms between beats
        this.updated = false;
        this.speedLoss = 4;
        this.bombProbabilty = 100;
    }

    setNewLevel(level)
    {
        this.level = level;
        this.points = 0;
        this.pointsUntilNewLevel = this.level * 2;

        this.speed = 300 - this.level * this.speedLoss;
        this.speed = constrain(this.speed, 80, 350);
        this.bombProbabilty = 100 - this.level * 5;
        this.bombProbabilty = constrain(this.bombProbabilty, 10, 100);  
        //todo speed und probabl syncen, damit sie proportional zueinande sinken in gleich vielen steps
        this.updated = true;
    }
}