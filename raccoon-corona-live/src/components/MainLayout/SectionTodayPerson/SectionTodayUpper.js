import React, { useEffect, useState } from 'react';
import TodayLeft from './TodayLeft';
import TodayRight from './TodayRight';
import axios from 'axios';

function SectionTodayUpper() {
  const statsLive1 = [
    {
      text: ['어제', '1주전'],
      number: [0, 0],
    },
  ];
  const statsLive2 = [
    {
      text: ['2주전', '1달전'],
      number: [0, 0],
    },
  ];

  const [stats1, setStats1] = useState(statsLive1);
  const [stats2, setStats2] = useState(statsLive2);

  async function fetchData() {
    const request = `/domestic-init.json`;
    const response = await axios.get(request);
    const data = response.data.statsLive;
    return data;
  }

  async function getData() {
    const response = await fetchData();

    setStats1({
      text: ['어제', '1주전'],
      number: [response.yesterday, response.weekAgo],
    });
    setStats2({
      text: ['2주전', '1달전'],
      number: [response.twoWeeksAgo, response.monthAgo],
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Section__Today__Upper flex-row flex">
      <TodayLeft />
      <TodayRight text={stats1.text} number={stats1.number} />
      <TodayRight text={stats2.text} number={stats2.number} />
    </div>
  );
}

export default SectionTodayUpper;
