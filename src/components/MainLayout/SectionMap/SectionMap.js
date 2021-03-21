import React from 'react';
import MapBottom from './MapBottom';
import MapUpper from './MapUpper';

function SectionMap() {
    return (
		<div className="Section__Map">
			<div className="map--margin"></div>
			<MapUpper />
			<MapBottom />
		</div>
		)
}

export default SectionMap;