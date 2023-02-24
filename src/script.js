/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
// Represents and manages the board
const gameBoard = (() => {
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

  /*  const resetBoard = () => {
    xBoard = 0b000_000_000;
    oBoard = 0b000_000_000;
  };
  */
 
  // TODO: Make sure placeToken() does not work when square is already filled.
  const placeToken = (square, player) => {
    const board = updateBoard(square);
    if (checkIfIllegal(board) === false) {
      return false;
    }
    if (player === "X") {
      xBoard |= board;
    } else if (player === "O") {
      oBoard |= board;
      console.log(oBoard);
    }
  };

  // Check if a player has won
  const checkWin = () => {
    for (let i = 0; i < winningBoards.length; i++) {
      if ((xBoard & winningBoards[i]) === winningBoards[i]) {
        return true;
      }
      if ((oBoard & winningBoards[i]) === winningBoards[i]) {
        return true;
      }
    }
    return false;
  };

  // Check if game is drawn
  const checkDraw = () => {
    if (((xBoard | oBoard) & fullBoard) === fullBoard) {
      return "draw";
    }
    return false;
  };

  const getXBoard = () => xBoard;
  const getOBoard = () => oBoard;

  return {
    placeToken,
    checkWin,
    checkDraw,
    getXBoard,
    getOBoard,
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

  // Potential Squares: 0, 1, 2, 3, 4, 5, 6, 7, 8
  const playRound = (square) => {
    if (gameBoard.placeToken(square, getCurrentPlayer()) === false) {
      return;
    }
    if (gameBoard.checkWin()) {
      return true;
    }
    if (gameBoard.checkDraw() === "draw") {
      return "draw";
    }
    swapTurn();
  };

  return {
    playRound,
    getCurrentPlayer,
  };
})();

const screenController = () => {
  const boardDiv = document.querySelector(".board");
  const turnDiv = document.querySelector(".turn-tracker");

  const drawBoard = () => {
    // eslint-disable-next-line prefer-const
    let currentPlayer = gameController.getCurrentPlayer();

    turnDiv.textContent = `${currentPlayer}'s turn`;

    for (let i = 0; i < 9; i += 1) {
      const square = document.createElement("div");
      square.classList.add([i]);
      boardDiv.appendChild(square);
    }

    const squares = Array.from(boardDiv.children);
    squares.forEach((element) => {
      element.addEventListener("click", () => {
        const playRound = gameController.playRound(element.className);
        if (playRound === true) {
          turnDiv.textContent = `${currentPlayer} Wins!`;
          element.textContent = currentPlayer;
        } else if (playRound === "draw") {
          turnDiv.textContent = "It's a draw!";
          element.textContent = currentPlayer;
        } else {
          element.textContent = currentPlayer;
          currentPlayer = gameController.getCurrentPlayer();
          turnDiv.textContent = `${currentPlayer}'s turn`;
        }
      });
    });
  };

  drawBoard();
};

screenController();
