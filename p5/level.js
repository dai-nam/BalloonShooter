class Level{

    constructor(value)
    {
        this.value = value;
        this.points = 0;
        this.pointsUntilNewLevel = 2;
        this.speed = 300;   //ms between beats
        this.updated = false;
        this.speedLoss = 10;
    }

    setNewLevel(value)
    {
        this.value = value;
        this.points = 0;
        //this.pointsUntilNewLevel = this.value * 2;
        this.pointsUntilNewLevel = 1;

        this.speed = 300 - this.value * this.speedLoss;   //ms between beats
        this.speed = constrain(this.speed, 50, 300);

        this.updated = true;
    }
}