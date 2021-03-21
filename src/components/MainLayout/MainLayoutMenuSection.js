import React from 'react';
import './MainLayout.scss';

function MainLayoutMenuSection(props) {
  return (
    <div className="MainLayout__MenuSection">
      {props.menu.map((menu, idx) => (
        <Menu menu={menu} key={idx} />
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
