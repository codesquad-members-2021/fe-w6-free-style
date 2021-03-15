import React from 'react';
import AirplaneButton from './AirplaneButton';
import CoronaTitle from './CoronaTitle';
import HamburgerButton from './HamburgerButton';

function TitleMenu() {
  return (
    <div className="Layout__Title--Menu flex-row flex">
      <AirplaneButton />
      <CoronaTitle />
      <HamburgerButton />
    </div>
  );
}

export default TitleMenu;
