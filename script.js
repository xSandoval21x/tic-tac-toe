let playerTurn;

const gameBoard = (() => {
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
    }

    setGameBoard();
    
    const placeMark = (square, marker) => {
        square.innerText = marker;
    }
    const changeTurn = () => {
        playerTurn = playerTurn === "X"? "O" : "X";
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
        })
    }

    return {
        cellElements,
        setGameBoard,
    }
})();

const Player = (name, marker) => {
    
}

const displayController = (() => {
    const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
    const winningMessageElement = document.getElementById("winningMessage");
    const restartButton = document.getElementById("restart-button");

    const endGame = (draw) => {
        if(draw){
            winningMessageTextElement.innerText = "Draw...Try again!";
        }else {
            winningMessageTextElement.innerText = `${playerTurn} Wins!`;
        }
        winningMessageElement.classList.add("show");
    }

    const restartGame = () => {
        gameBoard.setGameBoard();
        winningMessageTextElement.innerText = "";
        winningMessageElement.classList.remove("show");
    }

    restartButton.addEventListener("click", restartGame);

    return {
        endGame,
    }
})();