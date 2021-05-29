import React from 'react';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';

class BtcChart extends React.Component {
  constructor(props) {
    super(props);

    this.chartRef = React.createRef();

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    console.log('this.state.data', this.state.data);

    new Chart(this.chartRef.current.getContext('2d'), {
      type: 'line',
      data: {
        //Bring in data
        labels: Object.keys(this.state.data),
        datasets: [
            {
                label: "Value ($USD)",
                data: Object.keys(this.state.data).map( key => { return this.state.data[key]; }),
            }
        ]
      }
    })
  }

  getData() {
    axios.get('/api/btc').then((response) => {
      console.log('response.data', response.data);
      this.setState({data: response.data.bpi});
    });
  }

  render() {
    return (
      <div>
        {this.state.data !== null ? <canvas id='btcCanvas' ref={this.chartRef} ></canvas> : null }
        <span>Powered By CoinDesk</span>
      </div>
    )
  }
}

export default BtcChart;