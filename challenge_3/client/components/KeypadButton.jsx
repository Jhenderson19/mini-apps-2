import React from 'react';
import css from './styles/KeypadButton.css';

export default (props) => {

  return (
    <button className='keypadButton' onClick={() => {
      props.hitPins(props.pins);
    }}>{props.pins}</button>
  )

}