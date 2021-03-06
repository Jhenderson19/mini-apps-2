import initState from "../initState.js";

export default (pState = initState, action) => {
  if (action.type !== 'newGame') return pState;

  var newState = {
    ...initState,
    freshBoard: true,
    mode: 'c',
    gameOver: false,
    board: []
  }
  switch(action.payload.toLowerCase()) {
    case 'beginner':
    default:
      newState.width = 9;
      newState.height = 9;
      newState.mines = 10;
      break;
    case 'intermediate':
      newState.width = 16;
      newState.height = 16;
      newState.mines = 40;
      break;
    case 'expert':
      newState.width = 30;
      newState.height = 16;
      newState.mines = 99;
      break;
    case 'insane':
      newState.width = 32;
      newState.height = 28;
      newState.mines = 300;
      break;
  }

  return {
    ...initState,
    ...newState,
    rMines: newState.mines
  };
}