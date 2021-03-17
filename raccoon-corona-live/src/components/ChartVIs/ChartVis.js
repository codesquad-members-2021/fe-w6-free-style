import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineMarkSeries } from 'react-vis';

class ChartVis extends Component {
  render() {
    const data = [{ x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 4 }, { x: 3, y: 9 }, { x: 4, y: 1 }, { x: 5, y: 7 }, { stroke: '#5673ea' }];
    return (
      <div className="ChartVis">
        <XYPlot height={400} width={400}>
          <LineMarkSeries data={data} />
        </XYPlot>
      </div>
    );
  }
}

export default ChartVis;
