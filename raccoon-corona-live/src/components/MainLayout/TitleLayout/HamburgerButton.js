import React from 'react';
import HamburgerButtonSvg from '../../../svg/HamburgerButtonSvg';

function HamburgerButton() {
  return (
    <button className="Hamburger__Button basic--box">
      <div size="20" fill="#cfcfcf" className="Hamburger__Box flex felx-row Layout__Center--Box">
        <HamburgerButtonSvg />
      </div>
    </button>
  );
}

export default HamburgerButton;
