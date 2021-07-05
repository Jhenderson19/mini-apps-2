import initState from "../initState";

export default (pState = initState, action) => {
  if(action.type !== 'checkBoard' || pState.gameOver) { return pState; }

  var gameOver = false;
  pState.board.forEach(row => {
    row.forEach(cell => {
      cell.mine && cell.checked ? gameOver = true : null
    });
  });

  if(gameOver) {
    console.log('Game Over!');
    return {
      ...pState,
      gameOver: true
    }
  } else {
    return pState;
  }

}