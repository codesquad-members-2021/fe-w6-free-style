import React from 'react';
import SectionTodayBottom from './SectionTodayBottom';
import SectionTodayUpper from './SectionTodayUpper';

function SectionTodayPerson() {
  return (
    <div className="Section__Today">
      <div className="Section__Today__Box">
        <SectionTodayUpper />
        <SectionTodayBottom />
      </div>
    </div>
  );
}

export default SectionTodayPerson;
