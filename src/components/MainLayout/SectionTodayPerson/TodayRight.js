import React from 'react';
import TodayRightItem from './TodayRightItem';

function TodayRight({ text, number }) {
  return (
    <div className="Today__Right flex-column center">
      {text.map((el, idx) => (
        <TodayRightItem text={el} number={number[idx]} key={idx} />
      ))}
    </div>
  );
}

export default TodayRight;
