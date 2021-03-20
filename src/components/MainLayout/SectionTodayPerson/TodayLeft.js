import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { todayLeft } from '../../const';

function TodayLeft() {
  const [today, setToday] = useState(0);
  const { title, unit } = todayLeft;
  async function fetchData() {
    const request = `/domestic-init.json`;
    const response = await axios.get(request);
    const data = response.data.statsLive;
    setToday(data.today);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Today__Left section__spacebetween flex-column">
      <div className="Today__Left__Text flex-row">{title}</div>
      <div className="Today__Left__Number__Box flex-row">
        <div className="Today__Left__Number flex-row">
          {today}
          <span>{unit}</span>
        </div>
      </div>
    </div>
  );
}

export default TodayLeft;
