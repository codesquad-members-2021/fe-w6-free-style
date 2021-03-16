import React from 'react';
import Axios from './Axios';
import ChartBox from './ChartBox';

function SectionChart() {
  return (
    <div className="Section__Chart">
      <ChartBox />
      <Axios />
    </div>
  );
}

export default SectionChart;
