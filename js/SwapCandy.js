class SwapCandy{

    constructor(selectedCandy, candiesArray){
        this.selectedCandy = selectedCandy;
        this.candiesArray = candiesArray;
    }

    swapCandies(move){ 
        let swapCandyRow = this.selectedCandy.row;
        let swapCandyColumn = this.selectedCandy.column;
        let candyToBeSwapped;

        if(this.checkMatch(move)){
            if(move !== DONT_MOVE){

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
                return true;
            }
            else{
                this.selectedCandy.resetPosition();
                return false;
            }
        }
        else{
            return false;
        }
    }

    // if there are not 3 candy match, then no higher match possible, 
    // so only allow swapping, if it results at least in a 3 candy match
    checkMatch(move){
        // create a deep clone of candy array
        let candiesArrayCopy = [];
        for(let col of this.candiesArray){
             let colCopy = []
            for(let candy of col){
                colCopy.push(candy);
            }
            candiesArrayCopy.push(colCopy);
        }

        if(move !== DONT_MOVE){
            let swapCandyColumn = this.selectedCandy.column;
            let swapCandyRow = this.selectedCandy.row;

            if(move === MOVE_LEFT){
                swapCandyColumn = this.selectedCandy.column - 1;
            
            }
            else if(move === MOVE_RIGHT){
                swapCandyColumn = this.selectedCandy.column + 1;
            }

            else if(move === MOVE_UP){
                swapCandyRow = this.selectedCandy.row +1;
            }

            else if(move === MOVE_DOWN){
                swapCandyRow = this.selectedCandy.row - 1;
            }
            let candyToBeSwapped = candiesArrayCopy[swapCandyColumn][swapCandyRow];
            candiesArrayCopy[this.selectedCandy.column][this.selectedCandy.row] = candyToBeSwapped;
            candiesArrayCopy[swapCandyColumn][swapCandyRow] = this.selectedCandy;

            let checkMatch = new CheckForMatch(candiesArrayCopy);
            if (checkMatch.checkFor3VerMatch().length === 0 && checkMatch.checkFor3HorMatch().length === 0){
                candiesArrayCopy = null;
                return false;
            }
            else{
                candiesArrayCopy = null;
                return true;
            }
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