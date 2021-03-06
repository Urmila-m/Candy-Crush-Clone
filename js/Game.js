class Game{
    constructor(targetScore, noOfMoves, gameOver, gameCompleted){
        this.targetScore = targetScore;
        this.noOfMoves = noOfMoves;
        this.highScore = localStorage.getItem("high-score")?localStorage.getItem("high-score"):0;
        this.gameOver = gameOver;
        this.gameCompleted = gameCompleted;
        this.speed = 40; // speed of candies falling
        this.init();
        this.drawGrid();
        this.loadCandies();
        this.addEventListeners();
        this.paintCanvas();
    }

    init(){
        this.getElements();
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = "palevioletred";
        this.ctx.lineWidth = 0.2;
        this.resetGame();
        this.setHTMLElements();
        this.rect = this.canvas.getBoundingClientRect();
    }

    resetGame(){
        this.score = 0;
        this.move = 0;
        this.offsetY = 0;
        this.offsetX = 0;
        this.candiesArray = []; 
        this.isDragging = false;
        this.selectedCandy = null; 
    }

    setHTMLElements(){
        this.noOfMovesBoard.innerHTML = this.noOfMoves;
        this.targetScoreBoard.innerHTML = this.targetScore;
        this.highScoreBoard.innerHTML = this.highScore;
        this.scoreBoard.innerHTML = this.score
    }

    getElements(){
        this.canvas = document.getElementById('canvas');
        this.scoreBoard = document.getElementById('score');
        this.noOfMovesBoard = document.getElementById('no-of-moves-left');
        this.targetScoreBoard = document.getElementById('target-score');
        this.highScoreBoard = document.getElementById('high-score');
        this.delicious = document.getElementById('delicious');
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

                let candyDrawn = new Candy(candy.color, x+CANDY_PADDING, y+CANDY_PADDING, candy.type, 7 - yCell, xCell, false);
                columnCandies.push(candyDrawn);
            }
            this.candiesArray.push(columnCandies);
        }
        // remove matched candies in the beginning
        new CheckForMatch(this.candiesArray).clearCandiesUntilStable(this.score, this.scoreBoard, INITIAL_CLEAR);
    }

    paintCanvas(){
        this.clearCanvas();
        this.drawGrid();
        for (let column of this.candiesArray){
            for(let candy of column){
                let spriteCandy = sprite[candy.color][candy.type];

                // adding candies falling animation
                if (candy.isMoving) {
                    if (! candy.hasReachedDestination()) {
                        candy.y = Math.min(candy.y+this.speed, ((7-candy.row) * GRID_HEIGHT + CANDY_PADDING));
                    }
                    else{
                        candy.isMoving = false;
                    }
                }
                this.ctx.drawImage(this.img, spriteCandy.x, spriteCandy.y, sprite.width, sprite.height, candy.x, candy.y, CANDY_WIDTH, CANDY_HEIGHT);
            }
        }
        this.animId = requestAnimationFrame(this.paintCanvas.bind(this));
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
            let x = e.clientX - this.rect.left;
            let y = e.clientY - this.rect.top;
            let candy = this.checkCandyClick(x, y);
            if(candy !== null){
                this.selectedCandy = candy;
                this.offsetX = x - this.selectedCandy.x;
                this.offsetY = y - this.selectedCandy.y;
                this.isDragging = true;
                document.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
            }
        });
    
        // only drag/give co-ordinates if mouse down, if mouse up, don't do anything
        document.addEventListener('mouseup', this.mouseUpHandler.bind(this));
    }  

    mouseUpHandler(e){
        if (this.selectedCandy) {
            //false if not swap, else gives the candy pair swapped 
            let swap = new SwapCandy(this.selectedCandy, this.candiesArray).swapCandies(this.move);
            this.isDragging = false;
            this.offsetX = 0;
            this.offsetY = 0;
            document.removeEventListener('mousemove', this.mouseMoveHandler.bind(this));

            if(swap){
                // this.delicious.style.display = 'block';
                let checkForMatch = new CheckForMatch(this.candiesArray);
                if (swap[0].type === 'color_bomb' || swap[1].type === 'color_bomb'){
                    checkForMatch.handleColorBomb(swap, this.score, this.scoreBoard, this.updateScore.bind(this));
                }
                checkForMatch.clearCandiesUntilStable(this.score, this.scoreBoard, USER_CLEAR, this.updateScore.bind(this), this.targetScore, this.gameCompleted, this.onCandiesClear.bind(this));
            }
            else{
                this.selectedCandy.resetPosition();
            }
            
            this.selectedCandy = null;
        }
    }

    onCandiesClear(){
        // this.delicious.style.display = 'block';
        // setTimeout(()=>{
        //     this.delicious.style.display = 'none';
        // }, 300);
        this.noOfMoves -= 1;
        this.noOfMovesBoard.innerHTML = this.noOfMoves;
        if (this.noOfMoves <= 0) {
            if (this.targetScore>this.score) {
                cancelAnimationFrame(this.animId);
                this.updateHighScore();
                this.gameOver();
            }
        }
        if (this.score >= targetScore){

            console.log("you winnnnnn!!!!!");
            cancelAnimationFrame(this.animId);
            this.updateHighScore();
            gameCompleted();
        }
    }

    updateHighScore(){
        if (this.score > this.highScore) {
            localStorage.setItem("high-score", this.score);
        }
        this.highScore = this.score;
    }

    updateScore(score){
        this.score = score;
    }

    mouseMoveHandler(e){
        if(this.isDragging){
            let x = e.clientX - this.rect.left;
            let y = e.clientY - this.rect.top;
            // check for mouse movement for right/left edged candies and bottom/top edged candies
            if(((x - this.offsetX + CANDY_WIDTH + CANDY_PADDING) > this.canvas.offsetWidth)
                || ((y - this.offsetY + CANDY_HEIGHT + CANDY_PADDING) > this.canvas.offsetHeight)
                || (x - this.offsetX) < 0
                || (y - this.offsetY) < 0){

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
                this.selectedCandy.setPosition(x - this.offsetX, y - this.offsetY);
            }
            else{
                console.log("invalid move");
                document.removeEventListener('mousemove', this.mouseMoveHandler.bind(this));
            }
        }
    }
}