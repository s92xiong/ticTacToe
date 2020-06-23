const gameBoard = (() => {
    const gameArray = ["", "", "", "", "", "", "", "", ""];
    return { gameArray };
})();

const Player = (name, letter) => {
    return { name, letter };
};

const render = (() => {
    const container = document.querySelector("#game-container");

    // Create grid of squares
    const createSquares = () => {
        for (let i = 0, totalSquares = 9; i < totalSquares; i++) {
            let square = document.createElement("div");
            container.appendChild(square);
            square.className = `grid-item grid-item-${i}`;
        }
    };

    return { 
        displayOutput: () => {
            createSquares();
        }
    }
})();
render.displayOutput();

const gameplay = (() => {
    let symbol = "✕";
    let winningSymbol = "";
    let turn = 1;
    let winner = false;
    
    const gridItem = document.querySelectorAll(".grid-item");
    const resetButton = document.querySelector("#resetButton");
    const bgModal = document.querySelector(".bg-modal");
    const resultMessage = document.querySelector("#result");

    const Player1 = Player("PLAYER 1", "✕");
    const Player2 = Player("PLAYER 2", "○");

    const gameFunctionality = () => {
        for (let i = 0; i < gridItem.length; i++) {
            gridItem[i].addEventListener("click", () => {
                if (gridItem[i].textContent === "" && winner === false) {
                    if (symbol === "✕") {
                        gridItem[i].textContent = symbol;
                        gridItem[i].style.color = "#545454";
                        gridItem[i].style.fontSize = "55px";
                        gameBoard.gameArray[i] = symbol;
                        findWinSequence();
                        symbol = "○";
                        console.log(gameBoard.gameArray);
                        turn++;
                    } else {
                        gridItem[i].textContent = symbol;
                        gridItem[i].style.color = "#f2ebd4";
                        gridItem[i].style.fontSize = "100px";
                        gameBoard.gameArray[i] = symbol;
                        findWinSequence();
                        symbol = "✕";
                        console.log(gameBoard.gameArray);
                        turn++;
                    }
                }
            });
        }
    };
    // TRY TO FIX THIS FUNCTION AND THE ABOVE CODE @ LINES 49-52
    // const rendXSymbol = (x) => {
    //     x.textContent = symbol;
    //     x.style.color = "#545454";
    //     x.style.fontSize = "55px";
    // };

    const findWinSequence = () => {
        // Find winning sequence
        if (symbol === gameBoard.gameArray[0]) {
            if (symbol === gameBoard.gameArray[1] && symbol === gameBoard.gameArray[2] ||
                symbol === gameBoard.gameArray[3] && symbol === gameBoard.gameArray[6] ||
                symbol === gameBoard.gameArray[4] && symbol === gameBoard.gameArray[8]) {
                getWinner();
            }
        }
        if (symbol === gameBoard.gameArray[2]) {
            if (symbol === gameBoard.gameArray[4] && symbol === gameBoard.gameArray[6] || 
                symbol === gameBoard.gameArray[5] && symbol === gameBoard.gameArray[8]) {
                getWinner();
            }
        }
        if (symbol === gameBoard.gameArray[1] && symbol === gameBoard.gameArray[4] && symbol === gameBoard.gameArray[7]) {
            getWinner();
        }
        if (symbol === gameBoard.gameArray[3] && symbol === gameBoard.gameArray[4] && symbol === gameBoard.gameArray[5]) {
            getWinner();
        }
        if (symbol === gameBoard.gameArray[6] && symbol === gameBoard.gameArray[7] && symbol === gameBoard.gameArray[8]) {
            getWinner();
        }
        // Tie game
        if (turn === 9 && winner === false) {
            resultMessage.textContent = `Tie!`;
            bgModal.style.display = 'flex';
            bgModal.addEventListener('click', (e) => {
                bgModal.style.display = "none";
            });
        }
    };

    const getWinner = () => {
        winner = true;
        winningSymbol = symbol;
        if (winningSymbol === Player1.letter) {
            bgModal.style.display = 'flex';
            resultMessage.textContent = `Winner: ${Player1.name}`;
        } else if (winningSymbol === Player2.letter) {
            bgModal.style.display = 'flex';
            resultMessage.textContent = `${Player2.name}`;
        }

        bgModal.addEventListener('click', (e) => {
            bgModal.style.display = "none";
        });
    }

    const clearGame = () => {
        resetButton.addEventListener("click", (e) => {
            gridItem.forEach((element) => {
                element.textContent = "";
            });
            gameBoard.gameArray = ["", "", "", "", "", "", "", "", ""];
            symbol = "✕";
            winningSymbol = "";
            turn = 1;
            winner = false;
        });
    };

    return { 
        gameplayOutput: () => {
            gridItem;
            gameFunctionality();
            clearGame();
        } 
    }
})();
gameplay.gameplayOutput();

// (1) Fix positioning of `cross` and `circle` div positions, make them absolute?
// (2) Organize code, try and place code in functional areas, HTML and gameplay sections
// (3) Fix result window for winner, make it look more clean

// (~) Don't forget to remove console.log after the project is done!

// To do immediately
// Build a 2nd button that takes you back
// Build a the html to input player 1 and 2 information