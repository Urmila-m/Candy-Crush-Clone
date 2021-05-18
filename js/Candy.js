class Candy{
    constructor(color, x, y, type='solid'){
        this.color = color;
        this.x = x;
        this.y = y;
        this.type = type;
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }
}