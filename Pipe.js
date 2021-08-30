class Pipe {
    constructor(space) {
        // this.top = loadImage('assets/gpipe.png');
        // this.bottom = loadImage('assets/gpipe.png');

        this.x = width;

        this.w = 100;

        this.betweeen = 200;

        if (space === -1) {
            this.space = floor(random(50, height - 50));
        } else {
            this.space = space;
        }


        if (this.space > height / 2) {
            this.ybottom = this.space;
            this.htop = this.space - this.betweeen;
        } else {
            this.htop = this.space;
            this.ybottom = this.space + this.betweeen;
        }
        this.hbottom = height - this.ybottom;

        this.topPipe = new Rectangle();
        this.topPipe.set(this.x, 0, this.w, this.htop);
        this.bottomPipe = new Rectangle();
        this.bottomPipe.set(this.x, this.ybottom, this.w, this.hbottom);
    }

    show() {
        this.topPipe.show();
        this.bottomPipe.show();
        // image(this.top, this.x, 0, 80, this.htop);
        // image(this.bottom, this.x, this.ybottom, 80, this.hbottom);       
    }

    update() {
        this.x -= 2.5;
        this.topPipe.x = this.x;
        this.bottomPipe.x = this.x;
    }
}