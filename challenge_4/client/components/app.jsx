import React from 'react';
import StartButton from './code/StartButton.jsx';
import Minefield from './code/Minefield.jsx';
import ModeSelect from './code/ModeSelect.jsx';
import { connect } from 'react-redux';
import css from './styles/global.css';

const mapStateToProps = state => ({gameOver: state.gameOver, victory: state.victory, mines: state.mines, rMines: state.rMines});

const App = (props) => {
  return (
    <div>
      {
        props.gameOver ?
          (<h1>Game Over :l</h1>) :
          null
      }
      {
        props.victory ?
          (<h1>You Won!</h1>) :
          null
      }
      <StartButton label='Beginner'/>
      <StartButton label='Intermediate'/>
      <StartButton label='Expert'/>
      <StartButton label='Insane'/>
      <br />
      <br />
      <ModeSelect />
      <br />
      <br />
      Remaining Mines: {props.rMines}
      <Minefield />
    </div>
  );
}

export default connect(mapStateToProps)(App);