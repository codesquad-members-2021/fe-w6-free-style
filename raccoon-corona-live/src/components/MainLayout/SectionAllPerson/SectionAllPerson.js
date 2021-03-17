import React from 'react';
import DataInit from '../../DataInit/DataInit';
import PersonTypeList from './PersonTypeList';

function SectionAllPerson() {
  const type = ['확진자', '사망자', '완치자', '검사자'];
  return (
    <div className="Section__All__Person">
      <PersonTypeList type={type} />
      <DataInit />
    </div>
  );
}

export default SectionAllPerson;
