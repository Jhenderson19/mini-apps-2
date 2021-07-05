import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import {Provider} from 'react-redux';
import store from './store.js';

console.log('starting application');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
