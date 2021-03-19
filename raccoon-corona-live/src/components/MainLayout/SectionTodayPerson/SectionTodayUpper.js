import React, { useEffect, useState } from 'react';
import TodayLeft from './TodayLeft';
import TodayRight from './TodayRight';
import axios from 'axios';

function SectionTodayUpper() {
  const statsLive1 = {
      text: ['어제', '1주전'],
      number: [0, 0],
    };
  const statsLive2 = {
      text2: ['2주전', '1달전'],
      number2: [0, 0],
    };

  const [stats1, setStats1] = useState(statsLive1);
  const [stats2, setStats2] = useState(statsLive2);

  const { text, number } = stats1;
  const { text2, number2 } = stats2;

  async function fetchData() {
    const request = `/domestic-init.json`;
    const response = await axios.get(request);
    const data = response.data.statsLive;
    console.log(data)
    debugger;
    const update = {
      text,
      number: [data.yesterday, data.weekAgo]
    }
    const update2 = {
      text2,
      number2: [data.twoWeeksAgo, data.monthAgo]
    }
  
    setStats1(update);
    setStats2(update2);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Section__Today__Upper flex-row flex">
      <TodayLeft />
      <TodayRight text={stats1.text} number={stats1.number} />
      <TodayRight text={stats2.text2} number={stats2.number2} />
    </div>
  );
}

export default SectionTodayUpper;
