import React from 'react';
import { Hamburger } from '../../../svg/svgIndex';

function HamburgerButton() {
  return (
    <button className="Hamburger__Button basic--box">
      <div size="20" fill="#cfcfcf" className="Hamburger__Box flex felx-row Layout__Center--Box">
        <Hamburger />
      </div>
    </button>
  );
}

export default HamburgerButton;
