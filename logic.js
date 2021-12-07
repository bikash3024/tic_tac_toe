const Player = (name, symbol) => {
    let playerName = name;
    let playerSymbol = symbol;
    return { playerName, playerSymbol };
}
const gameBoard = (() => {
    let gameBoardArr = ["X", 0, "X", 0, "X", 0, 0, 0, 0];
    let getGameBoard = function () {
        return gameBoardArr;
    }
    let changeGameBoard = (position, symbol) => {
        gameBoardArr[position] = symbol;
    }
    return { getGameBoard, changeGameBoard };
})();

const game = (() => {

    // let startBtn = document.querySelector("#start_btn");
    // let playerName1 = document.querySelector("#playerName_input1").innerHTML;
    // let playerName2 = document.querySelector("#playerName_input2").innerHTML;
    // let player1 = Player(playerName1,"X");
    // let player2 = Player(playerName2,"O");
    let currentPlayer = 0;
    let squareBoxes = Array.from(document.querySelectorAll(".cell"));
    function boxClicked(e) {
        if (currentPlayer == 0) {
            let input = document.createElement("div");
            input.classList.add("userInput");
            input.textContent = "X";
            e.target.appendChild(input)
            currentPlayer = 1;
        }
        else if (currentPlayer = 1) {
            e.target.innerHTML = "O";
            currentPlayer = 0;
        }
    }
    squareBoxes.forEach((squareBox) => {
        squareBox.addEventListener("click", boxClicked);
    });


})();