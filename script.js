const gameBoard = (() => {
    const gameArray = ["", "", "", "", "", "", "", "", ""];
    return { gameArray };
})();

const Player = (name, letter) => {
    return { name, letter };
};

const renderGrid = (() => {
    const _createSquares = () => {
        for (let i = 0, totalSquares = 9; i < totalSquares; i++) {
            const gameContainer = document.querySelector("#gameContainer");
            let square = document.createElement("div");
            gameContainer.appendChild(square);
            square.className = `grid-item`;
        }
    };

    return { 
        Output: () => {
            _createSquares();
        }
    }
})();
renderGrid.Output();

const gameplay = (() => {    
    const gridItem = document.querySelectorAll(".grid-item");
    const bgModal = document.querySelector(".bg-modal");
    const resultMessage = document.querySelector("#result");
    const changeName = document.querySelector("#changeName");
    const playerOneHTML = document.querySelector("#playerOneHTML");
    const playerTwoHTML = document.querySelector("#playerTwoHTML");
    const restartButton = document.querySelector("#restartButton");

    const Player1 = Player("PLAYER 1", "✕");
    const Player2 = Player("PLAYER 2", "○");

    let symbol = "✕";
    let turn = 0;
    let winner = false;

    const _clickOnBoard = () => {
        for (let i = 0; i < gridItem.length; i++) {
            gridItem[i].addEventListener("click", () => {
                if (gridItem[i].textContent === "" && winner === false) {
                    if (symbol === "✕") {
                        // Replace element's empty string with symbol in gameArray
                        gameBoard.gameArray[i] = symbol;
                        // Add symbol to HTML grid and style it 
                        gridItem[i].textContent = symbol; 
                        gridItem[i].style.color = "#545454"; // Black cross
                        gridItem[i].style.fontSize = "55px";
                        findWinningSequence();
                        symbol = "○";
                        console.log(gameBoard.gameArray);
                        turn++;
                    } else {
                        // Replace element's empty string with symbol in gameArray
                        gameBoard.gameArray[i] = symbol;
                        // Add symbol to HTML grid and style it 
                        gridItem[i].textContent = symbol;
                        gridItem[i].style.color = "#f2ebd4"; // White circle
                        gridItem[i].style.fontSize = "100px";
                        findWinningSequence();
                        symbol = "✕";
                        console.log(gameBoard.gameArray);
                        turn++;
                    }
                }
            });
        }
    };

    const findWinningSequence = () => {
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
        if (turn === 8 && winner === false) {
            resultMessage.textContent = `Tie!`;
            bgModal.style.display = 'flex';
            bgModal.addEventListener('click', (e) => {
                bgModal.style.display = "none";
            });
        }
    };

    const getWinner = () => {
        winner = true;
        bgModal.style.display = 'flex';
        if (symbol === Player1.letter) {
            resultMessage.textContent = `Winner: ${Player1.name}`;
        } else {
            resultMessage.textContent = `Winner: ${Player2.name}`;
        }
        // Click anywhere to remove Winner Screen
        bgModal.addEventListener('click', (e) => {
            bgModal.style.display = "none";
        });
    };

    const _changePlayerName = () => {
        changeName.addEventListener('click', (e) => {
            // `Do While Loop` repeats prompt if user does not enter PlayerX.length < 12
            do {
                Player1.name = prompt("No greater than 12 characters:", "PLAYER 1");
                if (Player1.name === null) {
                    Player1.name = "PLAYER 1"; // Set default name if user cancels
                }
            } while (Player1.name.length >= 12);
            playerOneHTML.innerHTML = Player1.name;

            do {
                Player2.name = prompt("No greater than 12 characters:", "PLAYER 2");
                if (Player2.name === null) {
                    Player2.name = "PLAYER 2";
                }
            } while (Player2.name.length >= 12);
            playerTwoHTML.innerHTML = Player2.name;
        });
    };

    const _clearBoard = () => {
        restartButton.addEventListener("click", (e) => {
            gridItem.forEach((element) => {
                element.textContent = "";
            });
            gameBoard.gameArray = ["", "", "", "", "", "", "", "", ""];
            symbol = "✕";
            turn = 0;
            winner = false;
        });
    };

    return { 
        gameplayOutput: () => {
            _changePlayerName();
            _clickOnBoard();
            _clearBoard();
        }
    }
})();
gameplay.gameplayOutput();