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
    this._setSheetInputValue();
  }
  handleSheetInput({ target }) {
    if (!this._isParentTd(target)) return;
    this._setFunctionInputValue();
  }
  _isParentTd(node) {
    return node.parentElement.tagName === 'TD';
  }
  _setFunctionInputValue() {
    const selectInput = this.sheetModel.getLastInput();
    this.functionInput.value = selectInput.value;
  }
  _setSheetInputValue() {
    const selectInput = this.sheetModel.getLastInput();
    selectInput.value = this.functionInput.value;
  }
}

export default InputEvent;
