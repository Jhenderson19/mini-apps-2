import React from 'react';

const Event = (props) => {
  return (
    <div>
      {props.event.date.indexOf('/') === -1 ? `Occurred in ${props.event.date}` : `Occurred on ${props.event.date}`} <br />
      What Happened? -
      <div style={{paddingLeft: '50px'}}>
        {props.event.description}
      </div>
      <br />
    </div>
  )
}

export default Event;