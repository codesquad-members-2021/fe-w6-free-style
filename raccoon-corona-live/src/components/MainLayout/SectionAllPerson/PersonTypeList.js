import React, { useState } from 'react';
import axios from 'axios';
import _ from '../../const';

function PersonTypeList() {
  const allPersonArray = _.allPerson.type;
  const [number, setNumber] = useState(0);
  const [change, setChange] = useState(0);

  async function fetchData() {
    const request = `/domestic-init.json`;
    const response = await axios.get(request);
    const data = response.data.stats;
    return data;
  }
  async function getData() {
    const data = await fetchData();
    console.table(data);
    setNumber(data.cases[0]);
    setChange(data.cases[1]);
  }

  getData();

  return (
    <div className="Person__Type__List flex-row center">
      {allPersonArray.map((box, idx) => (
        <PersonTypeBox type={box} key={idx} number={number} change={change} />
      ))}
    </div>
  );
}

function PersonTypeBox({ type, number, change }) {
  return (
    <div className="Person__Type__Box flex-column flex center">
      <PersonType type={type} />
      <PersonNumber number={number} />
      <PersonChange change={change} />
    </div>
  );
}

function PersonType({ type }) {
  return <div className="Person__Type flex-row flex">{type}</div>;
}

function PersonNumber({ number }) {
  return <div className="Person__Number flex-row flex">{number}</div>;
}

function PersonChange({ change }) {
  return <div className="Person__Change flex-row flex">{change}</div>;
}

export default PersonTypeList;
