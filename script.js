const boxes = Array.from(document.querySelectorAll('.box'));
const info = document.querySelector('.info');
const playerTurn = document.querySelector('.current-player');
const resetBtn = document.querySelector('.reset');


let gameStatus, isGameOver, currentPlayer;

//sets of three indexes that indicate a match
const MATCHES = [
    //left to right
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //diagonals
    [0, 4, 8],
    [2, 4, 6],
    //top to bottom
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
]

const intializeGame = () => {

    gameStatus = ['*', '*', '*', '*', '*', '*', '*', '*', '*']; //gamestatus array denotes the positions of X and Os in the grid ; * denotes empty
    gameStatus.freeSpace = 9; //denotes no. of free spaces
    isGameOver = false;
    currentPlayer = 'X';
    info.classList.add('hide');
    resetBtn.classList.add('hide');
    playerTurn.classList.remove('hide');
    //remove existing text and text-styles
    boxes.forEach((box) => {
        box.textContent = ''
        box.classList.remove('x-text');
        box.classList.remove('o-text');
    });
    playerTurn.textContent = `Current player : ${currentPlayer}`;
}

//checks if the clicked box is empty or not
const isValidMove = (id) => {
    if (gameStatus[id] === '*')
        return true;
    return false;
}


const switchPlayer = () => {
    if (currentPlayer == 'X') {
        currentPlayer = 'O';
    }
    else
        currentPlayer = 'X';

    playerTurn.textContent = `Current player : ${currentPlayer}`;
}

const registerPlayerMove = (box, id) => {
    //insert player symbol into gameStatus array
    gameStatus[id] = currentPlayer;
    gameStatus.freeSpace -= 1;
    if (currentPlayer == 'X')
        box.classList.add('x-text');
    else
        box.classList.add('o-text');
    //update the grid
    box.textContent = currentPlayer;

}

const setGameOver = (message) => {
    info.textContent = message;
    info.classList.remove('hide');
    playerTurn.classList.add('hide');
    resetBtn.classList.remove('hide');
    isGameOver = true;
}

const checkResults = () => {
    for (let i = 0; i < MATCHES.length; i++) {
        let i0 = MATCHES[i][0]
        let i1 = MATCHES[i][1]
        let i2 = MATCHES[i][2]
        // if not empty and matching then declare winner
        if (gameStatus[i0] != '*' && gameStatus[i1] != '*' && gameStatus[i2] != '*') {

            if (gameStatus[i0] == gameStatus[i1] && gameStatus[i1] == gameStatus[i2]) {
                setGameOver(`${gameStatus[i0]} won`);
                return;
            }
        }
    }
    //if grid full then tie
    if (!gameStatus.freeSpace) {
        setGameOver('Tie');
        return;
    }
}

const playerMove = (box) => {
    //get id/index of the box clicked
    let id = parseInt(box.id);
    if (isValidMove(id) && !isGameOver) {
        registerPlayerMove(box, id);
        checkResults();
        switchPlayer();
    }
}


boxes.forEach((box) => {
    box.addEventListener('click', () => playerMove(box));
});


window.addEventListener('DOMContentLoaded', intializeGame);

resetBtn.addEventListener('click', intializeGame);

