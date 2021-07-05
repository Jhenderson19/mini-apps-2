import initState from "../initState";

export default (pState = initState, action) => {
  if (action.type !== 'checkBoard' || pState.gameOver) { return pState; }

  var gameOver = false;
  pState.board.forEach(row => {
    row.forEach(cell => {
      cell.mine && cell.checked ? gameOver = true : null
    });
  });

  if (gameOver) {
    console.log('Game Over!');
    return {
      ...pState,
      gameOver: true
    }
  } else if (pState.rMines === 0) {
    let victory = true;
    pState.board.forEach(row => {
      row.forEach(cell => {
        cell.mark === 'm' && !cell.mine ? victory = false : null;
      });
    });

    if (victory) {
      console.log('Victory Detected!');
      return { ...pState, victory };
    }
  }

  return pState;
}