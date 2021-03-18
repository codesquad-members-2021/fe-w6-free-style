import _$ from "../../../util/MyQuerySelector.js";

class WelcomePresentational {
  constructor({ $target, handleOnChangeUser, handleOnSubmitUser, username }) {
    this.render($target, handleOnChangeUser, handleOnSubmitUser, username);
  }
  
  addEvent($target) {
    _$($target).querySelector("input.username").addEventListener("keyup", ({target, keyCode}) => {
      handleOnChangeUser(target.value);
      if (keyCode === 13) {
        handleOnSubmitUser();
      }
    });
  }
  
  render($target, handleOnChangeUser, handleOnSubmitUser, username) {
    let $AskLayer, $UsernameLayer;

    if (username) {
      $UsernameLayer = /* html */ `
        <p class="title"> 어서오세요 ! ${ username } </p>
      `;
    } else {
      $AskLayer = /* html */ `
        <p class="title"> 어서오세요 ! 낯선 사람 </p>
        <p class="subtitle"> 당신을 어떻게 부를까요? </p>
        <input class="username" name="username" type="text" />
      `;

      this.addEvent($target);
    }
    
    const $WelcomeLayer = /* html */`
      <div class="welcome">
        ${ username ? $UsernameLayer : $AskLayer }
      </div>
    `;
    
    $target.insertAdjacentHTML("beforeend", $WelcomeLayer); 
  }

}

export default WelcomePresentational;