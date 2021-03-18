import _$ from "../../../util/MyQuerySelector.js";

class ClockPresentational {
  
  constructor({$target}) {
    this.render($target);
  }
  
  render($target) {
    const time = `${ new Date().getHours() }:${new Date().getMinutes()}`;
    
    const $ClockLayer = /* html */`
      <p class="time"> ${time} </p>
    `;
    
    _$($target).querySelector(".welcome").insertAdjacentHTML("afterbegin", $ClockLayer);
  }
}

export default ClockPresentational;