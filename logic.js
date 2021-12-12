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

    let checkWin = () =>{

        let gameWon = false;
        //checkrow
        
        let rowWin = false;
        for(let i=0;i<3;i++){
            if(rowWin){
                break;
            }
            let row = [];
            for(let j=3*i;j<3*i + 3;j++){
                row.push(gameBoardArr[j]);
            }
            if(row.every((value) => {value == "X"}) || row.every((value) => {value == "O"}) ){
                rowWin = true;
                break;
            }
        }
       

        //check Column
        
        let columnWin = false;
        for(let i=0;i<3;i++){
            if(columnWin){
                break;
            }
            let column = [];
            for(let j=i;j<i+7;j=j+3){
                column.push(gameBoardArr[j]);
            }
            if(column.every(value => value == "X") || column.every(value => value == "O")  ){
                columnWin = true;
                break;
             }
        }

        //check diagonal
        let diagonalWin = false;
        let diagonal1 = [gameBoardArr[0],gameBoardArr[4],gameBoardArr[8]];
        let diagonal1Win = false;
        let diagonal2Win = false;
        let diagonal2 = [gameBoardArr[2],gameBoardArr[4],gameBoardArr[6]];
        if(diagonal1.every(value => value == "X") || diagonal1.every(value => value == "O")  ){
            diagonal1Win = true;
         }
         if(diagonal2.every(value => value == "X") || diagonal2.every(value => value == "O")  ){
            diagonal2Win = true;
         }
         if(diagonal1Win || diagonal2Win){
             diagonalWin = true;
         }


        if(rowWin || columnWin || diagonalWin ){
            gameWon = true;
        }

        return gameWon;
    }

    let resetGameBoard = () => {
        gameBoardArr = [];
       
    }
    return { getGameBoard, changeGameBoard, checkWin, resetGameBoard };
})();


const game = (() => {

    // let startBtn = document.querySelector("#start_btn");
    // let playerName1 = document.querySelector("#playerName_input1").innerHTML;
    // let playerName2 = document.querySelector("#playerName_input2").innerHTML;
    // let player1 = Player(playerName1,"X");
    // let player2 = Player(playerName2,"O");
    let gameBoardHtml = document.querySelector("#gameBoard");
    let gameBoardHtmlCellsArray = gameBoardHtml.querySelectorAll(".cell");
    let currentPlayer = 0;
    let squareBoxes = Array.from(document.querySelectorAll(".cell"));

    //This method refreshes the gameboard in html code with the gameboard array.
    function refreshGameboard(){
        for (let i=0;i<9;i++){
            gameBoardHtmlCellsArray[i].textContent = gameBoard.getGameBoard()[i]
        }

    }
    function boxClicked(e) {
        if(e.target.textContent == ""){
            if (currentPlayer == 0) {
                gameBoard.changeGameBoard(e.target.dataset.id,"X")
                currentPlayer = 1;
                refreshGameboard();
                if(gameBoard.checkWin()){
                    console.log("Gamewon");
                    gameBoard.resetGameBoard();
                    refreshGameboard();
                
                }
            }
            else if (currentPlayer = 1) {
                gameBoard.changeGameBoard(e.target.dataset.id,"O")
                currentPlayer = 0;
                refreshGameboard();
                if(gameBoard.checkWin()){
                    console.log("Gamewon");
                    gameBoard.resetGameBoard();
                    refreshGameboard();
                }
            }
            
        }

        

    }
    squareBoxes.forEach((squareBox) => {
        squareBox.addEventListener("click", boxClicked);
    });


})();