import React from 'react';
import TabMenu from './TabMenu';

function TitleTab() {
  const tabMenu = ['국내', '세계', '백신', '거리두기'];

  return (
    <div className="Layout__Title--Tab flex-row flex Tab__Animation">
      <TabMenu menu={tabMenu} />
      <TabMenu menu={tabMenu} />
      <TabMenu menu={tabMenu} />
      <TabMenu menu={tabMenu} />
    </div>
  );
}

export default TitleTab;
