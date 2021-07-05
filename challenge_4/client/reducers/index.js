import initState from '../initState';

import checkCell from "./checkCell";
import newGame from './newGame';
import checkBoard from './checkBoard';
import nextMode from './nextMode';

const debug = (pState = initState, action) => {
  console.log('Action Dispatched: ');
  console.log('             Type:', action.type);
  console.log('          Payload:', JSON.stringify(action.payload));

  console.log(pState);
  return pState;
}

const reducers = [
  checkCell,
  newGame,
  checkBoard,
  nextMode,
  //debug
];

const all = (pState, action) => {
  return reducers.reduce((curState, reducer) => {
    return reducer(curState,  action);
  }, pState);
}

export default all;
