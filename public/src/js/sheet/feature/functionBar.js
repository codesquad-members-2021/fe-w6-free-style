import { _ } from '../../util/util';

class FunctionBar {
  constructor({ cellNameBox }) {
    this.nameBox = cellNameBox;
    this.functionInput = _.$('.function-box>input');
    this.init();
  }
  init() {
    this.addEvent();
  }
  addEvent() {
    this.functionInput.addEventListener('input', this.handleInput.bind(this));
  }
  handleInput({ target }) {}
  setNameBox(value) {
    this.nameBox.innerHTML = value;
  }
}

export default FunctionBar;
