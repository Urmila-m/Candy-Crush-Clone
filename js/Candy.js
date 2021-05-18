class Candy{
    constructor(color, x, y, type='solid'){
        this.color = color;
        this.x = x;
        this.y = y;
        this.type = type;
    }

    setOffset(x, y){
        this.offsetX = x;
        this.offsetY = y;
    }

    setIsDragging(isDragging){
        self.isDragging = isDragging;
    }
}