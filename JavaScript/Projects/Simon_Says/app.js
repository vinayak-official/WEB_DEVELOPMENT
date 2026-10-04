let gameSeq = [];
let userSeq = [];

let buttons = ['yellow', 'green', 'orange', 'blue']

let gameStarted = false;
let level = 0;
let highscore = 0;

let h2 = document.querySelector('h2');
let btns = document.querySelectorAll('.btn');
let highScore = document.querySelector('#highscore');

document.addEventListener('keypress', function(){
    if (gameStarted == false) {
       console.log('Game Started!');
       gameStarted = true;
       levelup();
    }
});

function levelup() {
    userSeq=[];
    level++;
    h2.innerText = `level - ${level}`;
    let randIndx = Math.floor(Math.random()*4);
    let randColor = buttons[randIndx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    flash(randBtn, 250);
};

function flash(btn, time){
    btn.classList.add('flash');
    setTimeout(() => {
    btn.classList.remove('flash');
    }, time);
};

function btnPress() {
    let btn = this;
    let userColor = this.getAttribute('id');

    userSeq.push(userColor);
    flash(btn, 250);

    checkColor(userSeq.length - 1);
};

let allBtns = document.querySelectorAll('.btn');
for (btn of allBtns) {
    btn.addEventListener('click', btnPress);
};

function checkColor(idx){
    if (userSeq[idx] == gameSeq[idx]){
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else{
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b>. <br>Press any key to start.`;
        console.log('Game Over!');
        high_score();
        redflash();
        reset();
    };
};

function reset(){
    gameStarted = false;
    gameSeq = [];
    userSeq = [];
    level = 0; 
};

function redflash(){
    let box = document.querySelector('.simonSaysGame');
    box.classList.add('redflash');
    setTimeout(() => {
        box.classList.remove('redflash');
    }, 250);
};

function high_score() {
    if (highscore < level) {
        highscore = level;
    }
    highScore.innerHTML = `High Score: ${highscore}`;
}