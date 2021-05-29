import React from 'react';
import BtcChart from './BtcChart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        Bitcoin Viewer
        <BtcChart />
      </div>
    )
  }
}

export default App;