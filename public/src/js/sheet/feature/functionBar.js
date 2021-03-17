import { _ } from '../../util/util';

class FunctionBar {
  constructor({ cellNameBox, model }) {
    this.nameBox = cellNameBox;
    this.sheetModel = model;
    this.functionInput = functionInput;
    this.init();
  }
  init() {
    this.addEvent();
  }
  addEvent() {
    this.functionInput.addEventListener('input', this.handleInput.bind(this));
  }
  handleInput({ target }) {}
}

export default FunctionBar;
