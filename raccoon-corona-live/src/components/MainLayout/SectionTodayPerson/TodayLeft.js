import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TodayLeft() {
  const [today, setToday] = useState(0);

  async function fetchData() {
    const request = `/domestic-init.json`;
    const response = await axios.get(request);
    const data = response.data.statsLive;
    return data;
  }

  async function getData() {
    const response = await fetchData();
    setToday(response.today);
  }

  useEffect(() => {
    getData();
  });

  return (
    <div className="Today__Left section__spacebetween flex-column">
      <div className="Today__Left__Text flex-row">오늘 확진자수</div>
      <div className="Today__Left__Number__Box flex-row">
        <div className="Today__Left__Number flex-row">
          {today}
          <span>명</span>
        </div>
      </div>
    </div>
  );
}

export default TodayLeft;
