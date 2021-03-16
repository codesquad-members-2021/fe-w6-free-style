import React from 'react';
import TabMap from './TabMap';
import TabRegion from './TabRegion';

function MapUpper() {
    return (
    <div className="Map__Upper flex-row">
        <div className="Upper__Menu__Box flex-row">
            <TabMap />
            <TabRegion />
        </div>
    </div>
    )
}

export default MapUpper;