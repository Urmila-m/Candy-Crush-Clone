class Game{
    constructor(){
        this.init();
        this.drawGrid();
        this.loadCandies();
        this.addEventListeners();
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

                let candyDrawn = new Candy(candy.color, x+CANDY_PADDING, y+CANDY_PADDING, candy.type);
                columnCandies.push(candyDrawn);
            }
            this.candiesArray.push(columnCandies);
        }
    }

    loadCandies(){
        this.img = new Image();
        this.img.src = 'images/spritesheet.png';
        this.img.onload = function(){
            this.fillCandies();
        }.bind(this);
    }
    
    isPointContained(x, y, candyLeft, candyTop){
        if(x >= (candyLeft + CANDY_PADDING) && x <= (candyLeft + CANDY_PADDING + CANDY_WIDTH) 
                && y >= (candyTop + CANDY_PADDING) && y <= (candyTop + CANDY_PADDING + CANDY_HEIGHT)){
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
                console.log("mouse down");
                this.selectedCandy = this.checkCandyClick(e.clientX, e.clientY);
                this.offsetX = e.clientX - this.selectedCandy.x;
                this.offsetY = e.clientY - this.selectedCandy.y;
                this.isDragging = true;
            }
        });
    
        // only drag/give co-ordinates if mouse down, if mouse up, don't do anything
        this.canvas.addEventListener('mouseup', this.mouseUpHandler);
        this.canvas.addEventListener('mousemove', this.mouseMoveHandler);
    }  

    mouseUpHandler(e){
        console.log("mouse up");
        this.isDragging = false;
        this.selectedCandy = null;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    mouseMoveHandler(e){
        if(this.isDragging){
            let spriteCandy = sprite[this.selectedCandy.color][this.selectedCandy.type];
            this.ctx.drawImage(this.img, spriteCandy.x, spriteCandy.y, sprite.width, sprite.height, e.clientX - this.offsetX, e.clientY - this.offsetY, CANDY_WIDTH, CANDY_HEIGHT);
        }
    }
}

new Game();