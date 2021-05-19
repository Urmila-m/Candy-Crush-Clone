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
    fillCandies(){
        for (let xCell = 0; xCell < 8; xCell++) {
            let columnCandies = []
            for (let yCell = 0; yCell < 8; yCell++) {
                let candy = this.chooseRandomCandy();

                const x = xCell * GRID_WIDTH;
                const y = yCell * GRID_HEIGHT;
                this.ctx.drawImage(this.img, candy.x, candy.y, sprite.width, sprite.height, x+CANDY_PADDING, y+CANDY_PADDING, CANDY_WIDTH, CANDY_HEIGHT);

                let candyDrawn = new Candy(candy.color, x+CANDY_PADDING, y+CANDY_PADDING, candy.type, yCell, xCell);
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
    
    isPointContained(x, y, candyLeft, candyTop, width=CANDY_WIDTH, height=CANDY_HEIGHT){
        if(x >= (candyLeft + CANDY_PADDING) && x <= (candyLeft + CANDY_PADDING + width) 
                && y >= (candyTop + CANDY_PADDING) && y <= (candyTop + CANDY_PADDING + height)){
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
        this.canvas.addEventListener('mousedown', (e)=>{
            if(this.checkCandyClick(e.clientX, e.clientY) !== null){
                this.selectedCandy = this.checkCandyClick(e.clientX, e.clientY);
                this.offsetX = e.clientX - this.selectedCandy.x;
                this.offsetY = e.clientY - this.selectedCandy.y;
                this.isDragging = true;
                this.canvas.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
            }
        });
    
        // only drag/give co-ordinates if mouse down, if mouse up, don't do anything
        this.canvas.addEventListener('mouseup', this.mouseUpHandler.bind(this));
    }  

    mouseUpHandler(e){
        console.log("up handler");
        if(this.isDragging){
            console.log("selected candy", this.selectedCandy);
            this.swapCandies(this.move);
            this.isDragging = false;
            this.selectedCandy = null;
            this.offsetX = 0;
            this.offsetY = 0;
            this.canvas.removeEventListener('mousemove', this.mouseMoveHandler.bind(this));
        }
    
    }

    mouseMoveHandler(e){
        if(this.isDragging){
            if((e.clientX - this.offsetX + CANDY_WIDTH + CANDY_PADDING) >= this.canvas.offsetWidth){
                console.log("mouse up handler from inside mouse move");
                this.mouseUpHandler(e);
                return;
            }

            if((e.clientY - this.offsetY + CANDY_HEIGHT + CANDY_PADDING) >= this.canvas.offsetHeight){
                console.log("mouse up handler from inside mouse move");
                this.mouseUpHandler(e);
                return;
            }

            let move = this.selectedCandy.isValidMove();
            if(move){
                this.move = move;
                this.selectedCandy.setPosition(e.clientX - this.offsetX, e.clientY - this.offsetY);
            }
            else{
                console.log("mouse up handler from inside mouse move");
                this.mouseUpHandler(e);
                return;
            }
        }
    }

    swapCandies(move){
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
            swapCandyRow = this.selectedCandy.row -1;
            candyToBeSwapped = this.placeSwappingCandy(swapCandyRow, swapCandyColumn);
            candyToBeSwapped.row += 1;
            this.selectedCandy.row -=1;
        }

        else if(move === MOVE_DOWN){
            swapCandyRow = this.selectedCandy.row + 1;
            candyToBeSwapped = this.placeSwappingCandy(swapCandyRow, swapCandyColumn);
            candyToBeSwapped.row -= 1;
            this.selectedCandy.row +=1;
        }

        this.resetSwappedCandiesPosition(candyToBeSwapped, swapCandyRow, swapCandyColumn);
    }

    resetSwappedCandiesPosition(candyToBeSwapped, swapCandyRow, swapCandyColumn){
        this.candiesArray[swapCandyColumn][swapCandyRow] = this.selectedCandy; 
        this.selectedCandy.x = this.selectedCandy.column * GRID_WIDTH + CANDY_PADDING;
        this.selectedCandy.y = this.selectedCandy.row * GRID_HEIGHT + CANDY_PADDING;
        candyToBeSwapped.x = candyToBeSwapped.column * GRID_WIDTH + CANDY_PADDING;
        candyToBeSwapped.y = candyToBeSwapped.row * GRID_HEIGHT +CANDY_PADDING;
    }

    placeSwappingCandy(swapCandyRow, swapCandyColumn){
        let candyToBeSwapped = this.candiesArray[swapCandyColumn][swapCandyRow];
        this.candiesArray[this.selectedCandy.column][this.selectedCandy.row] = candyToBeSwapped;
        return candyToBeSwapped;
    }

}

new Game();