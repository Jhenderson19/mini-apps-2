import getNeighborCells from "../helpers/getNeighborCells";
import initState from "../initState";

const generateBoard = (width, height, mines, click) => {
  const getRandLoc = () => {
    return {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    }
  }
  const isValidMineLoc = (l = { x: 0, y: 0 }, click = { x: 0, y: 0 }) => {
    let notMine = board[l.y][l.x].mine === false
    let notNearClick = (Math.abs(l.x - click.x) > 1) || (Math.abs(l.y - click.y) > 1);
    return notMine && notNearClick;
  }
  const createCell = () => {
    return { mine: false, nearMineCount: 0, checked: false, mark: '' };
  }

  const board = [];
  for (let i = 0; i < height; i++) {
    board.push([]);
    for (let j = 0; j < width; j++) {
      board[board.length - 1].push(createCell());
    }
  }

  for (; mines > 0; mines--) {
    let l = getRandLoc();
    while (!isValidMineLoc(l, click)) { l = getRandLoc() }
    board[l.y][l.x].mine = true;
    getNeighborCells(l, width, height).forEach((n) => {
      board[n.y][n.x].nearMineCount++
    });
  }
  return board;
};
const clickHandle = (board, cl) => {
  const cascade = (l) => {
    getNeighborCells(l, board[0].length, board.length).forEach(p => {
      let c = board[p.y][p.x];
      if (c.checked || c.mark !== '') { return; } //Stops endless cascades and revealing marked tiles

      c.checked = true;
      if (c.nearMineCount === 0) {
        cascade(p);
      }
      board[p.y][p.x] = { ...c };
    })
  }
  let t = board[cl.y][cl.x];
  if (t.mark === 'm') { return board } //Dissallows checking marked tiles
  t.checked = true;
  if (t.nearMineCount === 0) {
    cascade(cl);
  }
  board[cl.y][cl.x] = { ...t };
  return [...board];
};


export default (pState = initState, action) => {
  if (action.type !== 'checkCell' || pState.gameOver || pState.victory) { return pState; }
  let cl = action.payload; //click location
  let newState = { ...pState };

  if (pState.mode === 'c') {
    if (newState.freshBoard) {
      newState.board = generateBoard(pState.width, pState.height, pState.mines, cl);
      newState.freshBoard = false;
    }
    newState.board = clickHandle(newState.board, cl);
  }
  if (pState.mode === 'm') {
    var t = newState.board[cl.y][cl.x];
    if (t.mark !== 'm') {
      newState.rMines--;
      t.mark = 'm';
    } else {
      newState.rMines++;
      t.mark = '';
    }
    newState.board[cl.y][cl.x] = { ...t };
    newState.board = [...newState.board];
  }
  if (pState.mode === '?') {
    console.log('toggle ?');
    var t = newState.board[cl.y][cl.x];
    if (t.mark !== '?') {
      if (t.mark === 'm') {
        newState.rMines++;
      }
      t.mark = '?';
    } else {
      t.mark = '';
    }
    newState.board[cl.y][cl.x] = { ...t };
    newState.board = [...newState.board];
  }
  return newState;

}
