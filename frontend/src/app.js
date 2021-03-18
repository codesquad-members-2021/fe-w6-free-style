import BackgroundContainer from "./components/Background/BackgroundContainer.js"
import CenterWidgetComposition from "./components/CenterWidget/CenterWidgetComposition.js";

import _$ from "./util/MyQuerySelector.js";
import "./app.scss";

class App {
  constructor({ $target }) {
    
    const $backgroundSection = document.createElement("section");
    $backgroundSection.className = "background-section";
    $target.appendChild($backgroundSection);

    const $centerWidgetSection = document.createElement("section");
    $centerWidgetSection.className = "center-widget-section";
    $target.appendChild($centerWidgetSection);

    this.components = {
      background: new BackgroundContainer({
        $target: $backgroundSection,
      }),
      centerWidget: new CenterWidgetComposition({
        $target: $centerWidgetSection
      })
    }
  }
}

export default App;