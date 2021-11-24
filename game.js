const X_CLASS = 'x';
const O_CLASS = 'o';
const NO_CLASS = '';
const CELLS = Array.from(document.querySelectorAll('[data-cell]'));
const WIN_MSG = document.getElementById('winning-message');
const WIN_MSG_TXT = document.querySelector('[data-winning-message-text]');
const PLAYER_SELECT = document.getElementById('player-select');
const BOARD = document.getElementById('board');
const WIN_SEQS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

var current_player = X_CLASS;
var ai_enabled = false;

runGame();

function runGame() {
    firstTimeSetup();    
    displayPlayer();
}

function firstTimeSetup(){
    setup();
    document.getElementById("restart-button").addEventListener('click', restartButtonHandler);
    document.getElementById("single-player").addEventListener('click', singlePlayerHandler);
    document.getElementById("multi-player").addEventListener('click', multiPlayerHandler);
}

function setup() {
    CELLS.forEach(cell => {
        cell.addEventListener('click', cellHandler, {once:true})
    });
    generateNewBoard();
    current_player = X_CLASS;
    setBoardClass();
}

function setBoardClass() { //used to display symbols on hover
    if (current_player == X_CLASS) {
        BOARD.classList.remove(O_CLASS);
        BOARD.classList.add(X_CLASS);
    } else {
        BOARD.classList.remove(X_CLASS);
        BOARD.classList.add(O_CLASS);
    }
}

function cellHandler(e) {
    const cell = e.target;
    markCell(cell, current_player);
    if (isWin()) {
        displayWin();
        return;
    } else if (isDraw()) {
        displayDraw();
        return;
    }
    swapPlayer();
}

function restartButtonHandler(e) {
    current_player = X_CLASS;
    for (const cell of CELLS) {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
    }
    WIN_MSG.classList.remove('show');
    setup();
    displayPlayer();
}

function singlePlayerHandler(e) {
    ai_enabled = true;
    PLAYER_SELECT.classList.remove('show');
}

function multiPlayerHandler(e) {
    ai_enabled = false;
    PLAYER_SELECT.classList.remove('show');
}

function markCell(cell) {
    if (current_player == X_CLASS){
        cell.classList.add(X_CLASS);
    } else {
        cell.classList.add(O_CLASS);
    }
}

function swapPlayer() {
    if (current_player == X_CLASS) {
        current_player = O_CLASS;
        if (ai_enabled) {
            runAI();
        }
    } else {
        current_player = X_CLASS;
    }
    setBoardClass();
}

function isDraw() {
    for (const cell of CELLS) {
        if (!(cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS))) {
            return false;
        }
    }
    return true;
}

function isWin() { 
    for (const seq of WIN_SEQS) {
        let goal = seq.length;
        for (let i = 0; i < seq.length; i++) {
            if (CELLS[seq[i]].classList.contains(current_player)) {
                goal--;
            } else {
                break;
            }
        }
        if (goal == 0) {
            return true;
        }
    }
    return false;  
}

function displayWin() {
    if (current_player == X_CLASS){
        WIN_MSG_TXT.innerHTML = 'X wins.';
    } else {
        WIN_MSG_TXT.innerHTML = 'O wins.';
    }
    WIN_MSG.classList.add('show');
}

function displayDraw() {
    WIN_MSG_TXT.innerHTML = 'Draw.';
    WIN_MSG.classList.add('show');
}

function displayPlayer() {
    PLAYER_SELECT.classList.add('show');
}
