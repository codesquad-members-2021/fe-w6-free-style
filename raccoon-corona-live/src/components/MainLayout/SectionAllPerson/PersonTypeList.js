import React, { useEffect, useState } from 'react';
import axios from 'axios';
import personBox from '../../const';

function PersonTypeList() {
  const [data, setData] = useState(personBox);

  async function fetchData() {
    const request = `/domestic-init.json`;
    const response = await axios.get(request);
    const data = response.data.stats;
    return data;
  }
  async function getData() {
    const response = await fetchData();

    setData([
      {
        name: '확진자',
        number: response.cases[0],
        change: response.cases[1],
        color: 'rgb(235, 83, 116)',
      },
      {
        name: '사망자',
        number: response.deaths[0],
        change: response.deaths[1],
        color: 'rgb(136, 136, 136)',
      },
      {
        name: '완치자',
        number: response.recovered[0],
        change: response.recovered[1],
        color: 'rgb(23, 138, 23)',
      },
      {
        name: '검사자',
        number: response.tests[0],
        change: response.tests[1],
        color: 'rgb(86, 115, 235)',
      },
    ]);
  }

  useEffect(() => {
    getData();
  });

  return (
    <div className="Person__Type__List flex-row center">
      {data.map((box, idx) => (
        <PersonTypeBox //
          type={box.name}
          number={box.number}
          change={box.change}
          color={box.color}
          key={idx}
        />
      ))}
    </div>
  );
}

function PersonTypeBox({ type, number, change, color }) {
  const style = {
    color: color,
  };
  return (
    <div className="Person__Type__Box flex-column flex center">
      <div className="Person__Type flex-row flex">{type}</div>
      <div className="Person__Number flex-row flex" style={style}>
        {number}
      </div>
      <div className="Person__Change flex-row flex" style={style}>
        {change}
      </div>
    </div>
  );
}

export default PersonTypeList;
