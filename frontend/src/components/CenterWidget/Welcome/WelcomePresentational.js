import _$ from "../../../util/MyQuerySelector.js";

class WelcomePresentational {
  constructor({ $target, handleOnChangeUser }) {
    this.render($target, handleOnChangeUser);
  }
  
  render($target, handleOnChangeUser) {
    const $WelcomeLayer = /* html */`
      <div class="welcome">
        <p class="title"> 어서오세요 ! </p>
        <p class="subtitle"> 당신을 어떻게 부를까요? </p>
        <input class="username" name="username" type="text" />
      </div>
    `;
    
    // console.log($WelcomeLayer, $target)
    $target.insertAdjacentHTML("beforeend", $WelcomeLayer);
    
    _$($target).querySelector("input.username").addEventListener("keyup", ({target}) => {
      handleOnChangeUser(target.value);
      if 
    })
    
  }

}

export default WelcomePresentational;