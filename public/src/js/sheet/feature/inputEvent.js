import { _ } from '../../util/util';

class InputEvent {
  constructor({ sheet, cellNameBox, model, functionInput }) {
    this.sheet = sheet;
    this.nameBox = cellNameBox;
    this.sheetModel = model;
    this.functionInput = functionInput;
    this.init();
  }
  init() {
    this.addEvent();
  }
  addEvent() {
    this.functionInput.addEventListener('input', this.handleFnInput.bind(this));
    this.sheet.addEventListener('input', this.handleSheetInput.bind(this));
  }
  handleFnInput({ target }) {
    const selectInput = this.sheetModel.getLastInput();
    selectInput.value = this.functionInput.value;
  }
  handleSheetInput({ target }) {
    if (!this._isParentTd(target)) return;
    const selectInput = this.sheetModel.getLastInput();
    this.functionInput.value = selectInput.value;
  }
  _isParentTd(node) {
    return node.parentElement.tagName === 'TD';
  }
}

export default InputEvent;
