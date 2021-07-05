import React from "react";
import action from "../../helpers/Action";
import { connect } from 'react-redux';

const StartButton = (props) => {
  return (
    <button onClick={(e) => {
      e.preventDefault();
      props.dispatch(action('newGame', props.label));
    }}>{props.label}</button>
  )
}

export default connect()(StartButton);