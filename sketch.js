var bg;
var fish;
var pipes;
var pipeCount = 0;

var fishPopulation;

var pipesSpaces = [];
var pipeIdx;

var maxPoints = 0;

function setup() {
    createCanvas(500, 700);
    fishPopulation = new Population(700);
    pipeIdx = 0;
    pipes = [];
    pipes.push(new Pipe(-1));
    pipesSpaces.push(pipes[pipeIdx].space);
    pipeIdx++;

}

function draw() {
    background(0);

    fishPopulation.update();
    fishPopulation.show();

    for (let i = 0; i < pipes.length; i++) {
        fishPopulation.checkScore(pipes[i]);
        fishPopulation.checkCrash(pipes[i]);

        pipes[i].update();
        pipes[i].show();

        if (pipes[i].x === 50) {
            pipeCount++;
            if (pipeCount > maxPoints) {
                maxPoints = pipeCount;
            }
        } else if (pipes[i].x === 200) {
            let b = pipes[i].ybottom - 100;
            fishPopulation.focus(b);
        }

        if (pipes[i].x < -200) {
            pipes.splice(i, 1);
            i--;
        }
    }

    if (pipes[pipes.length - 1].x == width - 270) {
        if (pipeIdx < pipesSpaces.length) {
            pipes.push(new Pipe(pipesSpaces[pipeIdx]));
            pipeIdx++;
        } else {
            pipes.push(new Pipe(-1));
            pipesSpaces.push(pipes[pipes.length - 1].space);
            pipeIdx++;
        }

    }


    if (fishPopulation.allFishDead()) {
        fishPopulation.calculateFitness();
        fishPopulation.naturalSelection();
        fishPopulation.mutation();


        pipeIdx = 0;
        pipeCount = 0;
        pipes = [];
        pipes.push(new Pipe(pipesSpaces[pipeIdx]));
        pipeIdx++;
    }

    push();
    textSize(80);
    fill(255);
    textAlign(CENTER);
    textStyle(BOLD);
    text(pipeCount, width / 2, 150);
    pop();


    push();
    textSize(40);
    fill('rgb(50,100,150)');

    text("Record: " + fishPopulation.record, width - 350, 50);
    text("Gen: " + fishPopulation.gen, width - 200, 100);
    text("Max: " + maxPoints, width - 200, 150);
    pop();
}
