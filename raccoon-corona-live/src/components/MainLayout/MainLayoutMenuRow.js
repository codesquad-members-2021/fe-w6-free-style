import React from 'react';

function MainLayoutMenuRow() {
  const upperBoxMenu = ['국내', '세계', '백신', '거리두기', '자주 묻는 질문'];
  return (
    <div className="MainLayout__MenuRow">
      {upperBoxMenu.map((menu) => (
        <Menu menu={menu} />
      ))}
    </div>
  );
}

function UpperMenuList() {
  const upperBoxMenu = ['국내', '세계', '백신', '거리두기', '자주 묻는 질문'];
  return (
    <>
      {upperBoxMenu.map((menu) => (
        <Menu menu={menu} />
      ))}
    </>
  );
}

// function BottomMenuList() {
//   const bottomBoxMenu = ['다크모드', '제보하기'];
//   return;
// }

function Menu({ menu }) {
  return (
    <>
      <div className="Layout__SBox center flex flex-row Layout__item">{/* svg > g > path */}</div>
      <span>{menu}</span>
    </>
  );
}

export default MainLayoutMenuRow;
