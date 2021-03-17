import React from 'react';
import DataInit from '../../DataInit/DataInit';
import Axios from './Axios';
import ChartBox from './ChartBox';

function SectionChart() {
  return (
    <div className="Section__Chart">
      <ChartBox />
      <Axios />
      <DataInit />
    </div>
  );
}

export default SectionChart;
