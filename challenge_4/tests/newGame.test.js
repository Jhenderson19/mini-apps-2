import newGame from "../client/reducers/newGame";
import Action from "../client/helpers/Action";

test('new state should have correct configuration', () => {
  var state = newGame({}, new Action('newGame', 'beginner'));

  expect(state.freshBoard).toBe(true);
  expect(state.mode).toBe('c');
  expect(state.gameOver).toBe(false);
  expect(Array.isArray(state.board)).toBe(true);
  expect(state.board.length).toBe(0);
});

test('beginner difficulty should be configured correctly', () => {
  var state = newGame({}, {type: 'newGame', payload: 'beginner'});

  expect(state.width).toBe(9);
  expect(state.height).toBe(9);
  expect(state.mines).toBe(10);
});

test('new state should have correct configuration regardless of previous state', () => {
  var oldstate = newGame({}, new Action('newGame', 'insane'));
  oldstate.mode = '?'
  oldstate.freshBoard = false;
  oldstate.gameOver = true;
  var state = newGame(oldstate, new Action('newGame', 'beginner'));

  expect(state.freshBoard).toBe(true);
  expect(state.mode).toBe('c');
  expect(state.gameOver).toBe(false);
  expect(Array.isArray(state.board)).toBe(true);
  expect(state.board.length).toBe(0);
  expect(state.width).toBe(9);
  expect(state.height).toBe(9);
  expect(state.mines).toBe(10);
});


test('intermediate difficulty should be configured correctly', () => {
  var state = newGame({}, {type: 'newGame', payload: 'intermediate'});

  expect(state.width).toBe(16);
  expect(state.height).toBe(16);
  expect(state.mines).toBe(40);
});

test('expert difficulty should be configured correctly', () => {
  var state = newGame({}, {type: 'newGame', payload: 'expert'});

  expect(state.width).toBe(30);
  expect(state.height).toBe(16);
  expect(state.mines).toBe(99);
});

test('insane difficulty should be configured correctly', () => {
  var state = newGame({}, {type: 'newGame', payload: 'insane'});

  expect(state.width).toBe(32);
  expect(state.height).toBe(28);
  expect(state.mines).toBe(300);
});

test('new state difficulty should default to beginner', () => {
  var state = newGame({}, {type: 'newGame', payload: 'invalid string'});

  expect(state.width).toBe(9);
  expect(state.height).toBe(9);
  expect(state.mines).toBe(10);
});