import React from "react";
import action from "../../helpers/Action";
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({mode: state.mode});

const ModeSelect = (props) => {
  return (
    <button onClick={(e) => {
      e.preventDefault();
      props.dispatch(action('nextMode'));
    }}>CLICK MODE: {props.mode.toUpperCase()}</button>
  )
}

export default connect(mapStateToProps)(ModeSelect);