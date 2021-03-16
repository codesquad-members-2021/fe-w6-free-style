import React from 'react';
import SectionTodayBottom from './SectionTodayBottom';
import SectionTodayUpper from './SectionTodayUpper';

function SectionTodayBox() {
    return (
    <div className="Section__Today__Box">
        <SectionTodayUpper />
        <SectionTodayBottom />
    </div>
    )
}

export default SectionTodayBox;