import React from 'react';

function TabMenuList(props) {
  return (
    <div className="Tab__Menu--Box Tab__Flex flex flex-row">
      {props.menu.map((item, idx) => (
        <TabMenu menu={item.menu} svg={item.svg} key={idx} />
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
