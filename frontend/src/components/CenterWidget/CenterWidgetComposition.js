import WelcomePresentational from "./Welcome/WelcomePresentational.js";
import Cookie from "../../util/Cookie.js";

import "./CenterWidget.scss";

class CenterWidgetComposition {
  constructor({ $target }) {
    this.isFirstCome = true;
    this.state = {
      user: null
    };
    
    this.$centerWidgetLayer = document.createElement("div");
    this.$centerWidgetLayer.className = "center-widget";
    
    this.render($target);
  }

  checkUser() {
    // 향후 쿠키 확인하는 형태로 변경 예정
    return true;
  }

  render($target) {
    $target.innerHTML = "";
    
    if (this.checkUser()) {
      this.welcome = new WelcomePresentational({ 
        $target: this.$centerWidgetLayer,
        handleOnSubmitUser: this.handleOnSubmitUser,
      });
    }
    $target.append(this.$centerWidgetLayer);
  }

  handleOnSubmitUser(user) {
    const userData = `pm_username=${user}`;
    Cookie.set(userData);
    
    const state = {user: user};
    this.setState(state)
    this.user = user
    // 이후 리렌더;
  }

  setState(state) {
    const key = state.keys()[0];
    this.state[key] = state[key];
  }
  
}

export default CenterWidgetComposition;