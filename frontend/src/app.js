class App {
  constructor({ $target }) {
    this.$target = $target;
    $target.appendChild(document.createElement("section"));
  }
}

export default App;