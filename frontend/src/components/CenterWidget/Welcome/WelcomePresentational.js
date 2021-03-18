class WelcomePresentational {
  constructor({ $target, handleOnSubmitUser }) {
    this.render($target, handleOnSubmitUser);
  }
  
  render($target, handleOnSubmitUser) {
    const time = `${ new Date().getHours() }:${new Date().getMinutes()}`;
    const $WelcomeLayer = /* html */`
      <div class="welcome">
        <p class="time"> ${time} </p>
        <p class="title"> 어서오세요 ! </p>
        <p class="subtitle"> 당신을 어떻게 부를까요? </p>
        <input class="username" name="username" type="text" />
      </div>
    `;
    
    console.log($WelcomeLayer, $target)
    $target.insertAdjacentHTML("beforeend", $WelcomeLayer);
  }

}

export default WelcomePresentational;