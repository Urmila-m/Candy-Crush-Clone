class Game{
    constructor(){
        this.init();
        this.drawGrid();
        this.loadCandies();
        this.addEventListeners();
        this.paintCanvas();

    }

    init(){
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext("2d");
        this.ctx.strokeStyle = "palevioletred";
        this.ctx.lineWidth = 0.2;
        this.candiesArray = [];
        this.isDragging = false;
        this.selectedCandy = null;
        this.offsetX = 0;
        this.offsetY = 0;
        this.move = 0;
    }

    drawGrid(){
        for (let i = 0; i <= 8; i++) {

            const x = i*GRID_WIDTH;
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, canvas.height);
            
            const y = i*GRID_HEIGHT;
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(canvas.width, y);
            this.ctx.stroke();
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

    // candies are filled vertically first
    // fillCandies(){
    //     for (let xCell = 0; xCell < 8; xCell++) {
    //         let columnCandies = []
    //         for (let yCell = 0; yCell < 8; yCell++) {
    //             let candy = this.chooseRandomCandy();

    //             const x = xCell * GRID_WIDTH;
    //             const y = yCell * GRID_HEIGHT;
    //             this.ctx.drawImage(this.img, candy.x, candy.y, sprite.width, sprite.height, x+CANDY_PADDING, y+CANDY_PADDING, CANDY_WIDTH, CANDY_HEIGHT);

    //             let candyDrawn = new Candy(candy.color, x+CANDY_PADDING, y+CANDY_PADDING, candy.type, yCell, xCell);
    //             columnCandies.push(candyDrawn);
    //         }
    //         this.candiesArray.push(columnCandies);
    //     }
    // } 
    
    fillCandies(){
        for (let xCell = 0; xCell < 8; xCell++) {
            let columnCandies = []
            for (let yCell = 7; yCell >= 0; yCell--) {
                let candy = this.chooseRandomCandy();

                const x = xCell * GRID_WIDTH;
                const y = yCell * GRID_HEIGHT;
                this.ctx.drawImage(this.img, candy.x, candy.y, sprite.width, sprite.height, x+CANDY_PADDING, y+CANDY_PADDING, CANDY_WIDTH, CANDY_HEIGHT);

                let candyDrawn = new Candy(candy.color, x+CANDY_PADDING, y+CANDY_PADDING, candy.type, 7 - yCell, xCell);
                columnCandies.push(candyDrawn);
            }
            this.candiesArray.push(columnCandies);
        }
    }

    paintCanvas(){
        this.clearCanvas();
        this.drawGrid();
        for (let column of this.candiesArray){
            for(let candy of column){
                let spriteCandy = sprite[candy.color][candy.type];
                this.ctx.drawImage(this.img, spriteCandy.x, spriteCandy.y, sprite.width, sprite.height, candy.x, candy.y, CANDY_WIDTH, CANDY_HEIGHT);
            }
        }
        requestAnimationFrame(this.paintCanvas.bind(this));
    }

    clearCanvas(){
        this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    }

    loadCandies(){
        this.img = new Image();
        this.img.src = 'images/spritesheet.png';
        this.img.onload = function(){
            this.fillCandies();
        }.bind(this);
    }
    
    isPointContained(x, y, candyLeft, candyTop){
        if(x >= (candyLeft) && x <= (candyLeft + CANDY_WIDTH) 
                && y >= (candyTop) && y <= (candyTop + CANDY_HEIGHT)){
                    return true;
        }
        else{
            return false;
        }
    }

    checkCandyClick(x, y){
        for (let column of this.candiesArray){
            for(let candy of column){
                if(this.isPointContained(x, y, candy.x, candy.y)){
                    return candy;
                }
            }
        }
        return null;
    }
    
    addEventListeners(){
        // for drag and drop
        document.addEventListener('mousedown', (e)=>{
            let candy = this.checkCandyClick(e.clientX, e.clientY);
            if(candy !== null){
                this.selectedCandy = candy;
                this.offsetX = e.clientX - this.selectedCandy.x;
                this.offsetY = e.clientY - this.selectedCandy.y;
                this.isDragging = true;
                document.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
            }
        });
    
        // only drag/give co-ordinates if mouse down, if mouse up, don't do anything
        document.addEventListener('mouseup', this.mouseUpHandler.bind(this));
    }  

    mouseUpHandler(e){
        this.swapCandies(this.move);
        this.isDragging = false;
        this.selectedCandy = null;
        this.offsetX = 0;
        this.offsetY = 0;
        document.removeEventListener('mousemove', this.mouseMoveHandler.bind(this));
        this.clearMatchedCandies(new CheckForMatch(this.candiesArray).checkFor5VerMatch());
    }

    mouseMoveHandler(e){
        if(this.isDragging){
            
            // check for mouse movement for right edged candies and bottom row candies
            if(((e.clientX - this.offsetX + CANDY_WIDTH + CANDY_PADDING) > this.canvas.offsetWidth)
                || ((e.clientY - this.offsetY + CANDY_HEIGHT + CANDY_PADDING) > this.canvas.offsetHeight)){

                    console.log("edge invalid move");
                    this.isDragging = false;
                    this.move = DONT_MOVE;
                    this.selectedCandy.resetPosition();
                    document.removeEventListener('mousemove', this.mouseMoveHandler.bind(this));
                    return;
            }

            let move = this.selectedCandy.isValidMove();
            if(move){
                this.move = move;
                this.selectedCandy.setPosition(e.clientX - this.offsetX, e.clientY - this.offsetY);
            }
            else{
                console.log("invalid move");
            }
        }
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

    clearCandy(candy){
        this.ctx.clearRect(candy.x, candy.y, CANDY_WIDTH, CANDY_HEIGHT);
    }

    clearMatchedCandies(match){
        for(let group of match){
            for(let matchObject of group){
                let col = matchObject[0].col;
                let row = matchObject[0].row;
                for(let i=0; i<matchObject.length; i++){
                    this.candiesArray[col].splice(row, 1);
                    //  this.ctx.clearRect(row * CANDY_HEIGHT + CANDY_PADDING, col* CANDY_WIDTH + CANDY_PADDING, CANDY_WIDTH, CANDY_HEIGHT);
                }
                // for(let matchCandy of matchObject){
                //     let candy = this.candiesArray[matchCandy.col][matchCandy.row];
                //     console.log("candy to be cleared")
                //     this.clearCandy(candy);
                //     // console.log("removed position", this.candiesArray[candy.column][candy.row]);
                // }
            }
        }
    }

    bringDownCandy(matchedCandy){
        this.candiesArray[matchedCandy.column][matchedCandy.row-1]

    }

}

new Game();