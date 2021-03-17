import React from 'react';
import PersonTypeList from './PersonTypeList';

function SectionAllPerson() {
  const type = ['확진자', '사망자', '완치자', '검사자'];
  return (
    <div className="Section__All__Person">
      <PersonTypeList type={type} />
    </div>
  );
}

export default SectionAllPerson;
