var playBtn = document.getElementById('play-img');
var startScreen = document.getElementById('start-screen');
var gameBlock = document.getElementById('game-block');
var gameOverBlock = document.getElementById('game-over-screen')
var gameOverScore = document.getElementById('game-over-score');
var retryBtn = document.getElementById('retry');
var winScreen= document.getElementById('win-screen');
var restartBtn = document.getElementById('restart');
var game;
var targetScore = 150;
var noOfMoves = 20;

playBtn.addEventListener('click', ()=>{
    startScreen.style.display = 'none';
    gameBlock.style.display = 'block';
    gameOverBlock.style.display = 'none';
    winScreen.style.display = 'none';
    if (game instanceof Game) {
        game.resetGame();
        game.noOfMoves = noOfMoves;
        game.clearCanvas();
        game.drawGrid();
        game.fillCandies();
        game.setHTMLElements();
        game.paintCanvas();
    }
    else{
        game = new Game(targetScore, noOfMoves, gameOver, gameCompleted);
    }
});

function gameOver(){
    gameOverBlock.style.display = 'block';
    retryBtn.addEventListener('click', ()=>{
       setStartScreen();
    });
}

function gameCompleted(){
    winScreen.style.display = 'block';
    restartBtn.addEventListener('click', ()=>{
        setStartScreen();
    });
}

function setStartScreen(){
    startScreen.style.display = 'block';
    gameBlock.style.display = 'none';
}