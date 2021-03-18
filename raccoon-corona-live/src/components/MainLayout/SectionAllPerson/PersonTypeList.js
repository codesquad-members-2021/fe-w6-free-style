import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _ from '../../const';

function PersonTypeList() {
  const typeArray = _.allPerson.type;
  const [data, setData] = useState({
    type: 0,
    number: 0,
    change: 0,
  });

  async function fetchData() {
    const request = `/domestic-init.json`;
    const response = await axios.get(request);
    const data = response.data.stats;
    return data;
  }
  async function getData() {
    const response = await fetchData();

    setData({
      type: typeArray[0],
      number: response.cases[0],
      change: response.cases[1],
    });
    console.table(response);

    console.table(data);
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(data);
  return (
    <div className="Person__Type__List flex-row center">
      {typeArray.map((box, idx) => (
        <PersonTypeBox //
          type={box}
          number={data.number}
          change={data.change}
          key={idx}
        />
      ))}
    </div>
  );
}

function PersonTypeBox({ type, number, change }) {
  return (
    <div className="Person__Type__Box flex-column flex center">
      <div className="Person__Type flex-row flex">{type}</div>
      <div className="Person__Number flex-row flex">{number}</div>
      <div className="Person__Change flex-row flex">{change}</div>
    </div>
  );
}

export default PersonTypeList;
