import React from 'react';
import DataInit from '../../DataInit/DataInit';
import PersonTypeList from './PersonTypeList';
import _ from '../../const';

function SectionAllPerson() {
  return (
    <div className="Section__All__Person">
      <PersonTypeList type={_.allPerson.type} />
      <DataInit />
    </div>
  );
}

export default SectionAllPerson;
