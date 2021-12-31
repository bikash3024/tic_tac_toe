const Player = (name, symbol) => {
    let playerName = name;
    let playerSymbol = symbol;
    return { playerName, playerSymbol };
}
const gameBoard = (() => {
    let gameBoardArr = [];
    let getGameBoard = function () {
        return gameBoardArr;
    }

    let changeGameBoard = (position, symbol) => {
        gameBoardArr[position] = symbol;
    }

    let checkWin = () => {

        let gameWon = false;
        //checkrow

        let rowWin = false;
        for (let i = 0; i < 3; i++) {
            if (rowWin) {
                break;
            }
            let row = [];
            for (let j = 3 * i; j < 3 * i + 3; j++) {
                row.push(gameBoardArr[j]);
            }
            if (row.every((value) => { return value == "X"} ) || row.every((value) =>  value == "O" )) {
                rowWin = true;
                break;
            }
        }


        //check Column

        let columnWin = false;
        for (let i = 0; i < 3; i++) {
            if (columnWin) {
                break;
            }
            let column = [];
            for (let j = i; j < i + 7; j = j + 3) {
                column.push(gameBoardArr[j]);
            }
            if (column.every(value => value == "X") || column.every(value => value == "O")) {
                columnWin = true;
                break;
            }
        }

        //check diagonal
        let diagonalWin = false;
        let diagonal1 = [gameBoardArr[0], gameBoardArr[4], gameBoardArr[8]];
        let diagonal1Win = false;
        let diagonal2Win = false;
        let diagonal2 = [gameBoardArr[2], gameBoardArr[4], gameBoardArr[6]];
        if (diagonal1.every(value => value == "X") || diagonal1.every(value => value == "O")) {
            diagonal1Win = true;
        }
        if (diagonal2.every(value => value == "X") || diagonal2.every(value => value == "O")) {
            diagonal2Win = true;
        }
        if (diagonal1Win || diagonal2Win) {
            diagonalWin = true;
        }


        if (rowWin || columnWin || diagonalWin) {
            gameWon = true;
        }

        return gameWon;
    }

    const checkDraw = () => {
        let gameWon = checkWin();
        let gameDraw = false;
        if (!gameWon) {
            let arrayFullOrNot = false;
            if (gameBoardArr.length == 9) {
                for (let i = 0; i < gameBoardArr.length; i++) {
                    if (gameBoardArr[i] == "X" || gameBoardArr[i] == "O") {
                        arrayFullOrNot = true;

                    }
                    else {
                        arrayFullOrNot = false;
                        break;
                    }
                }
            }

            if (arrayFullOrNot === true) {
                gameDraw = true;
            }
            else {
                gameDraw = false;
            }
        }

        return gameDraw;
    }

    let resetGameBoard = () => {
        gameBoardArr = [];

    }

    return { getGameBoard, changeGameBoard, checkWin, checkDraw, resetGameBoard };
})();


const game = (() => {

    // let startScreen = document.querySelector(".startScreen");
    // let submit1Btn = document.querySelector("#submit1");
    // let submit2Btn = document.querySelector("#submit2");
    // let player1Div = document.querySelector(".player1");
    // let player2Div = document.querySelector(".player2");

    // //Delaying the display none so that the element is still in DOM to perform animation
    // submit1Btn.addEventListener("click", () => {
    //     player1Div.classList.add("visibilityOff");
    //     window.setTimeout(() => {
    //         player1Div.classList.add("displayNone");
    //         player2Div.classList.add("visibilityOn");
    //         player2Div.classList.remove("visibilityOff");
    //     }, 1000);

    // });
    // submit2Btn.addEventListener("click", () => {
    //     player2Div.classList.remove("visibilityOn");
    //     player2Div.classList.add("visibilityOff");
    //     startScreen.classList.add("visibilityOff");
    //     window.setTimeout(() => {
    //         player2Div.classList.add("displayNone");
    //         startScreen.classList.add("displayNone");
    //     }, 1000);


    // });

    // let startBtn = document.querySelector("#start_btn");
    // let playerName1 = document.querySelector("#playerName_input1").innerHTML;
    // let playerName2 = document.querySelector("#playerName_input2").innerHTML;
    // let player1 = Player(playerName1,"X");
    // let player2 = Player(playerName2,"O");
    let gameBoardHtml = document.querySelector("#gameBoard");
    let gameBoardHtmlCellsArray = gameBoardHtml.querySelectorAll(".cell");
    let currentPlayer = 0;
    let squareBoxes = Array.from(document.querySelectorAll(".cell"));
    const player1ScoreHTML = document.querySelector("#player1Score");
    const player2ScoreHTML = document.querySelector("#player2Score");
    const resetScoreButton = document.querySelector("#resetScore")
    const headline = document.querySelector("#headline");
    let player1Score = 0;
    let player2Score = 0;


    //This method refreshes the gameboard in html code with the gameboard array.
    function refreshGameboard() {

        for (let i = 0; i < 9; i++) {
            gameBoardHtmlCellsArray[i].textContent = gameBoard.getGameBoard()[i];
        }

    }
    function refreshScore() {
        player1ScoreHTML.textContent = (player1Score);
        player2ScoreHTML.textContent = (player2Score);
    }
    function resetRound() {
        gameBoard.resetGameBoard();
        refreshGameboard();
        currentPlayer = 0;
    }

    resetScoreButton.addEventListener("click",()=>{
        player2Score = 0;
        player1Score = 0;
        refreshScore();
    });
    function boxClicked(e) {
        if (e.target.textContent == "") {
            if (currentPlayer == 0) {
                gameBoard.changeGameBoard(e.target.dataset.id, "X")
                currentPlayer = 1;
                refreshGameboard();

                if (gameBoard.checkWin()) {
                    player1Score++;
                    refreshScore();
                    resetRound();

                }
                else if (gameBoard.checkDraw()) {
                    console.log("Game draw");
                    resetRound();
                }
            }
            else if (currentPlayer = 1) {
                gameBoard.changeGameBoard(e.target.dataset.id, "O")
                currentPlayer = 0;
                refreshGameboard();

                if (gameBoard.checkWin()) {
                    player2Score++;
                    refreshScore();
                    resetRound();
                }
                else if (gameBoard.checkDraw()) {
                    console.log("Game draw");
                    resetRound();

                }
            }

        }



    }
    squareBoxes.forEach((squareBox) => {
        squareBox.addEventListener("click", boxClicked);
    });


})();