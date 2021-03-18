import BackgroundPresentational from "./BackgroundPresentational.js"
import API from "../../util/API.js";
import "./Background.scss";

class BackgroundContainer {
  constructor({ $target }) {
    this.$target = $target;
    this.setState();
  }
  
  async setState() {
    this.data = await API.get.randomImage();
    const idx = parseInt(Math.random()*this.data.hits.length-1);
    this.render(this.data.hits[idx].largeImageURL);
  }

  render(src = undefined) {
    this.presentational = new BackgroundPresentational({
      $target: this.$target,
      src: src
    });
  }
}
// randomImage

export default BackgroundContainer;