import React from 'react';

function MainLayoutMenuSection(props) {
  return (
    <div className="MainLayout__MenuSection">
      {props.menu.map((menu) => (
        <Menu menu={menu} />
      ))}
    </div>
  );
}

function Menu({ menu }) {
  return (
    <div className="MainLayout__MenuRow">
      <div className="Layout__SBox center flex flex-row Layout__item">{/* svg > g > path */}</div>
      <span>{menu}</span>
    </div>
  );
}

export default MainLayoutMenuSection;
