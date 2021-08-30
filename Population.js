class Population {

    constructor(size) {
        this.gen = 0;
        this.fishes = [];
        for (let i = 0; i < size; i++) {
            this.fishes.push(new Fish())
        }
        this.bestFish = 0;
        this.fitnessSum = 0;
        this.record = 0;
    }

    show() {
        for (let i = 1; i < this.fishes.length; i++) {
            this.fishes[i].show();
        }
        this.fishes[0].show();
    }

    update() {
        for (let i = 0; i < this.fishes.length; i++) {
            this.fishes[i].update();
        }
    }

    focus(b) {
        for (let i = 0; i < this.fishes.length; i++) {
            this.fishes[i].focus = b;
        }
    }

    checkScore(pipe) {
        for (let i = 0; i < this.fishes.length; i++) {
            this.fishes[i].checkScore(pipe);
        }
    }

    checkCrash(pipe) {
        for (let i = 0; i < this.fishes.length; i++) {
            this.fishes[i].checkCrash(pipe);
        }
    }

    allFishDead() {
        for (let i = 0; i < this.fishes.length; i++) {
            if (this.fishes[i].alive) {
                return false
            }
        }
        return true;
    }

    calculateFitness() {
        for (let i = 0; i < this.fishes.length; i++) {
            this.fishes[i].calculateFitness();
        }
    }

    naturalSelection() {

        var newFish = [];
        this.setBestFish();
        this.calculateFitnessSum();

        newFish.push(this.fishes[this.bestFish].crossover());
        newFish[0].isBest = true;

        for (let i = 1; i < this.fishes.length; i++) {
            //select parent based on fitness
            var parent = this.selectParent();
            //get baby from parents
            newFish[i] = parent.crossover();
        }

        this.fishes = newFish; //.clone();
        this.gen++;
    }

    calculateFitnessSum() {
        this.fitnessSum = 0;
        for (let i = 0; i < this.fishes.length; i++) {
            this.fitnessSum += this.fishes[i].fitness;
        }


    }

    selectParent() {
        //let rand = random(this.fitnessSum);
        let rand = random(this.fitnessSum);
        let runningSum = 0;
        for (let i = 0; i < this.fishes.length; i++) {
            runningSum += this.fishes[i].fitness;
            if (runningSum > rand) {
                return this.fishes[i];
            }
        }
        return null;
        //return this.fishes[this.bestFish];
    }

    mutation() {
        for (let i = 1; i < this.fishes.length; i++) {
            this.fishes[i].brain.mutate();
        }
    }

    setBestFish() {
        let max = 0;
        let bestFishIndex = 0;
        let f = this.fishes[0].focus;
        for (let i = 0; i < this.fishes.length; i++) {
            if (this.fishes[i].fitness > max) {
                max = this.fishes[i].fitness;
                bestFishIndex = i;
            } else if (this.fishes[i].fitness === max) {
                let maxf = abs(this.fishes[bestFishIndex].y - f);
                let thisf = abs(this.fishes[i].y - f);

                if (thisf < maxf) {
                    max = this.fishes[i].fitness;
                    bestFishIndex = i;
                }
            }
        }
        this.bestFish = bestFishIndex;
        this.record = max;
        console.log(this.fishes[bestFishIndex].framesAlive);
    }



}