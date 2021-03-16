import React from 'react';
import Chart from './Chart';
import ChartMenu from './ChartMenu';

function ChartBox() {
    return (
    <div className="Chart__Box flex-column">
        <ChartMenu />
        <Chart />
    </div>
    )
}

export default ChartBox;