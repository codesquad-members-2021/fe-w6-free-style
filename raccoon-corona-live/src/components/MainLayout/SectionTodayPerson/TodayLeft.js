import React from 'react';

function TodayLeft() {
    return ( 
        <div className="Today__Left section__spacebetween flex-column">
            <div className="Today__Left__Text flex-row">
                오늘 확진자수
            </div>
            <div className="Today__Left__Number__Box flex-row">
                <div className="Today__Left__Number flex-row">125
                <span>명</span></div>
            </div>
        </div>
    )
}

export default TodayLeft;