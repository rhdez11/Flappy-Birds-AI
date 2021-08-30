class Rectangle {
    set(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show() {
        fill(140);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }

}