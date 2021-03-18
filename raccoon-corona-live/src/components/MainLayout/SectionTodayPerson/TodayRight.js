import React from 'react';
import TodayRightItem from './TodayRightItem';

function TodayRight(props) {
  console.log(props);
  return (
    <div className="Today__Right flex-column center">
      {props.text.map((el, idx) => (
        <TodayRightItem text={el} number={props.number[idx]} key={idx} />
      ))}
    </div>
  );
}

export default TodayRight;
