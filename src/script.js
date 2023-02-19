// Represents and manages the board
const gameBoard = (function() {
  // Board dimensions
  const rows = 3;
  const columns = 3;

  // Bit strings for player 1 and 2 and draw game
  const xPlayer = 0b000000000;
  const oPlayer = 0b000000000;
  const fullBoard = 0b111111111;

  // Array of possible win conditions
  const winningBoards = [
    0b000000111,
    0b000111000,
    0b111000000,
    0b001001001,
    0b010010010,
    0b100100100,
    0b100010001,
    0b001010100
  ]

  const drawBoard = () => {
    
  }

  return {
    drawBoard
  }
})();

const createPlayer = (token) => {
  const getToken = () => token;

  const placeToken = () => {

  }
}


// Controls game's turns
const gameController = (function() {


  return {

  }
})();

gameBoard.drawBoard();