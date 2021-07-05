import React from 'react';
import Cell from './Cell.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  width: state.width,
  height: state.height,
  board: state.board,
  gameOver: state.gameOver
});

const Minefield = (props) => {
  return (
    <table>
      <tbody>
        {new Array(props.height).fill(0).map((row, y) => {
          return (
            <tr key={y}>
              {new Array(props.width).fill(0).map((col, x) => {
                return (<td key={x}>
                  {
                    props.board && props.board.length ?
                      <Cell x={x} y={y} dispatch={props.dispatch} gameOver={props.gameOver} data={props.board[y][x]} /> :
                      <Cell x={x} y={y} dispatch={props.dispatch} gameOver={props.gameOver} />
                  }
                </td>);
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default connect(mapStateToProps)(Minefield);