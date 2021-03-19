import React, { useEffect, useState } from 'react';
import TodayLeft from './TodayLeft';
import TodayRight from './TodayRight';
import axios from 'axios';

function SectionTodayUpper() {
  const todayCenterData = {
    textCenter: ['어제', '1주전'],
    number: [0, 0],
  };
  const todayRightData = {
    textRight: ['2주전', '1달전'],
    number: [0, 0],
  };

  const [todoayCenter, setTodayCenter] = useState(todayCenterData);
  const [todoayRight, setTodayRight] = useState(todayRightData);

  const { textCenter } = todoayCenter;
  const { textRight } = todoayRight;

  async function fetchData() {
    const request = `/domestic-init.json`;
    const response = await axios.get(request);
    const data = response.data.statsLive;

    const updateTodayCenter = {
      textCenter,
      number: [data.yesterday, data.weekAgo],
    };
    const updateTodayRight = {
      textRight,
      number: [data.twoWeeksAgo, data.monthAgo],
    };

    setTodayCenter(updateTodayCenter);
    setTodayRight(updateTodayRight);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Section__Today__Upper flex-row flex">
      <TodayLeft />
      <TodayRight text={todoayCenter.textCenter} number={todoayCenter.number} />
      <TodayRight text={todoayRight.textRight} number={todoayRight.number} />
    </div>
  );
}

export default SectionTodayUpper;
