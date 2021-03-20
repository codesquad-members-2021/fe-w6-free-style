import React, { useEffect, useState } from 'react';
import TodayLeft from './TodayLeft';
import TodayRight from './TodayRight';
import axios from 'axios';
import { todayCenterData, todayRightData } from '../../const';

function SectionTodayUpper() {
  const [todayCenter, setTodayCenter] = useState(todayCenterData);
  const [todayRight, setTodayRight] = useState(todayRightData);

  const { textCenter } = todayCenter;
  const { textRight } = todayRight;

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
      <TodayRight text={todayCenter.textCenter} number={todayCenter.number} />
      <TodayRight text={todayRight.textRight} number={todayRight.number} />
    </div>
  );
}

export default SectionTodayUpper;
