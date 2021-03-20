import React from 'react';
import ArrowBox from './ArrowBox';

function TodayRightItemNumber(props) {
  return (
    <div className="Today__Right__Item__Number flex-row">
      <div className="changed--number number--background flex-row">
        {props.number}
        <div className="space"></div>
        <ArrowBox />
      </div>
    </div>
  );
}

export default TodayRightItemNumber;
