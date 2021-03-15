import React from 'react';
import './MainLayout.scss';
import MainLayoutMenuSection from './MainLayoutMenuSection';

function MainLayoutWrapper() {
  const upperBoxMenu = ['국내', '세계', '백신', '거리두기', '자주 묻는 질문'];
  const bottomBoxMenu = ['다크모드', '제보하기'];
  return (
    <div className="MainLayout__Wrapper">
      <div className="Layout__SBox Layout__SCol MainLayout__MenuContainer">
        <MainLayoutMenuSection menu={upperBoxMenu} />
        <MainLayoutMenuSection menu={bottomBoxMenu} />
      </div>
      <div className="MainLayout__Main"></div>
    </div>
  );
}

export default MainLayoutWrapper;
