import { _ } from '../../util/util';
const KEYCODE = {
  TAB: 9,
  ENTER: 13,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETD: 46,
};
class CellEvent {
  constructor({ sheet, model, cellNameBox }) {
    this.sheet = sheet;
    this.sheetModel = model;
    this.cellNameBox = cellNameBox;
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
    if (keyCode === KEYCODE.ENTER) this._handleMoveCell({ moveColumn: 0, moveRow: 1 });
    if (keyCode === KEYCODE.TAB) this._handleMoveCell({ moveColumn: 1, moveRow: 0, isTab: true });
    if (keyCode === KEYCODE.LEFT) this._handleMoveCell({ moveColumn: -1, moveRow: 0 });
    if (keyCode === KEYCODE.RIGHT) this._handleMoveCell({ moveColumn: 1, moveRow: 0 });
    if (keyCode === KEYCODE.UP) this._handleMoveCell({ moveColumn: 0, moveRow: -1 });
    if (keyCode === KEYCODE.DOWN) this._handleMoveCell({ moveColumn: 0, moveRow: 1 });
    if (keyCode === KEYCODE.DELETD) this._handleDelete();
  }
  _handleMoveCell(column, row) {
    const inputValue = this._getInputValue(this.focusedCell);
    const { column: focusColumn, row: rowColumn } = this._getLocation(this.focusedCell);
    this.sheetModel.setData({ column: focusColumn, row: rowColumn, value: inputValue });
    this._moveFocusedCell(column, row);
    this._setCellNameBox();
  }
  _handleDelete() {
    this._clearInput();
  }
  _focusCell(target) {
    if (this.focusedCell) this._removeFocused();
    this._setFocused(target);
    this._addFocused();
    this._setCellNameBox();
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
    const { column: focusColumn, row: focusRow } = this._getLocation(this.focusedCell);
    const moveIdx = { column: focusColumn * 1 + moveColumn, row: focusRow * 1 + moveRow };
    if (
      moveIdx.column <= 0 ||
      moveIdx.column > this.sheetModel.maxColumn ||
      moveIdx.row <= 0 ||
      moveIdx.row > this.sheetModel.maxRow
    )
      return;
    const newFocusedCell = _.$td({ x: moveIdx.column, y: moveIdx.row }, this.sheet);
    this._setFocused(newFocusedCell);
  }
  _moveFocusedCell({ moveColumn, moveRow, isTab = false }) {
    if (!isTab) this._focusOutInput();
    this._removeFocused();
    this._setNewFocusedCell(moveColumn, moveRow);
    if (!isTab) this._focusInput();
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
  _clearInput() {
    this.focusedInput.value = '';
  }
  _setInputValue(value) {
    this.focusedInput.value = value;
  }
  _getInputValue() {
    return this.focusedInput.value;
  }
  _getLocation(node) {
    const { attributes } = node;
    return { column: attributes.x.value, row: attributes.y.value };
  }
  _setCellNameBox() {
    const { column, row } = this._getLocation(this.focusedCell);
    const columnAsciiNum = 'A'.charCodeAt() + column * 1 - 1;
    const cellName = String.fromCharCode(columnAsciiNum) + row;
    this.cellNameBox.innerHTML = cellName;
  }
}

export default CellEvent;
