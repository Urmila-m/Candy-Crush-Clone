class CheckForMatch{
    constructor(candiesArray){
        this.candiesArray = candiesArray;
    }

    checkFor3VerMatch(){ 
        let match = [];

        for(let i=0; i<this.candiesArray.length; i++){
            let group = [];
            for(let j=0; j < this.candiesArray[i].length-2; j++){ 
                if(this.candiesArray[i][j].color === this.candiesArray[i][j+1].color 
                        && this.candiesArray[i][j+1].color === this.candiesArray[i][j+2].color){
                            group.push([{"row":j, "col":i}, {"row": j+1, "col":i}, {"row":j+2, "col":i}]);
                        }
            }
            if (group.length !== 0) match.push(group);
        }
        console.log("ver", match);
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
            if (group.length !== 0) match.push(group);
        }
        console.log("hor", match);
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
            if (group.length !== 0) match.push(group);
        }
        console.log("ver", match);
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
            if (group.length !== 0) match.push(group);
        }
        console.log("hor", match);
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
            if (group.length !== 0) match.push(group);
        }
        console.log("ver", match);
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
            if (group.length !== 0) match.push(group);
        }
        console.log("hor", match);
        return match;
    } 
    
    clearMatchedCandies(match){
        for(let group of match){
            for(let matchObject of group){
                for(let value of Object.values(matchObject)){
                    let candy = this.candiesArray[value[1]][value[0]];
                    this.clearCandy(candy);
                    this.candiesArray[candy.column].splice(candy.row, 1);

                }
            }
        }
    }
}