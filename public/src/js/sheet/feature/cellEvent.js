import { _ } from '../../util/util';
const KEYCODE = {
  TAB: 9,
  ENTER: 13,
  DELETD: 46,
};
class CellEvent {
  constructor(sheet, sheetModel) {
    this.sheet = sheet;
    this.sheetModel = sheetModel;
    this.focusedCell;
    this.focusedInput;
    this.init();
  }
  init() {
    this.addEvent();
  }
  addEvent() {
    this.sheet.addEventListener('mousedown', this.handleMousedown.bind(this));
    this.sheet.addEventListener('keydown', this.handleKeydown.bind(this));
  }
  handleMousedown({ target }) {
    if (this._isIndexCell(target)) return;
    this._focusCell(target);
  }
  handleKeydown(e) {
    const { keyCode } = e;
    console.log(keyCode);
    if (keyCode === KEYCODE.ENTER) this._handleEnter();
    if (keyCode === KEYCODE.TAB) this._handleTab();
  }
  _handleEnter() {
    const inputValue = this._getInputValue(this.focusedCell);
    const { column: focusColumn, row: rowColumn } = this._getLocation(this.focusedCell);
    this.sheetModel.setData({ column: focusColumn, row: rowColumn, value: inputValue });
    this._moveFocusedCell(0, 1);
  }
  _handleTab() {
    const inputValue = this._getInputValue(this.focusedCell);
    const { column: focusColumn, row: rowColumn } = this._getLocation(this.focusedCell);
    this.sheetModel.setData({ column: focusColumn, row: rowColumn, value: inputValue });
    this._moveFocusedCell(1, 0);
  }
  _focusCell(target) {
    if (this.focusedCell) this._removeFocused();
    this._setFocused(target);
    this._addFocused();
  }
  _addFocused() {
    this.focusedCell.classList.add('focused');
  }
  _removeFocused() {
    const { column, row } = this._getLocation(this.focusedCell);
    const focusedCell = _.$td({ x: column, y: row }, this.sheet);
    focusedCell.classList.remove('focused');
  }
  _isIndexCell(node) {
    const nodeParent = node.parentElement;
    return node.classList.contains('row-index') || nodeParent.classList.contains('column-index');
  }
  _setFocused(node) {
    if (this._isParentTd(node)) {
      this.focusedInput = node;
      this.focusedCell = node.parentElement;
    } else {
      this.focusedCell = node;
      this.focusedInput = node.firstElementChild;
    }
  }
  _setNewFocusedCell(moveColumn, moveRow) {
    const { column: focusColumn, row: rowColumn } = this._getLocation(this.focusedCell);
    const newFocusedCell = _.$td(
      { x: focusColumn * 1 + moveColumn, y: rowColumn * 1 + moveRow },
      this.sheet
    );
    this._setFocused(newFocusedCell);
  }
  _moveFocusedCell(moveColumn, moveRow) {
    this._focusOutInput();
    this._removeFocused();
    this._setNewFocusedCell(moveColumn, moveRow);
    this._focusInput();
    this._addFocused();
  }
  _isParentTd(node) {
    return node.parentElement.tagName === 'TD';
  }
  _focusInput() {
    this.focusedInput.focus();
  }
  _focusOutInput() {
    this.focusedInput.blur();
  }
  _getInputValue() {
    return this.focusedInput.value;
  }
  _getLocation(node) {
    const { attributes } = node;
    return { column: attributes.x.value, row: attributes.y.value };
  }
}

export default CellEvent;
