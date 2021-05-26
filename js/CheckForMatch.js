class CheckForMatch{
    constructor(candiesArray){
        this.candiesArray = candiesArray;
        this.isStable = false;
        this.clearId = undefined;
        this.isStable = false;
        this.score = 0;
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
        console.log("3ver", match.length);
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
        console.log("3hor", match.length);
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
        console.log("4ver", match.length);
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
        console.log("4hor", match.length);
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
        console.log("5ver", match.length);
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
        console.log("5hor", match.length);
        return match;
    } 

    clearMatchedCandies(initial, updateScore, match, matchType=MATCH_VER){
        for(let group of match){
            for(let matchObject of group){
                let col = matchObject[0].col;
                let row = matchObject[0].row;
                let stripedCandy = null;

                for(let obj of matchObject){
                    if (this.candiesArray[obj.col][obj.row].type === "vstriped" || this.candiesArray[obj.col][obj.row].type === "hstriped") {
                        stripedCandy = this.candiesArray[obj.col][obj.row];
                    }

                }

                this.bringCandiesDown(initial, updateScore, row, col, matchObject.length, stripedCandy, matchType);
                this.scoreBoard.innerHTML = this.score;
                this.addNewCandies();
            }
        }
    }

    bringCandiesDown(initial, updateScore, row, col, matchObjectLength, stripedCandy, type=MATCH_VER){
        if(type === MATCH_VER){ 
            // striped candy present in the match
            if(stripedCandy){
                if (stripedCandy.type === "vstriped") {
                    for(let candy of this.candiesArray[stripedCandy.column]){
                        if (candy.type === "hstriped") {
                            this.spliceCandiesInRow(candy.row);
                            this.resetPosUpperCandiesInRow(candy.row);
                        }
                    }
                    this.candiesArray[stripedCandy.column] = [];
                    this.score += 8; 
                }
                // striped candy is horizontally striped
                else{
                    for(let column of this.candiesArray){
                        if (this.candiesArray.findIndex(val=>val === column)!== col) {
                            if (column[stripedCandy.row].type === "vstriped") {
                                column = [];
                                this.score += 8;
                            }
                            else{
                                column.splice(stripedCandy.row, 1);
                                this.score += 1;
                                // this.resetPositionUpperCandiesInRow(stripedCandy.row);
                                for(let j=stripedCandy.row; j<column.length; j++){
                                    column[j].row = j;
                                    column[j].resetPosition();
                                }
                            }
                        }
                    }
                    this.spliceCandiesInCol(row, col, matchObjectLength);
                    this.resetPosUpperCandiesInCol(row, col);
                }
            }
            // striped candy not present in the match
            else{
                if(matchObjectLength === 4 && initial === USER_CLEAR){
                    this.candiesArray[col][row].type = "hstriped";
                    this.spliceCandiesInCol(row+1, col, matchObjectLength - 1, initial);
                }
                else{
                    this.spliceCandiesInCol(row, col, matchObjectLength, initial);
                }

                for(let k = row; k < this.candiesArray[col].length; k++){
                    if(matchObjectLength === 4 && initial === USER_CLEAR){
                        if(k >= row+1){
                            this.candiesArray[col][k].row = k;
                            this.candiesArray[col][k].resetPosition();
                        }
                    }
                    else{
                        this.candiesArray[col][k].row = k;
                        this.candiesArray[col][k].resetPosition();
                    }
                }
            }
        }
        // horizontal match
        else{
            if(stripedCandy){
                if (stripedCandy.type === "vstriped") {
                    for(let candy of this.candiesArray[stripedCandy.column]){
                        if(candy !== stripedCandy){
                            if (candy.type === "hstriped") {
                                this.spliceCandiesInRow(candy.row);
                                this.resetPosUpperCandiesInRow(candy.row);
                            }
                        }
                    }

                    this.candiesArray[stripedCandy.column] = [];
                    this.score += 8;
                    
                    for(let j=col; j<(col+matchObjectLength); j++){
                        if (j !== stripedCandy.column){
                            this.candiesArray[j].splice(row, 1);
                            this.score+=1;
                        }
                    }
                    for(let j=col; j<(col+matchObjectLength); j++){
                        if (j !== stripedCandy.column){
                            this.resetPosUpperCandiesInCol(row, j);
                        }
                    }
                }
                // candy is horizontally striped
                else{
                    for(let column of this.candiesArray){
                        if (column[stripedCandy.row].type === "vstriped") {
                            column.splice(0, 8);
                            this.score += 8;
                        }
                        
                    }
                    for(let column of this.candiesArray){
                        if (column[stripedCandy.row]) {
                            column.splice(stripedCandy.row, 1);
                            this.score += 1;
                        }
                    }

                    for(let column of this.candiesArray){
                        if(column[stripedCandy.row]){
                            this.resetPosUpperCandiesInCol(stripedCandy.row, this.candiesArray.findIndex(val=> val===column));
                        }
                    }
                }
            }
            // striped candy not present in the match
            else{
                for(let j=col; j<(col+matchObjectLength); j++){
                    if(j === col){
                        if(matchObjectLength === 4 && initial === USER_CLEAR){
                            this.candiesArray[j][row].type = "vstriped";
                        }
                        else{
                            this.candiesArray[j].splice(row, 1);
                        }
                    }
                    else{
                            this.candiesArray[j].splice(row, 1);
                    }

                    if(initial === USER_CLEAR){
                        this.score +=1;
                    }

                }

                for(let j=col; j<(col+matchObjectLength); j++){
                    for(let i=row; i<this.candiesArray[j].length; i++){
                        if(matchObjectLength === 4 && initial === USER_CLEAR){
                            if(j !== col){
                                this.candiesArray[j][i].row = i;
                                this.candiesArray[j][i].resetPosition();
                            }
                        }
                        else{
                            this.candiesArray[j][i].row = i;
                            this.candiesArray[j][i].resetPosition();

                        }
                        
                    }
                }
            }
           
        }
        if(initial === USER_CLEAR){
            updateScore(this.score);
        }
    }
    
    spliceCandiesInRow(row){
        for(let column of this.candiesArray){
            column.splice(row, 1);
            this.score += 1;
        }
    }

    spliceCandiesInCol(row, col, matchObjectLength, initial){
        this.candiesArray[col].splice(row, matchObjectLength);
        if (initial === USER_CLEAR) {
            this.score += matchObjectLength;
        }
    }

    resetPosUpperCandiesInRow(row){
        for(let i=0; i<this.candiesArray.length; i++){
            for(let j=row; j<this.candiesArray[i].length; j++){
                this.candiesArray[i][j].row = j;
                this.candiesArray[i][j].resetPosition();
            }
        }
    }

    resetPosUpperCandiesInCol(row, col){
        for(let j=row; j<this.candiesArray[col].length;j++){
                this.candiesArray[col][j].row = j;
                this.candiesArray[col][j].resetPosition();
            }
    }

    addNewCandies(){
        for(let column of this.candiesArray){
            for(let i=column.length; i<8; i++){
                let candyObj = this.chooseRandomCandy();
                let candy = new Candy(candyObj.color, 0, 0, candyObj.type, i, this.candiesArray.findIndex(val=> val===column));
                candy.resetPosition();
                column.push(candy);
            }
        }
    } 

    getCandy(color, type){
        let candy_obj = sprite[color];
        let candy = candy_obj[type];
        candy.type = type;
        candy.color = color;
        return candy;
    }
    
    chooseRandomCandy(type='solid'){
        let candy_index = Math.floor(Math.random()*5);
        let candy_obj = sprite[COLORS[candy_index]];
        let candy = candy_obj[type];
        candy.type = type;
        candy.color = COLORS[candy_index];
        return candy;
    } 

    checkAndClearAllMatches(initial, updateScore){
        console.log("clear candies iteration");
        let mh5;
        let mv5;
        let mh4;
        let mv4;
        let mv3;
        let mh3;
     
        if(!this.isStable){
            mh5 = this.checkFor5HorMatch();
            this.clearMatchedCandies(initial, updateScore, mh5, MATCH_HOR);
            mv5 = this.checkFor5VerMatch();
            this.clearMatchedCandies(initial, updateScore, mv5);
            mh4 = this.checkFor4HorMatch();
            this.clearMatchedCandies(initial, updateScore, mh4, MATCH_HOR);
            mv4 = this.checkFor4VerMatch();
            this.clearMatchedCandies(initial, updateScore, mv4)
            mv3 = this.checkFor3VerMatch();
            this.clearMatchedCandies(initial, updateScore, mv3);
            mh3 = this.checkFor3HorMatch();
            this.clearMatchedCandies(initial, updateScore, mh3, MATCH_HOR);

            if(mv5.length === 0 && mh4.length === 0 && mh5.length === 0 && mh3.length === 0 && mv4.length === 0 && mv3.length === 0){
            // if (mv4.length === 0 || mh4.length === 0) {
                console.log("stop the execution");
                this.isStable = true;
                clearInterval(this.clearId);
            }
        }
    };

    clearCandiesUntilStable(score, scoreBoard, initial, updateScore){
        this.score = score;
        this.scoreBoard = scoreBoard;
        this.clearId = setInterval(()=>{this.checkAndClearAllMatches(initial, updateScore)}, 1000);
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