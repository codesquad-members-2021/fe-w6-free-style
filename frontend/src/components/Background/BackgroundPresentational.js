class BackgroundPresentational {
  constructor({$target, src}) {
    this.$backgroundLayer = document.createElement("div");
    this.$backgroundLayer.className = "background-layer";

    $target.innerHTML = "";
    $target.append(this.$backgroundLayer);
    this.render(src);
  }
  
  render(src) {
    if (src) {
      this.$backgroundLayer.style.backgroundImage = `url(${src})`;
    }
    
  }
}

export default BackgroundPresentational;