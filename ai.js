var ai_board = []; //stored as a 1D array in order to map to cell array

function generateNewBoard() {
    ai_board = [];
    for (let i = 0; i < 9; i++) {
        ai_board.push(NO_CLASS);
    }
}

function updateBoard() {
    for (let i = 0; i < CELLS.length; i++) {
        if (CELLS[i].classList.contains(X_CLASS)){
            ai_board[i] = X_CLASS;
        } else if (CELLS[i].classList.contains(O_CLASS)) {
            ai_board[i] = O_CLASS;
        }
    }
}

function getPossibleMoves(board_state) {
    var moves = [];
    for (let i = 0; i < board_state.length; i++) {
        if (board_state[i] == NO_CLASS) {
            moves.push(i);
        }   
    }
    return moves;
}

function minimax(board_state, player, a, b) {
    const winner = winFound(board_state);

    if (winner == X_CLASS) {
        return 1;
    } else if (winner == O_CLASS) {
        return -1;
    }

    if (drawFound()) {
        return 0;
    }

    const moves = getPossibleMoves(board_state);

    // X_CLASS max, O_CLASS min
    if (player == X_CLASS) {
        var best = -10;
        for (const move of moves) {
            board_state[move] = X_CLASS;
            best = Math.max(minimax(board_state, O_CLASS, a, b), best);
            board_state[move] = NO_CLASS;
            a = Math.max(a, best);
            if (a >= b) {
                break;
            }
        }   
    } else {
        var best = 10;
        for (const move of moves) {
            board_state[move] = O_CLASS;
            best = Math.min(minimax(board_state, X_CLASS, a, b), best);
            board_state[move] = NO_CLASS;
            b = Math.min(b, best);
            if (b <= a) {
                break;
            }
        }
    }
    return best;
}

function findBestMove() {
    var best = 10;
    var a = -10;
    var b = 10;
    var best_move = -1;
    const all_moves = getPossibleMoves(ai_board);

    for (const move of all_moves) {
        ai_board[move] = O_CLASS;
        let current = minimax(ai_board, X_CLASS, a, b);
        if (current < best) {
            best = current;
            best_move = move;
        }
        ai_board[move] = NO_CLASS;
        b = Math.min(b, best);
        if (b <= a) {
            break;
        }
    }   
     return best_move;
}

function winFound(board_state) {
    for (const seq of WIN_SEQS) {    
        if (board_state[seq[0]] == board_state[seq[1]] && board_state[seq[0]] == board_state[seq[2]] 
            && board_state[seq[0]] != NO_CLASS){
            return board_state[seq[0]];
        }
    }
    return NO_CLASS;  
}

function drawFound() {
    for (const cell of ai_board) {
        if (cell == NO_CLASS) {
            return false;
        }
    }
    return true;
}

function runAI() {
    updateBoard();
    var move = findBestMove();
    markCell(CELLS[move], O_CLASS);
    if (isWin()) {
        displayWin();
        return;
    } else if (isDraw()) {
        displayDraw();
        return;
    }
    swapPlayer();
}
