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
class KeyboardEvent {
  constructor({ sheet, model, cellNameBox, functionInput }) {
    this.sheet = sheet;
    this.sheetModel = model;
    this.cellNameBox = cellNameBox;
    this.functionInput = functionInput;
    this.focusedCell;
    this.focusedInput;
    this.init();
  }
  init() {
    this.addEvent();
  }
  addEvent() {
    this.sheet.addEventListener('mousedown', this.handleMousedown.bind(this));
    this.functionInput.addEventListener('keydown', this.handleFnKeydown.bind(this));
    this.sheet.addEventListener('keydown', this.handleSheetKeydown.bind(this));
  }
  handleMousedown({ target }) {
    if (this._isIndexCell(target)) return;
    this._focusCell(target);
  }
  handleSheetKeydown({ keyCode }) {
    this._commonKeyboardEvent(keyCode);
    if (keyCode === KEYCODE.DELETD) this._handleDelete();
    if (keyCode === KEYCODE.ENTER) this._handleMoveCell({ moveColumn: 0, moveRow: 1 });
  }
  handleFnKeydown({ keyCode }) {
    if (!this.sheetModel.getLastInput()) return;
    this._commonKeyboardEvent(keyCode);
    if (keyCode === KEYCODE.ENTER) this._handleMoveCell({ moveColumn: 0, moveRow: 0 });
  }
  _commonKeyboardEvent(keyCode) {
    if (keyCode === KEYCODE.TAB) this._handleMoveCell({ moveColumn: 1, moveRow: 0, isTab: true });
    if (keyCode === KEYCODE.LEFT) this._handleMoveCell({ moveColumn: -1, moveRow: 0 });
    if (keyCode === KEYCODE.RIGHT) this._handleMoveCell({ moveColumn: 1, moveRow: 0 });
    if (keyCode === KEYCODE.UP) this._handleMoveCell({ moveColumn: 0, moveRow: -1 });
    if (keyCode === KEYCODE.DOWN) this._handleMoveCell({ moveColumn: 0, moveRow: 1 });
  }
  _handleMoveCell(column, row) {
    const selectCell = this.sheetModel.getLastCell();
    const inputValue = this._getInputValue(selectCell);
    const { column: focusColumn, row: rowColumn } = this._getLocation(selectCell);
    this.sheetModel.setData({ column: focusColumn, row: rowColumn, value: inputValue });
    this._moveFocusedCell(column, row);
    this._setCellNameBox();
    this._setFunctionInput();
  }
  _handleDelete() {
    this._clearInput();
    this._setFunctionInput();
  }
  _focusCell(target) {
    if (this.sheetModel.getLastCell()) this._removeFocused();
    this._setFocused(target);
    this._addFocused();
    this._setCellNameBox();
    this._setFunctionInput();
  }
  _addFocused() {
    const selectData = this.sheetModel.getSelectData();
    selectData.forEach(({ cell }) => {
      const { column, row } = this._getLocation(cell);
      const focusedCell = _.$td({ x: column, y: row }, this.sheet);
      focusedCell.classList.add('focused');
    });
  }
  _removeFocused() {
    const selectData = this.sheetModel.getSelectData();
    selectData.forEach(({ cell }) => {
      const { column, row } = this._getLocation(cell);
      const focusedCell = _.$td({ x: column, y: row }, this.sheet);
      focusedCell.classList.remove('focused');
    });
  }
  _setFocused(node) {
    if (this._isParentTd(node)) {
      const input = node;
      const cell = node.parentElement;
      this.sheetModel.setSelectData([{ cell, input }]);
    } else {
      const input = node.firstElementChild;
      const cell = node;
      this.sheetModel.setSelectData([{ cell, input }]);
    }
  }
  _setNewFocusedCell(moveColumn, moveRow) {
    const selectCell = this.sheetModel.getLastCell();
    const { column: focusColumn, row: focusRow } = this._getLocation(selectCell);
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
    const input = this.sheetModel.getLastInput();
    input.focus();
  }
  _focusOutInput() {
    const input = this.sheetModel.getLastInput();
    input.blur();
  }
  _clearInput() {
    const input = this.sheetModel.getLastInput();
    input.value = '';
  }
  _setInputValue(value) {
    const input = this.sheetModel.getLastInput();
    input.value = value;
  }
  _getInputValue() {
    const input = this.sheetModel.getLastInput();
    return input.value;
  }
  _getLocation(node) {
    const { attributes } = node;
    return { column: attributes.x.value, row: attributes.y.value };
  }
  _setCellNameBox() {
    const selectCell = this.sheetModel.getLastCell();
    const { column, row } = this._getLocation(selectCell);
    const columnAsciiNum = 'A'.charCodeAt() + column * 1 - 1;
    const cellName = String.fromCharCode(columnAsciiNum) + row;
    this.cellNameBox.innerHTML = cellName;
  }
  _setFunctionInput() {
    const seleceInput = this.sheetModel.getLastInput();
    const value = seleceInput.value;
    this.functionInput.value = value;
  }
}

export default KeyboardEvent;
