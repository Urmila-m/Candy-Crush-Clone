var playBtn = document.getElementById('play-img');
var startScreen = document.getElementById('start-screen');
var gameBlock = document.getElementById('game-block');
var gameOverBlock = document.getElementById('game-over-screen')
var gameOverScore = document.getElementById('game-over-score');
var retryBtn = document.getElementById('retry');
var game;
var targetScore = 200;
var noOfMoves = 5;

playBtn.addEventListener('click', ()=>{
    startScreen.style.display = 'none';
    gameBlock.style.display = 'block';
    gameOverBlock.style.display = 'none';
    game = new Game(targetScore, noOfMoves, gameOver);
});

function gameOver(){
    gameOverBlock.style.display = 'block';
    retryBtn.addEventListener('click', ()=>{
        startScreen.style.display = 'block';
        gameBlock.style.display = 'none';
    })
}