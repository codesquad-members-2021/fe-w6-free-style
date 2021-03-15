import React from 'react';
import './MainLayout.scss';
import MainLayoutMenuSection from './MainLayoutMenuSection';

function MainLayoutWrapper() {
  return (
    <div className="MainLayout__Wrapper">
      <div className="Layout__SBox Layout__SCol MainLayout__MenuContainer">
        <MainLayoutMenuSection />
      </div>
      <div className="MainLayout__Main"></div>
    </div>
  );
}

export default MainLayoutWrapper;
