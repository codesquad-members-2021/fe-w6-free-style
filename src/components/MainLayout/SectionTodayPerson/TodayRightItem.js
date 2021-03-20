import React from 'react';
import TodayRightItemNumber from './TodayRightItemNumber';
import TodayRightItemText from './TodayRIghtItemText';

function TodayRightItem(props) {
  const text = props.text;
  const number = props.number;
  return (
    <div className="Today__Right__Item flex-row">
      <TodayRightItemText text={text} />
      <TodayRightItemNumber number={number} />
    </div>
  );
}

export default TodayRightItem;
