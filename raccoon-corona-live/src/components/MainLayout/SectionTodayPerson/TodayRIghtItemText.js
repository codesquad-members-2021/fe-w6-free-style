import React from 'react';

function TodayRightItemText({ text }) {
  return (
    <div className="Today__Right__Item__Text flex-row">
      <div>{text} </div>
    </div>
  );
}

export default TodayRightItemText;
