import React from 'react';
import TabMenuList from './TabMenuList';

function TitleTab() {
  const tabMenu = ['국내', '세계', '백신', '거리두기'];

  return (
    <div className="Layout__Title--Tab flex-row flex Tab__Animation">
      <TabMenuList menu={tabMenu} />
    </div>
  );
}

export default TitleTab;
