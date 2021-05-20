class CheckForMatch{
    constructor(candiesArray){
        this.candiesArray = candiesArray;
    }

    checkFor3VerMatch(){ 
        // match represents match in overall grid
        let match = [];

        for(let i=0; i<this.candiesArray.length; i++){
            // group represent matches in a row or a column
            let group = [];
            for(let j=0; j < this.candiesArray[i].length-2; j++){ 
                if(this.candiesArray[i][j].color === this.candiesArray[i][j+1].color 
                        && this.candiesArray[i][j+1].color === this.candiesArray[i][j+2].color){
                            group.push([{"row":j, "col":i}, {"row": j+1, "col":i}, {"row":j+2, "col":i}]);
                        }
            }
            group = this.removeRepeatedGroups(group, MATCH_VER);
            if (group.length !== 0) match.push(group);
        }
        console.log("3ver", match);
        return match;
    }

    checkFor3HorMatch(){
        let match = [];

        for(let i=0; i<this.candiesArray[0].length; i++){
            let group = [];
            for(let j=0; j < this.candiesArray.length-2; j++){
                if(this.candiesArray[j][i].color === this.candiesArray[j+1][i].color && 
                    this.candiesArray[j+1][i].color === this.candiesArray[j+2][i].color){

                            group.push([{"row" :i, "col": j}, {"row":i, "col":j+1}, {"row":i, "col":j+2}]);
                        }
            }
            group = this.removeRepeatedGroups(group, MATCH_HOR);
            if (group.length !== 0) match.push(group);
        }
        console.log("3hor", match);
        return match;
    }

    checkFor4VerMatch(){ 
        let match = [];

        for(let i=0; i<this.candiesArray.length; i++){
            let group = [];
            for(let j=0; j < this.candiesArray[i].length-3; j++){ 
                if(this.candiesArray[i][j].color === this.candiesArray[i][j+1].color 
                        && this.candiesArray[i][j+1].color === this.candiesArray[i][j+2].color
                        && this.candiesArray[i][j+2].color === this.candiesArray[i][j+3].color){
                            group.push([{"row":j, "col":i}, {"row": j+1, "col":i}, {"row":j+2, "col":i}, {"row":j+3, "col":i}]);
                        }
            }
            group = this.removeRepeatedGroups(group, MATCH_VER);
            if (group.length !== 0) match.push(group);
        }
        console.log("4ver", match);
        return match;
    }  

    checkFor4HorMatch(){
        let match = [];

        for(let i=0; i<this.candiesArray[0].length; i++){
            let group = [];
            for(let j=0; j < this.candiesArray.length-3; j++){
                if(this.candiesArray[j][i].color === this.candiesArray[j+1][i].color && 
                    this.candiesArray[j+1][i].color === this.candiesArray[j+2][i].color
                    && this.candiesArray[j+2][i].color === this.candiesArray[j+3][i].color){

                            group.push([{"row" :i, "col": j}, {"row":i, "col":j+1}, {"row":i, "col":j+2}, {"row": i, "col": j+3}]);
                        }
            }
            group = this.removeRepeatedGroups(group, MATCH_HOR);
            if (group.length !== 0) match.push(group);
        }
        console.log("4hor", match);
        return match;
    }
    
    checkFor5VerMatch(){ 
        let match = [];

        for(let i=0; i<this.candiesArray.length; i++){
            let group = [];
            for(let j=0; j < this.candiesArray[i].length-4; j++){ 
                if(this.candiesArray[i][j].color === this.candiesArray[i][j+1].color 
                        && this.candiesArray[i][j+1].color === this.candiesArray[i][j+2].color
                        && this.candiesArray[i][j+2].color === this.candiesArray[i][j+3].color
                        && this.candiesArray[i][j+3].color === this.candiesArray[i][j+4].color){

                            group.push([{"row":j, "col":i}, {"row": j+1, "col":i}, {"row":j+2, "col":i}, {"row":j+3, "col":i}, {"row":j+4, "col":i}]);
                        }
            }

            group = this.removeRepeatedGroups(group, MATCH_VER);

            if (group.length !== 0) match.push(group);
        }
        console.log("5ver", match);
        return match;
    }  

    checkFor5HorMatch(){
        let match = [];

        for(let i=0; i<this.candiesArray[0].length; i++){
            let group = [];
            for(let j=0; j < this.candiesArray.length-4; j++){
                if(this.candiesArray[j][i].color === this.candiesArray[j+1][i].color && 
                    this.candiesArray[j+1][i].color === this.candiesArray[j+2][i].color
                    && this.candiesArray[j+2][i].color === this.candiesArray[j+3][i].color
                    && this.candiesArray[j+3][i].color === this.candiesArray[j+4][i].color){

                            group.push([{"row" :i, "col": j}, {"row":i, "col":j+1}, {"row":i, "col":j+2}, {"row": i, "col": j+3}, {"row": i, "col": j+4}]);
                        }
            }

            group = this.removeRepeatedGroups(group, MATCH_HOR);

            if (group.length !== 0) match.push(group);
        }
        console.log("5hor", match);
        return match;
    } 

    clearMatchedCandies(match, matchType=MATCH_VER){
        for(let group of match){
            for(let matchObject of group){
                let col = matchObject[0].col;
                let row = matchObject[0].row;

                this.bringCandiesDown(row, col, matchObject.length, matchType);
                this.addNewCandies(col, matchObject.length, matchType);
            }
        }
    }

    bringCandiesDown(row, col, matchObjectLength, type=MATCH_VER){
        if(type === MATCH_VER){
            this.candiesArray[col].splice(row, matchObjectLength);

            for(let k = row; k < this.candiesArray[col].length; k++){
                    this.candiesArray[col][k].row = k;
                    this.candiesArray[col][k].resetPosition();
                }
        }
        else{
            for(let j=col; j<(col+matchObjectLength); j++){
                        this.candiesArray[j].splice(row, 1);
                    }

            for(let j=col; j<(col+matchObjectLength); j++){
                for(let i=row; i<this.candiesArray[j].length; i++){
                    this.candiesArray[j][i].row = i;
                    this.candiesArray[j][i].resetPosition();
                }
            }
        }
    }

    addNewCandies(col, matchObjectLength, type=MATCH_VER){
        if(type === MATCH_VER){
            for(let k=this.candiesArray[col].length; k<8; k++){
                let candyObj = this.chooseRandomCandy();
                let candy = new Candy(candyObj.color,0, 0, candyObj.type, k, col);
                candy.resetPosition();
                this.candiesArray[col].push(candy);
            }
        }
        else{
            for(let j=col; j<(col+matchObjectLength); j++){
                let candyObj = this.chooseRandomCandy();

                // new candy always gets pushed to the top, i.e. row = 7
                let candy = new Candy(candyObj.color, 0, 0, candyObj.type, 7, j);
                candy.resetPosition();
                this.candiesArray[j].push(candy);
            }
        }
    } 
    
    chooseRandomCandy(type='solid'){
        let candy_index = Math.floor(Math.random()*5);
        let candy_obj = sprite[COLORS[candy_index]];
        let candy = candy_obj[type];
        candy.type = type;
        candy.color = COLORS[candy_index];
        return candy;
    } 

    checkAndClearAllMatches(){
        this.clearMatchedCandies(this.checkFor5HorMatch(), MATCH_HOR);
        this.clearMatchedCandies(this.checkFor5VerMatch());
        this.clearMatchedCandies(this.checkFor4HorMatch(), MATCH_HOR);
        this.clearMatchedCandies(this.checkFor4VerMatch());
        this.clearMatchedCandies(this.checkFor3HorMatch(), MATCH_HOR);
        this.clearMatchedCandies(this.checkFor3VerMatch());
        
    }

    removeRepeatedGroups(group, groupType){
        let repeatIndex = [];
        for(let i=0; i<group.length-1; i++){
            if(groupType === MATCH_HOR){
                if(group[i][group[i].length-1].col >= group[i+1][0].col){
                    repeatIndex.push(i+1);
                }
            }
            else{
                if(group[i][group[i].length-1].row >= group[i+1][0].row){
                    repeatIndex.push(i+1);
                }
            }
        }

        for(let i=0; i<repeatIndex; i++){
            group.splice(repeatIndex[i], 1);
        }

        return group;
    }
}