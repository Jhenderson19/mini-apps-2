import React from 'react';
import Keypad from './components/Keypad.jsx';
import ScoreCard from './components/ScoreCard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);


  }
  render() {
    return (
      <div>
        <ScoreCard />
        <br />
        <br />
        <br />
        Hit How Many Pins?
        <Keypad />
        <br />
      </div>
    )
  }
}

export default App;
