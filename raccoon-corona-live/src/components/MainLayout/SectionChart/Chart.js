import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from '@toast-ui/react-chart';

function Chart() {
  const data = {
    categories: ['0', '0', '0', '0', '0', '0'],
    series: [
      {
        name: 'today',
        data: [0, 0, 0, 0, 0, 0],
      },
      {
        name: 'yesterday',
        data: [0, 0, 0, 0, 0, 0],
      },
    ],
  };

  const options = {
    chart: {
      width: 450,
      height: 400,
      title: 'Corona Live',
      format: '1,000',
    },
    yAxis: {
      title: 'count',
    },
    xAxis: {
      title: 'time',
    },
    series: {
      showLabel: true,
    },
  };

  const [updateData, setUpdateData] = useState(data);

  async function fetchData() {
    const request = `/domestic-init.json`;
    const response = await axios.get(request);
    const data = response.data.timeseries;
    console.log(data.today);

    const timeArr = (key) => Object.keys(key);
    const countArr = (value) => Object.values(value);

    setUpdateData({
      categories: timeArr(data.today),
      series: [
        {
          name: 'today',
          data: countArr(data.today),
        },
        {
          name: 'yesterday',
          data: countArr(data.yesterday),
        },
      ],
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Chart">
      <LineChart data={updateData} options={options} />
    </div>
  );
}

export default Chart;
