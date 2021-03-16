import { _ } from '../../util/util';

class Select {
  constructor(sheet) {
    this.sheet = sheet;
    this.isMouseDown = false;
    this.isDropMouseDown = false;
    this.startIdx = {};
    this.endIdx = {};
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
    if (!this._isParentTd(target)) return;
    this.isMouseDown = true;
    this._dragSelectMousedown(target);
  }
  handleMouseover({ target }) {
    if (!this.isMouseDown || !this._isParentTd(target)) return;
    this._dragSelectMouseover(target);
  }
  handleMouseup({ target }) {
    this.isMouseDown = false;
    if (!this.isMouseDown || !this._isParentTd(target)) return;
    this._dragSelectMouseup(target);
  }
  _dragSelectMousedown(target) {
    const targetCell = target.parentElement;
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
    this.startIdx.column = attributes.x.value;
    this.startIdx.row = attributes.y.value;
  }
  _setEndIdx(target) {
    const { attributes } = target;
    this.endIdx.column = attributes.x.value;
    this.endIdx.row = attributes.y.value;
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
    const [minColumn, maxColumn] = [
      Math.min(this.startIdx.column, this.startIdx.row),
      Math.max(this.startIdx.column, this.startIdx.row),
    ];
    const [minRow, maxRow] = [
      Math.min(this.endIdx.column, this.endIdx.row),
      Math.max(this.endIdx.column, this.endIdx.row),
    ];
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
    this.selectData = this._makeBlockCellIdx(this.startIdx, this.endIdx);
  }
  getSelectData() {
    return this.selectData;
  }
  _setStartDropIdx(target) {
    const { attributes } = target;
    this.endIdx.column = attributes.x.value;
    this.endIdx.row = attributes.y.value;
  }
  _setEndDropIdx(target) {
    const { attributes } = target;
    this.endIdx.column = attributes.x.value;
    this.endIdx.row = attributes.y.value;
  }
  _setDropData(moveIdx) {
    const { column: moveColumn, row: moveRow } = moveIdx;
    this.dropData = this.selectData.map((location) => {
      const { column, row } = location;
      return { column: column + moveColumn, row: row + moveRow };
    });
  }
  _getMoveDropIdx() {
    const moveColumn = this.startDropIdx.column - this.endDropIdx.column;
    const moveRow = this.startDropIdx.row - this.endDropIdx.row;
    return { column: moveColumn, row: moveRow };
  }
}

export default Select;
