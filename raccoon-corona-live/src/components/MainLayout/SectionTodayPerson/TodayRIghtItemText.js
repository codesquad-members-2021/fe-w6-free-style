import React from 'react';

function TodayRightItemText(props) {
  return (
    <div className="Today__Right__Item__Text flex-row">
      <div>{props.text} </div>
    </div>
  );
}

export default TodayRightItemText;
