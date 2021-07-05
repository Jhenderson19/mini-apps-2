import checkCell from '../client/reducers/checkCell';
import Action from '../client/helpers/Action';
import newGame from '../client/reducers/newGame';

const getLast = (arr) => {
  return arr[arr.length -1];
}

test('checking a cell on a fresh board should generate a board', () => {
  var states = [newGame({}, new Action('newGame', 'beginner'))];

  states.push = checkCell(getLast(states), new Action('checkCell', {
    x: 0,
    y: 0
  }));

  expect(getLast(states).freshBoard).toBe(false);
  expect(getLast(states).board.length).not.toBe(0);
});

test('each cell on the board should be configured correctly', () => {
  var states = [newGame({}, new Action('newGame', 'beginner'))];

  states.push = checkCell(getLast(states), new Action('checkCell', {
    x: 0,
    y: 0
  }));

  for (let i = 0; i < getLast(states).board.length; i++) {
    for(let j = 0; j < getLast(states).board[0].length; j++) {
      let mine = getLast(states).board[i][j];
      expect(mine.mine).toBeDefined();
      expect(mine.nearMineCount).toBeDefined();
      expect(mine.nearMineCount).toBeLessThan(10);
      expect(mine.checked).toBeDefined();
      expect(mine.mark).toBeDefined();
    }
  }
});

test('First cell clicked on a fresh board should always have 0 nearby mines', () => {
  var initState = newGame({}, new Action('newGame', 'insane'));

  for(let i = 0; i < 1000; i++) {
    let x = Math.floor(initState.width * Math.random());
    let y = Math.floor(initState.height * Math.random());

    let state = checkCell(initState, new Action('checkCell', {x, y}));

    expect(state.board[x][y].nearMineCount).toBe(0);
  }
});

test('checking a cell should cascade', () => {
  var initState = {
    freshBoard: false,
    board: [
      [{mine: false, nearMineCount: 0, checked: false, mark: ''}, {mine: false, nearMineCount: 0, checked: false, mark: ''}, {mine: false, nearMineCount: 0, checked: false, mark: ''},],
      [{mine: false, nearMineCount: 0, checked: false, mark: ''}, {mine: false, nearMineCount: 0, checked: false, mark: ''}, {mine: false, nearMineCount: 0, checked: false, mark: ''},],
      [{mine: false, nearMineCount: 0, checked: false, mark: ''}, {mine: false, nearMineCount: 0, checked: false, mark: ''}, {mine: false, nearMineCount: 0, checked: false, mark: ''},],
    ]
  }

  var newState = checkCell(initState, new Action('checkCell', {x: 0, y: 0}));

  expect(newState.board[2][2].checked).toBe(true);
});

test('cascades should not reveal mines', () => {
  var initState = {
    freshBoard: false,
    board: [
      [{mine: false, nearMineCount: 0, checked: false, mark: ''}, {mine: false, nearMineCount: 0, checked: false, mark: ''}, {mine: false, nearMineCount: 0, checked: false, mark: ''},],
      [{mine: false, nearMineCount: 0, checked: false, mark: ''}, {mine: false, nearMineCount: 1, checked: false, mark: ''}, {mine: false, nearMineCount: 1, checked: false, mark: ''},],
      [{mine: false, nearMineCount: 0, checked: false, mark: ''}, {mine: false, nearMineCount: 1, checked: false, mark: ''}, {mine: true, nearMineCount: 0, checked: false, mark: ''},],
    ]
  }

  var newState = checkCell(initState, new Action('checkCell', {x: 0, y: 0}));

  expect(newState.board[2][2].checked).toBe(false);
});