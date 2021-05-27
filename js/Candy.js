class Candy{
    constructor(color, x, y, type, row, column, isMoving){
        this.color = color;
        this.x = x;
        this.y = y;
        this.type = type;
        this.row = row;
        this.column = column;
        this.isMoving = isMoving;
        this.speed = 40;
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    isValidMove(){
        // grids left, right, up and down are valid moves

        //check for vertical move 
        if(this.x >= GRID_WIDTH * this.column && this.x <= GRID_WIDTH * (this.column + 1) &&
                this.y >= (7 - this.row - 1) * GRID_HEIGHT && this.y <= (7 - this.row) * GRID_HEIGHT ){

                    return MOVE_UP;
                }

        if(this.x >= GRID_WIDTH * this.column && this.x <= GRID_WIDTH * (this.column + 1) &&
                (this.y + CANDY_HEIGHT) >= (7-this.row + 1) * GRID_HEIGHT && (this.y + CANDY_HEIGHT) <= (7 - this.row + 2) * GRID_HEIGHT){

                    return MOVE_DOWN;
                }
        
        // check for horizontal move
        if(this.y <= (7 - this.row + 1) * GRID_HEIGHT && this.y >= (7 - this.row) * GRID_HEIGHT &&
                this.x >= (this.column - 1) * GRID_WIDTH && this.x <= this.column * GRID_WIDTH)
            {
                return MOVE_LEFT;
            }
            
        if(this.y <= (7 - this.row + 1) * GRID_HEIGHT && this.y >= (7 - this.row) * GRID_HEIGHT &&
                (this.x + CANDY_WIDTH) >= (this.column + 1) * GRID_WIDTH && (this.x + CANDY_WIDTH) <= (this.column + 2) * GRID_WIDTH)
            {
                return MOVE_RIGHT;
            }
        
        if(this.y <= (7-this.row + 1) * GRID_HEIGHT && this.y >= (7-this.row) * GRID_HEIGHT &&
                this.x >= this.column * GRID_WIDTH && this.x <= (this.column + 1) * GRID_WIDTH){
            return DONT_MOVE;
        }

        return 0;
    }

    resetPosition(){
        this.x = this.column * GRID_WIDTH + CANDY_PADDING;
        this.y = (7 - this.row) * GRID_HEIGHT + CANDY_PADDING;
    }

    hasReachedDestination(){
        if (this.y === (7 - this.row) * GRID_HEIGHT + CANDY_PADDING) {
            return true;
        }
        else{
            return false;
        }
    }
}