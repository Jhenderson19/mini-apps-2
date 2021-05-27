import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

import Event from './Event.jsx';

var EventTable = (props) => {
  return (
    <div>
      {props.events.map((event, index) => {
        return <Event event={event} key={index}/>;
      })}
    </div>
  )
};

export default EventTable;