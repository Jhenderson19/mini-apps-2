import initState from "../initState";

export default (pState = initState, action) => {
  if (action.type !== 'nextMode' || !pState.board.length) { return pState; }

  var newMode = 'c'
  switch(pState.mode) {
    case 'c':
      newMode = 'm';
      break;
    case 'm':
      newMode = '?';
      break;
    case '?':
    default:
      newMode = 'c';
      break;
  }
  return {
    ...pState, mode: newMode
  }
}