export default {
  freshBoard: true,
  width: 9,
  height: 9,
  mines: 10,
  rMines: 10,
  mode: 'c',
  board: [],
  gameOver: false,
  victory: false
};

//STATE MAP
/*
  freshBoard = Indicates whether or not mines have been generated on the board.
  width = width of the active game
  height = height of the active game
  mines = how many mines will be on the board
  mode = determines whether or not the board is in check mode -'c', mark mode -'m', or ? mode -'?'.
  board = active tile map. two dimensional array (width x height) of objects in the following shape.
    {
      mine - Boolean. Determines if tile contains a mine.
      nearMineCount - Int. How many neighbors are mines
      checked - Boolean. Determines if tile has been checked for mines.
      mark - String. '⁕' = Mine, '?' = ?, '' = no mark.
    }
  gameOver = if true, game is over and cells cannot be clicked.
*/