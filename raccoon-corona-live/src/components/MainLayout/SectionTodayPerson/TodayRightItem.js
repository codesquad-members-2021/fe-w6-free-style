import React from 'react';
import TodayRightItemNumber from './TodayRightItemNumber';
import TodayRightItemText from './TodayRIghtItemText';

function TodayRightItem() {
    return (
    <div className="Today__Right__Item flex-row">
        <TodayRightItemText />
        <TodayRightItemNumber />
    </div>
    )
}

export default TodayRightItem;