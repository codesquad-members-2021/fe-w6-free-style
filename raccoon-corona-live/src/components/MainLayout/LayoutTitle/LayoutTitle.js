import React from 'react';
import TitleMenu from './TitleMenu';
import TitleTab from './TitleTab';

function LayoutTitle() {
  return (
    <div className="Layout__Title flex flex-column">
      <TitleMenu />
      <TitleTab />
    </div>
  );
}

export default LayoutTitle;
