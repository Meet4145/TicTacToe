const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
];

// Initialize game
function initGame() {
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerHTML = "";
        boxes[index].style.pointerEvents = "all";
        box.style.backgroundColor = "transparent";
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

// switch player
function swapTurn() {
    if(currentPlayer === 'X') {
        currentPlayer = 'O';
    }
    else {
        currentPlayer = 'X';
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// check for winner
function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]) ) {
            
            //check if winner is X
            if(gameGrid[position[0]] === 'X') {
                answer = "X";
            }
            //check if winner is O
            else {
                answer = "O";
            }

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = 'none';
            });

            //now we have a winner
            boxes[position[0]].style.backgroundColor = "green";
            boxes[position[1]].style.backgroundColor = "green";
            boxes[position[2]].style.backgroundColor = "green";
        }
    });

    if(answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //check if game is draw
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "") {
            fillCount++;
        }
    });

    if(fillCount === 9) {
        gameInfo.innerText = `Game Tied!`;
        newGameBtn.classList.add("active");
    }

}

// click event handler
function handleClick(index) {
    if (gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = 'none';
        //switch player
        swapTurn();
        //check for winner
        checkGameOver();
    }
}

// click event listener on each box
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index); 
    })
});

newGameBtn.addEventListener('click', initGame);