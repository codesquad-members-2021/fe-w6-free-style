import React from 'react';
import TabMenuList from './TabMenuList';

import { Vaccine, KoreaMap, Globe, Flag } from '../../../svg/svgIndex';

function TitleTab() {
  const tabMenu = [
    { menu: '국내', svg: <KoreaMap /> },
    { menu: '세계', svg: <Globe /> },
    { menu: '백신', svg: <Vaccine /> },
    { menu: '거리두기', svg: <Flag /> },
  ];

  return (
    <div className="Layout__Title--Tab flex-row flex Tab__Animation">
      <TabMenuList menu={tabMenu} />
    </div>
  );
}

export default TitleTab;
