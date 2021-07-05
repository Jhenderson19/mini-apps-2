import React from 'react';
import action from '../../helpers/Action';
import css from '../styles/cell.css';

export default (props) => {

  const displayText = () => {
    var minetext = '⁕';
    var noText = '_';
    var flagText = '✓'; //'✓ʫ↱▶▷'
    var qText = '?';

    if (!props.data) {
      return noText;
    }
    var countText = props.data.nearMineCount ? props.data.nearMineCount : noText;

    if (props.gameOver) {
      return props.data.mine ?
        (props.data.mark === 'm' ? flagText : minetext) :
        countText;
    }
    if (!props.data.checked) {
      switch (props.data.mark) {
        default:
        case '':
          return noText;
        case 'm':
          return flagText;
        case '?':
          return qText;
      }
    }
    return props.data.mine ? minetext : countText;
  };

  const disabled = () => {
    if (!props.data) {
      return;
    }
    if (props.data.checked) {
      return 'TRUE';
    }
    if (props.gameOver && !props.data.mine) {
      return 'TRUE';
    }
  }

  const classes = () => {
    var classes = ['cell'];
    if (props.data) {
      if (props.data.checked) {
        if (props.data.mine) {
          classes.push('mine');
          classes.push('game-ender');
        } else {
          classes.push('near' + props.data.nearMineCount);
          if(props.data.mark === 'm') {
            classes.push('flagged');
          }
        }
      }
      if (props.gameOver && props.data.mine) {
        if(props.data.mark !== 'm') {
          classes.push('mine');
        }
      }
    }
    return classes.join(' ');
  }

  return (
    <button disabled={disabled()} className={classes()} onClick={() => {
      props.dispatch(action('checkCell', {
        x: props.x,
        y: props.y
      }));
      props.dispatch(action('checkBoard'));
    }}>
      {displayText()}
    </button>
  )
}