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
    if (this._getLastCell()) this._removeFocused();
    this._setFocused(target);
    this._addFocused();
    this._setCellNameBox();
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
    console.log(selectData);
    selectData.forEach(({ cell }) => {
      const { column, row } = this._getLocation(cell);
      const focusedCell = _.$td({ x: column, y: row }, this.sheet);
      focusedCell.classList.remove('focused');
    });
  }
  _isIndexCell(node) {
    const nodeParent = node.parentElement;
    return node.classList.contains('row-index') || nodeParent.classList.contains('column-index');
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
    const selectCell = this.sheetModel.getSelectData()[0];
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
    1;
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
    const input = this._getLastInput();
    input.focus();
  }
  _focusOutInput() {
    const input = this._getLastInput();
    input.blur();
  }
  _clearInput() {
    const input = this._getLastInput();
    input.value = '';
  }
  _setInputValue(value) {
    const input = this._getLastInput();
    input.value = value;
  }
  _getInputValue() {
    const input = this._getLastInput();
    return input.value;
  }
  _getLocation(node) {
    const { attributes } = node;
    return { column: attributes.x.value, row: attributes.y.value };
  }
  _setCellNameBox() {
    const selectData = this.sheetModel.getSelectData();
    const { cell: lastSelectCell } = selectData[selectData.length - 1];
    const { column, row } = this._getLocation(lastSelectCell);
    const columnAsciiNum = 'A'.charCodeAt() + column * 1 - 1;
    const cellName = String.fromCharCode(columnAsciiNum) + row;
    this.cellNameBox.innerHTML = cellName;
  }
  _getLastInput() {
    const selectData = this.sheetModel.getSelectData();
    if (!selectData.length) return null;
    const { input: lastInput } = selectData[selectData.length - 1];
    return lastInput;
  }
  _getLastCell() {
    const selectData = this.sheetModel.getSelectData();
    if (!selectData.length) return null;
    const { cell: lastCell } = selectData[selectData.length - 1];
    return lastCell;
  }
}

export default CellEvent;
