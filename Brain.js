class Brain {
    constructor() {
        this.jumpProbability = [];
        this.randomize();
        this.step = 0;
    }

    randomize() {
        for (let i = 0; i < 400; i++) {
            this.jumpProbability.push(random());
        }
    }

    cloneBrain() {
        var clonedBrain = new Brain();
        clonedBrain.jumpProbability = [];
        for (let i = 0; i < this.jumpProbability.length; i++) {
            //this.clonedBrain.jumpProbability[i] = this.jumpProbability[i];
            clonedBrain.jumpProbability.push(this.jumpProbability[i]);
        }
        return clonedBrain;
    }

    mutate() {
        var mutationRate = 0.01;
        for (let i = 0; i < this.jumpProbability.length; i++) {
            var rand = random(1);
            if (rand < mutationRate) {
                this.jumpProbability[i] = random();
            }
        }
    }
}