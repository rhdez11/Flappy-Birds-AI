class Fish {
    constructor() {
        this.y = height / 2 - 40;
        this.x = 50;
        this.r = 40;
        this.gravity = 1.6;
        this.velocity = 0;
        this.lift = -30;

        this.count = 0;
        this.img = 0;

        this.prueba = ellipse(this.x, this.y, this.r);
        this.score = 0;
        this.alive = true;

        this.brain = new Brain();
        this.fitness = 0;
        this.framesAlive = 0;
        this.isBest = false;

        this.focus = 300;
    }

    checkScore(pipe) {
        if (this.x + this.r / 2 == pipe.x + pipe.w / 2) {
            this.score++;
        }
    }

    checkCrash(pipe) {
        if (collideRectCircle(pipe.x, 0, pipe.w, pipe.htop, this.x, this.y, this.r) || collideRectCircle(pipe.x, pipe.ybottom, pipe.w, pipe.hbottom, this.x, this.y, this.r)) {
            this.alive = false;
        }
    }

    show() {
        push();
        if (this.isBest && this.alive) {
            fill('rgb(0,255,0)');
        } else if (!this.alive) {
            fill('rgba(0,0,0,0)');
        } else {
            fill(255);
        }

        noStroke();
        ellipseMode(CENTER);
        this.prueba = ellipse(this.x + this.r / 2, this.y + this.r / 2, this.r);
        pop();
    }



    jump() {
        if (this.brain.jumpProbability[this.brain.step] >= 0.95) {
            this.velocity += this.lift;
        }
        this.brain.step++;
        if (this.brain.jumpProbability.length - 1 < this.brain.step) {
            this.brain.jumpProbability.push(random());
        }
    }

    update() {
        if (this.alive) {
            this.framesAlive++;
            this.jump();
            this.velocity += this.gravity;
            this.velocity *= 0.90;
            this.y += this.velocity;
            if (this.y > height - 45) {
                this.y = height - 45;
                this.velocity = 0;
                this.alive = false;
            }
            if (this.y < 0) {
                this.y = 0;
                this.velocity = 0;
                this.alive = false;
            }
        }

    }

    calculateFitness() {

        this.fitness = pow(this.framesAlive, 2);
    }

    crossover() {
        let baby = new Fish();
        baby.brain = this.brain.cloneBrain();
        return baby;
    }
}