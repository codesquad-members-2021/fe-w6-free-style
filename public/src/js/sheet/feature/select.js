import { _ } from '../../util/util';

class Select {
  constructor(sheet, sheetModel) {
    this.sheet = sheet;
    this.sheetModel = sheetModel;
    this.isSelectMousedown = false;
    this.isDropMousedown = false;
    this.selectIdx = {};
    this.dropIdx = {};
    this.checkData = {};
    this.selectData = [];
    this.dropData = [];
    this.startDropIdx = {};
    this.endDropIdx = {};
    this.init();
  }
  init() {
    this.addEvent();
  }
  addEvent() {
    this.sheet.addEventListener('mousedown', this.handleMousedown.bind(this));
    this.sheet.addEventListener('mouseover', this.handleMouseover.bind(this));
    this.sheet.addEventListener('mouseup', this.handleMouseup.bind(this));
  }
  handleMousedown({ target }) {
    if (this._isParentTd(target)) this._dragSelectMousedown(target);
    else this._dragDropMousedown(target);
  }
  handleMouseover({ target }) {
    if (this.isSelectMousedown && this._isParentTd(target)) this._dragSelectMouseover(target);
    if (this.isDropMousedown) this._dragDropMouseover(target);
  }
  handleMouseup({ target }) {
    // if (!this.isMouseDown || !this._isParentTd(target)) return;
    if (this.isSelectMousedown && this._isParentTd(target)) this._dragSelectMouseup(target);
    if (this.isDropMouseup) this._dragDropMouseup(target);
  }
  _dragSelectMousedown(target) {
    const targetCell = target.parentElement;
    this._toggleSelectStatus();
    this._clearCheckCells();
    this._setStartIdx(targetCell);
    this._setEndIdx(targetCell); //start 및 end index setting
    this._setCheckIdx(); // check(start~end)인덱스 세팅
    this._setSelectData(); //check인덱스 바탕으로 selectData세팅
    this._selectCell(this.selectData); //select
  }
  _dragSelectMouseover(target) {
    const targetCell = target.parentElement;
    this._clearCheckCells();
    this._setEndIdx(targetCell); //end index setting
    this._setCheckIdx(); // check(start~end)인덱스 세팅
    this._setSelectData(); //check인덱스 바탕으로 selectData세팅
    this._selectCell(this.selectData); //select
  }
  _dragSelectMouseup(target) {
    const targetCell = target.parentElement;
    this._toggleSelectStatus();
    this._setEndIdx(targetCell); //end index setting
    this._setCheckIdx(); // check(start~end)인덱스 세팅
    this._setSelectData(); //check인덱스 바탕으로 selectData세팅
  }
  _dragDropMousedown(target) {
    this._setStartDropIdx(target);
  }
  _dragDropMouseover(target) {}
  _dragDropMouseup(target) {
    this._clearCheckCells();
    this._setEndDropIdx(target);
    const moveIndex = this._getMoveDropIdx();
    this._setDropData(moveIndex);
    this._selectCell(this.dropData);
  }
  _selectCell(selectData) {
    selectData.forEach((node) => {
      const { column, row } = node;
      const selectCell = _.$td({ x: column, y: row }, this.sheet);
      this._addSelected(selectCell);
    });
  }
  _isParentTd(node) {
    return node.parentElement.tagName === 'TD';
  }
  _addSelected(node) {
    node.classList.add('selected');
    node.firstElementChild.classList.add('selected');
  }
  _removeSelected(node) {
    node.classList.remove('selected');
    node.firstElementChild.classList.remove('selected');
  }
  _setStartIdx(target) {
    const { attributes } = target;
    this.selectIdx.start = { column: attributes.x.value, row: attributes.y.value };
  }
  _setEndIdx(target) {
    const { attributes } = target;
    this.selectIdx.end = { column: attributes.x.value, row: attributes.y.value };
  }
  _clearCheckCells() {
    if (!this.checkData.start || !this.checkData.end) return;
    this._setSelectData();
    this.selectData.forEach((node) => {
      const { column, row } = node;
      const checkCell = _.$td({ x: column, y: row }, this.sheet);
      this._removeSelected(checkCell);
    });
  }
  _makeBlockCellIdx(start, end) {
    const blockCellIdxList = [];
    const { column: startColumn, row: startRow } = start;
    const { column: endColumn, row: endRow } = end;
    const [minColumn, maxColumn] = [
      Math.min(startColumn, endColumn),
      Math.max(startColumn, endColumn),
    ];
    const [minRow, maxRow] = [Math.min(startRow, endRow), Math.max(startRow, endRow)];
    for (let column = minColumn; column <= maxColumn; column++) {
      for (let row = minRow; row <= maxRow; row++) {
        const cellIdx = { column, row };
        blockCellIdxList.push(cellIdx);
      }
    }
    return blockCellIdxList;
  }
  _setCheckIdx() {
    const { start, end } = this.selectIdx;
    const [minColumn, maxColumn] = [
      Math.min(start.column, end.column),
      Math.max(start.column, end.column),
    ];
    const [minRow, maxRow] = [Math.min(start.row, end.row), Math.max(start.row, end.row)];
    this.checkData.start = {
      column: minColumn,
      row: minRow,
    };
    this.checkData.end = {
      column: maxColumn,
      row: maxRow,
    };
  }
  _setSelectData() {
    const { start, end } = this.selectIdx;
    this.selectData = this._makeBlockCellIdx(start, end);
  }
  getSelectData() {
    return this.selectData;
  }
  _setStartDropIdx(target) {
    const { attributes } = target;
    this.selectIdx.start = { column: attributes.x.value, row: attributes.y.value };
  }
  _setEndDropIdx(target) {
    const { attributes } = target;
    this.selectIdx.end = { column: attributes.x.value, row: attributes.y.value };
  }
  _setDropData(moveIdx) {
    const { column: moveColumn, row: moveRow } = moveIdx;
    this.dropData = this.selectData.map((location) => {
      const { column, row } = location;
      return { column: column + moveColumn, row: row + moveRow };
    });
  }
  _getMoveDropIdx() {
    const { start, end } = this.dropIdx;
    const moveColumn = start.column - end.column;
    const moveRow = start.row - end.row;
    return { column: moveColumn, row: moveRow };
  }
  _toggleSelectStatus() {
    this.isSelectMousedown = !this.isSelectMousedown;
  }
  _toggleDropStatus() {
    this.isDropMousedown = !this.isDropMousedown;
  }
}

export default Select;
