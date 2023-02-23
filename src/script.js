/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
// Represents and manages the board
const gameBoard = (() => {
  // Board dimensions
  const rows = 3;
  const columns = 3;

  // Bit strings for player 1 and 2 and draw game
  let xBoard = 0b000_000_000;
  let oBoard = 0b000_000_000;
  const fullBoard = 0b111_111_111;

  // Array of possible win conditions
  const winningBoards = [
    0b000_000_111,
    0b000_111_000,
    0b111_000_000, // 3 rows
    0b001_001_001,
    0b010_010_010,
    0b100_100_100, // 3 columns
    0b100_010_001,
    0b001_010_100, // 2 diagonals
  ];

  const updateBoard = (square) => 1 << square;
  const checkIfIllegal = (move) => {
    if (xBoard & move || oBoard & move) {
      console.log("Invalid Move!");
      return false;
    }
  };
  const resetBoard = () => {
    xBoard = 0b000_000_000;
    oBoard = 0b000_000_000;
  };

  // TODO: Make sure placeToken() does not work when square is already filled.
  const placeToken = (square, player) => {
    const board = updateBoard(square);
    console.log(board);
    if (checkIfIllegal(board) === false) {
      return false;
    }
    if (player === "X") {
      xBoard |= board;
      console.log(xBoard);
    } else if (player === "O") {
      oBoard |= board;
      console.log(oBoard);
    }
  };

  const printBoard = () => {
    for (let i = 0; i < rows; i++) {
      const row = ["|"];
      for (let j = 0; j < columns; j++) {
        const boardMask = updateBoard(i + j * rows);

        if (xBoard & boardMask) {
          row.push("X");
        }

        if (oBoard & boardMask) {
          row.push("O");
        }

        row.push("  |");
      }
      console.log("|---|---|---|");
      console.log(row.join(""));
    }
    console.log("|---|---|---|");
  };

  // Check if a player has won
  const checkWin = () => {
    for (let i = 0; i < winningBoards.length; i++) {
      if ((xBoard & winningBoards[i]) === winningBoards[i]) {
        printBoard();
        console.log("X Wins!");
        resetBoard();
        return true;
      }
      if ((oBoard & winningBoards[i]) === winningBoards[i]) {
        printBoard();
        console.log("O Wins!");
        resetBoard();
        return true;
      }
    }
    return false;
  };

  // Check if game is drawn
  const checkDraw = () => {
    if (((xBoard | oBoard) & fullBoard) === fullBoard) {
      console.log("It's a draw!");
      resetBoard();
      return true;
    }
    return false;
  };

  return {
    placeToken,
    printBoard,
    checkWin,
    checkDraw,
  };
})();

const gameController = (() => {
  const player1 = "X";
  const player2 = "O";

  let currentPlayer = player1;

  const swapTurn = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const getCurrentPlayer = () => currentPlayer;

  const printNewRound = () => {
    gameBoard.printBoard();
    console.log(`${getCurrentPlayer()}'s Turn.`);
  };

  // Potential Squares: 0, 1, 2, 3, 4, 5, 6, 7, 8
  const playRound = (square) => {
    if (gameBoard.placeToken(square, getCurrentPlayer()) === false) {
      printNewRound();
      return;
    }
    gameBoard.checkWin();
    gameBoard.checkDraw();
    swapTurn();
    printNewRound();
  };

  return {
    printNewRound,
    playRound,
  };
})();

const screenController = (() => {
  const board = document.querySelector(".board");
  
  const drawBoard = () => {
    for(let i = 0; i < 9; i += 1) {
      const square = document.createElement("div");
      square.classList.add([i])
      board.appendChild(square);
    }
  }
  
  return {
    drawBoard
  };
})();

screenController.drawBoard();