var turn = "X"
clickedSquares = []

function add(square) {
    if (!(clickedSquares.includes(square))) {
        document.getElementById(square).innerHTML = turn
        clickedSquares += square

        if (turn == "X") {
            turn = "O"
        } else if (turn == "O") {
            turn = "X"
        }
        getGameState()
    }
}

function checkScores(stateX, stateO) {
    winningPos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]
    var tieState = 0

    var end = false

    for (let i = 0; i < 7; i++) {
        let currentWin = winningPos[i]

        let a = currentWin[0]
        let b = currentWin[1]
        let c = currentWin[2]

        if (stateX.includes(a) && stateX.includes(b) && stateX.includes(c)) {
            alert("Crosses Wins")
            location.reload()
            end = true
            break
        }
    }

    for (let i = 0; i < 7; i++) {
        currentWin = winningPos[i]

        let a = currentWin[0]
        let b = currentWin[1]
        let c = currentWin[2]

        if (stateO.includes(a) && stateO.includes(b) && stateO.includes(c)) {
            alert("Noughts Wins")
            location.reload()
            end = true
            break
        }
    }

    for (let i = 1; i < 10; i++) {
        if (document.getElementById(i.toString()).innerHTML != "") {
            tieState += 1
        }
    }
    if (tieState == 9 && end == false) {
        alert("Tie")
        location.reload()
    }
}

function getGameState() {
    gameStateX = []
    gameStateO = []

    for (let i = 1; i < 10; i++) {
        if (document.getElementById(i.toString()).innerHTML == "x") {
            gameStateX.push(i)
        }
    }

    for (let i = 1; i < 10; i++) {
        if (document.getElementById(i.toString()).innerHTML == "o") {
            gameStateO.push(i)
        }
    }

    checkScores(gameStateX, gameStateO)
}
