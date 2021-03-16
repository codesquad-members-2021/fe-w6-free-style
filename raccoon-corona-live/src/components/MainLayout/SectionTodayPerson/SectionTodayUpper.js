import React from 'react';
import TodayLeft from './TodayLeft';
import TodayRight from './TodayRight';

function SectionTodayUpper() {
    return (
        <div className="Section__Today__Upper flex-row flex">
            <TodayLeft />
            <TodayRight />
            <TodayRight />
        </div>
    )
}

export default SectionTodayUpper;