const gameBoard = (() => {
    const gameArray = ["", "", "", "", "", "", "", "", ""];
    return { gameArray };
})();

const Player = (name, letter) => {
    return { name, letter };
};

const render = (() => {
    const container = document.querySelector("#gameContainer");

    // Create grid of squares
    const createSquares = () => {
        for (let i = 0, totalSquares = 9; i < totalSquares; i++) {
            let square = document.createElement("div");
            container.appendChild(square);
            square.className = `grid-item`;
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
    const restartButton = document.querySelector("#restartButton");
    const bgModal = document.querySelector(".bg-modal");
    const resultMessage = document.querySelector("#result");

    const changeName = document.querySelector("#changeName");
    const playerOneHTML = document.querySelector("#playerOneHTML");
    const playerTwoHTML = document.querySelector("#playerTwoHTML");

    const Player1 = Player("PLAYER 1", "✕");
    const Player2 = Player("PLAYER 2", "○");

    const changePlayerName = () => {
        changeName.addEventListener('click', (e) => {
            do {
                Player1.name = prompt("Player 1 Name: (Must be less than 10 characters) ", "PLAYER 1");
                if (Player1.name === null) {
                    Player1.name = "PLAYER 1";
                }
            } while (Player1.name.length >= 10);
            playerOneHTML.innerHTML = Player1.name;
            
            do {
                Player2.name = prompt("Player 2 Name: (Must be less than 10 characters) ", "PLAYER 2");
                if (Player2.name === null) {
                    Player2.name = "PLAYER 2";
                }
            } while (Player2.name.length >= 10);
            playerTwoHTML.innerHTML = Player2.name;
        });
    };

    const gameFunctionality = () => {
        for (let i = 0; i < gridItem.length; i++) {
            gridItem[i].addEventListener("click", () => {
                if (gridItem[i].textContent === "" && winner === false) {
                    if (symbol === "✕") {
                        gameBoard.gameArray[i] = symbol;
                        gridItem[i].textContent = symbol;
                        gridItem[i].style.color = "#545454";
                        gridItem[i].style.fontSize = "55px";
                        findWinSequence();
                        symbol = "○";
                        console.log(gameBoard.gameArray);
                        turn++;
                    } else {
                        gameBoard.gameArray[i] = symbol;
                        gridItem[i].textContent = symbol;
                        gridItem[i].style.color = "#f2ebd4";
                        gridItem[i].style.fontSize = "100px";
                        findWinSequence();
                        symbol = "✕";
                        console.log(gameBoard.gameArray);
                        turn++;
                    }
                }
            });
        }
    };

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
            resultMessage.textContent = `Winner: ${Player2.name}`;
        }

        bgModal.addEventListener('click', (e) => {
            bgModal.style.display = "none";
        });
    }

    const clearBoard = () => {
        restartButton.addEventListener("click", (e) => {
            gridItem.forEach((element) => {
                element.textContent = "";
            });
            gameBoard.gameArray = ["", "", "", "", "", "", "", "", ""];
            console.log(gameBoard.gameArray);
            symbol = "✕";
            winningSymbol = "";
            turn = 1;
            winner = false;
        });
    };

    return { 
        gameplayOutput: () => {
            changePlayerName();
            gridItem; // May not be needed
            gameFunctionality();
            clearBoard();
        } 
    }
})();
gameplay.gameplayOutput();

// (2) Organize code, try and place code in functional areas, HTML and gameplay sections
// (3) Look into adding a Computer AI, if it is too complex, don't worry about it!
// (~) Don't forget to remove console.log after the project is done!