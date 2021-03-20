import React from 'react';
import { Airplane } from '../../../svg/svgIndex';

function AirplaneButton() {
  return (
    <button className="Airplane__Button basic--box">
      <div size="20" fill="#cfcfcf" className="Airplane__Box Layout__Center--Box flex flex-row">
        <Airplane />
      </div>
    </button>
  );
}

export default AirplaneButton;
