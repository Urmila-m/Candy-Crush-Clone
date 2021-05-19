class Candy{
    constructor(color, x, y, type='solid', row, column){
        this.color = color;
        this.x = x;
        this.y = y;
        this.type = type;
        this.row = row;
        this.column = column;
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    isValidMove(){
        //check for vertical move 
        if(this.x >= GRID_WIDTH * this.column && this.x <= GRID_WIDTH * (this.column + 1) &&
                this.y >= (this.row - 1) * GRID_HEIGHT && this.y <= this.row * GRID_HEIGHT ){

                    return MOVE_UP;
                }

        if(this.x >= GRID_WIDTH * this.column && this.x <= GRID_WIDTH * (this.column + 1) &&
                (this.y + CANDY_HEIGHT) >= (this.row + 1) * GRID_HEIGHT && (this.y + CANDY_HEIGHT) <= (this.row + 2) * GRID_HEIGHT){

                    return MOVE_DOWN;
                }
        
        // check for horizontal move
        if(this.y <= (this.row + 1) * GRID_HEIGHT && this.y >= this.row * GRID_HEIGHT &&
                this.x >= (this.column - 1) * GRID_WIDTH && this.x <= this.column * GRID_WIDTH)
            {
                return MOVE_LEFT;
            }
            
        if(this.y <= (this.row + 1) * GRID_HEIGHT && this.y >= this.row * GRID_HEIGHT &&
                (this.x + CANDY_WIDTH) >= (this.column + 1) * GRID_WIDTH && (this.x + CANDY_WIDTH) <= (this.column + 2) * GRID_WIDTH)
            {
                return MOVE_RIGHT;
            }
        
        if(this.y <= (this.row + 1) * GRID_HEIGHT && this.y >= this.row * GRID_HEIGHT &&
                this.x >= this.column * GRID_WIDTH && this.x <= (this.column + 1) * GRID_WIDTH){
            return DONT_MOVE;
        }

        return 0;
    }

}