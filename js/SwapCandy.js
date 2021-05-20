class SwapCandy{

    constructor(selectedCandy, candiesArray){
        this.selectedCandy = selectedCandy;
        this.candiesArray = candiesArray;
    }

    swapCandies(move){
        if(move !== DONT_MOVE){
            let swapCandyRow = this.selectedCandy.row;
            let swapCandyColumn = this.selectedCandy.column;
            let candyToBeSwapped;

            if(move === MOVE_LEFT){
                swapCandyColumn = this.selectedCandy.column - 1;
                candyToBeSwapped = this.placeSwappingCandy(swapCandyRow, swapCandyColumn);
                candyToBeSwapped.column += 1;
                this.selectedCandy.column -= 1;
            
            }
            else if(move === MOVE_RIGHT){
                swapCandyColumn = this.selectedCandy.column + 1;
                candyToBeSwapped = this.placeSwappingCandy(swapCandyRow, swapCandyColumn);
                candyToBeSwapped.column -= 1;
                this.selectedCandy.column += 1;

            }

            else if(move === MOVE_UP){
                swapCandyRow = this.selectedCandy.row +1;
                candyToBeSwapped = this.placeSwappingCandy(swapCandyRow, swapCandyColumn);
                candyToBeSwapped.row -= 1;
                this.selectedCandy.row +=1;
            }

            else if(move === MOVE_DOWN){
                swapCandyRow = this.selectedCandy.row - 1;
                candyToBeSwapped = this.placeSwappingCandy(swapCandyRow, swapCandyColumn);
                candyToBeSwapped.row += 1;
                this.selectedCandy.row -=1;
            }
            
            this.resetSwappedCandiesPosition(candyToBeSwapped, swapCandyRow, swapCandyColumn);
        }
        else{
            this.selectedCandy.resetPosition();
        }
    }

    resetSwappedCandiesPosition(candyToBeSwapped, swapCandyRow, swapCandyColumn){
        this.candiesArray[swapCandyColumn][swapCandyRow] = this.selectedCandy; 
        this.selectedCandy.resetPosition();
        candyToBeSwapped.resetPosition();
    }

    placeSwappingCandy(swapCandyRow, swapCandyColumn){
        let candyToBeSwapped = this.candiesArray[swapCandyColumn][swapCandyRow];
        this.candiesArray[this.selectedCandy.column][this.selectedCandy.row] = candyToBeSwapped;
        return candyToBeSwapped;
    }
} 