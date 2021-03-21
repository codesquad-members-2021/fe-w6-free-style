import React from 'react';

function TabMenuList({ menu }) {
  return (
    <div className="Tab__Menu--Box Tab__Flex flex flex-row">
      {menu.map(({ menu, svg }, idx) => (
        <TabMenu menu={menu} svg={svg} key={idx} />
      ))}
    </div>
  );
}

function TabMenu({ menu, svg }) {
  return (
    <div className="Tab__Menu flex flex-row first">
      <div size="14" className="Tab__svg Layout__item flex-row center">
        {svg}
      </div>
      <span>{menu} </span>
    </div>
  );
}

export default TabMenuList;
