import WelcomePresentational from "./Welcome/WelcomePresentational.js";
import ClockPresentational from "./Clock/ClockPresentational.js";
import Cookie from "../../util/Cookie.js";

import "./CenterWidget.scss";

class CenterWidgetComposition {
  constructor({ $target }) {
    this.$target = $target;
    this.state = {
      user: null
    };
    
    this.$centerWidgetLayer = document.createElement("div");
    this.$centerWidgetLayer.className = "center-widget";
    
    this.render();
  }

  render() {
    // this.$target.innerHTML = "";
    this.$centerWidgetLayer.innerHTML = "";
    
    this.$target.append(this.$centerWidgetLayer);
    
    this.welcome = new WelcomePresentational({ 
      $target: this.$centerWidgetLayer,
      handleOnChangeUser: this.handleOnChangeUser.bind(this),
      handleOnSubmitUser: this.handleOnSubmitUser.bind(this),
      username: Cookie.get("pm_username")
    }); 
    
    this.$clock = new ClockPresentational({
      $target: this.$centerWidgetLayer
    });
    
  }

  handleOnSubmitUser() { 
    console.log(this.state.user);
    if (!this.state.user){
      return;
    }
    
    Cookie.set("pm_username", this.state.user);
    this.render();
  }

  handleOnChangeUser(user) {
    const state = { user: user };
    this.setState(state);
  }

  setState(state) {
    const key = Object.keys(state)[0];
    this.state[key] = state[key];
  }
  
}

export default CenterWidgetComposition;