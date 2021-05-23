class Game{
    constructor(){
        this.init();
        this.drawGrid();
        this.loadCandies();
        new CheckForMatch(this.candiesArray).clearCandiesUntilStable(this.score, this.scoreBoard, INITIAL_CLEAR);
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
        this.score = 0;
        this.scoreBoard = document.getElementById('score');
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
        let swap = new SwapCandy(this.selectedCandy, this.candiesArray).swapCandies(this.move);
        console.log("swap", swap);
        this.isDragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
        document.removeEventListener('mousemove', this.mouseMoveHandler.bind(this));

        if(swap){
            let checkForMatch = new CheckForMatch(this.candiesArray);
            checkForMatch.clearCandiesUntilStable(this.score, this.scoreBoard, USER_CLEAR, this.updateScore.bind(this));
        }
        else{
            this.selectedCandy.resetPosition();
            console.log(this.candiesArray);
        }
        
        this.selectedCandy = null;

    }

    updateScore(score){
        this.score = score;
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
                document.removeEventListener('mousemove', this.mouseMoveHandler.bind(this));
            }
        }
    }
}

new Game();