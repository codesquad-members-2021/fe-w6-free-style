import React from 'react';
import TitleLayout from './TitleLayout/TitleLayout';
import './MainLayout.scss';
import MainLayoutMenuSection from './MainLayoutMenuSection';
import SectionAllPerson from './SectionAllPerson/SectionAllPerson';
import SectionTodayPerson from './SectionTodayPerson/SectionTodayPerson';
import SectionChart from './SectionChart/SectionChart';
import SectionAddChart from './SectionAddChart/SectionAddChart';
import SectionMap from './SectionMap/SectionMap';
import FooterLayout from './FooterLayout/FooterLayout';

function MainLayoutWrapper() {
  const upperBoxMenu = ['국내', '세계', '백신', '거리두기', '자주 묻는 질문'];
  const bottomBoxMenu = ['다크모드', '제보하기'];
  return (
    <div className="padding__top MainLayout__Wrapper">
      <div className="Layout__SBox Layout__SCol MainLayout__MenuContainer">
        <MainLayoutMenuSection menu={upperBoxMenu} />
        <MainLayoutMenuSection menu={bottomBoxMenu} />
      </div>
      <div className="MainLayout__Main">
        <TitleLayout />
        <SectionAllPerson />
        <SectionTodayPerson />
        <SectionChart />
        <SectionAddChart />
        <SectionMap />
        <FooterLayout />
      </div>
    </div>
  );
}

export default MainLayoutWrapper;
