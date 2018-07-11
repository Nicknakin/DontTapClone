class FastButton{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.state = false;
    }

    draw(){
        fill((this.state)? alternateColor: defaultColor);
        stroke("gray");
        strokeWeight(1);
        rect(this.x, this.y, this.width-1, this.height-1);
    }

    click(){
        this.state = !this.state;
    }
}
