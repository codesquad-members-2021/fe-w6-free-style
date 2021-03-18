import React from 'react';
import useAsync from '../../DataInit/useAsync';

function PersonTypeList(props) {
  console.log(props.type);
  const refetch = useAsync();
  console.log(refetch);
  return (
    <div className="Person__Type__List flex-row center">
      {props.type.map((box, idx) => (
        <PersonTypeBox type={box} key={idx} />
      ))}
    </div>
  );
}

function PersonTypeBox({ type }) {
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
