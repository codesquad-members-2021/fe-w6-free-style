import React from 'react';
import axios from 'axios';

function PersonTypeList(props) {
  console.log(props.type);

  return (
    <div className="Person__Type__List flex-row center">
      {props.type.map((box, idx) => (
        <PersonTypeBox type={box} key={idx} />
      ))}
    </div>
  );
}
async function fetchData() {
  const request = `/domestic-init.json`;
  const response = await axios.get(request);
  const data = response.data.stats;
  console.log(data);
  return data;
}

function PersonTypeBox({ type }) {
  const data = fetchData();
  return (
    <div className="Person__Type__Box flex-column flex center">
      <PersonType type={type} />
      <PersonNumber />
      <PersonChange />
    </div>
  );
}

function PersonType({ type }) {
  return <div className="Person__Type flex-row flex">{type}</div>;
}

function PersonNumber() {
  return <div className="Person__Number flex-row flex">96380</div>;
}

function PersonChange() {
  return <div className="Person__Change flex-row flex">363</div>;
}

export default PersonTypeList;
