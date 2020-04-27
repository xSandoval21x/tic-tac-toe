let playerTurn = "X";

const gameBoard = (() => {
    const board = document.getElementById("board");
    const cellElements = document.querySelectorAll("[data-cell]");
    const WIN_COMBOS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    
    const handleClick = (e) => {
        const square = e.target;
        playerTurn = playerTurn === "X"? "X" : "O";
        placeMark(square, playerTurn);
        if(checkWin(playerTurn)) {
            displayController.endGame(false);
        } else if(checkDraw()) {
            displayController.endGame(true);
        } else {
            changeTurn();
        }
    }

    const setGameBoard = () => {
        cellElements.forEach(cell => {
            cell.innerText = "";
            cell.removeEventListener("click", handleClick);
            cell.addEventListener("click", handleClick, {once: true});
        });
        playerTurn = "X";
    }

    setGameBoard();
    
    const placeMark = (square, marker) => {
        square.innerText = marker;
        square.style.color = marker === "X"? "rgb(255, 108, 85)" : "rgb(107, 107, 255)";
    }
    const changeTurn = () => {
        playerTurn = playerTurn === "X"? "O" : "X";
        displayController.setMessage();
    }

    const checkWin = (currentTurn) => {
        return WIN_COMBOS.some(combination => {
            return combination.every(index => {
                return cellElements[index].textContent.includes(currentTurn);
            })
        });
    }

    const checkDraw = () => {
        return [...cellElements].every(cell => {
            return cell.textContent.includes("X") || cell.textContent.includes("O");
        });
    }

    return {
        board,
        cellElements,
        setGameBoard,
    }
})();

const Player = (name, marker) => {
    const getName = () => {
        return name;
    }

    return {
        getName,
    }
}

const displayController = (() => {
    const startButton = document.getElementById("start-button");
    const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
    const winningMessageElement = document.getElementById("winningMessage");
    const resetButton = document.getElementById("reset-button");
    const restartButton = document.getElementById("restart-button");
    const message = document.querySelector(".message");
    let playerX;
    let playerO;

    const showGrid = () => {
        createPlayers();
        message.classList.add("show");
        gameBoard.board.classList.add("show");
        startButton.parentElement.classList.remove("show");
        resetButton.parentElement.classList.add("show");
        restartGame();   
    }

    const createPlayers = () => {
        const playerXInput = document.getElementById("x-player");
        const playerOInput = document.getElementById("o-player");
        playerX = Player(playerXInput.value, "X");
        playerO = Player(playerOInput.value, "O");
        playerXInput.style.border = "none";
        playerOInput.style.border = "none";
        setMessage();
    }

    const setMessage = () => {
        if(playerTurn === "X") {
            message.textContent = `${playerX.getName()} is up!`;
        }else if(playerTurn === "O") {
            message.textContent = `${playerO.getName()}'s turn`;
        } else {
            message.textContent = "";
        }
    }

    const endGame = (draw) => {
        if(draw){
            winningMessageTextElement.innerText = "Draw...Try again!";
        }else {
            winningMessageTextElement.innerText = `${playerTurn === "X"? playerX.getName() : playerO.getName()} Wins!`;
        }
        resetButton.parentElement.classList.remove("show");
        winningMessageElement.classList.add("show");
    }

    const restartGame = () => {
        gameBoard.setGameBoard();
        setMessage();
        winningMessageTextElement.innerText = "";
        winningMessageElement.classList.remove("show");
    }

    const reset = () => {
        const playerXInput = document.getElementById("x-player");
        const playerOInput = document.getElementById("o-player");
        playerXInput.style.border = "1px solid black";
        playerOInput.style.border = "1px solid black";
        message.classList.remove("show");
        gameBoard.board.classList.remove("show");
        resetButton.parentElement.classList.remove("show");
        startButton.parentElement.classList.add("show");
        restartGame();
    }

    startButton.addEventListener("click", showGrid);
    resetButton.addEventListener("click", reset);
    restartButton.addEventListener("click", showGrid);

    return {
        endGame,
        setMessage,
    }
})();