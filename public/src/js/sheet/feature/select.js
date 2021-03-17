import { _ } from '../../util/util';

class Select {
  constructor(sheet, model) {
    this.sheet = sheet;
    this.sheetModel = model;
    this.isSelectMousedown = false;
    this.isDropMousedown = false;
    // this.init();
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
  }
  handleMouseover({ target }) {
    if (this.isSelectMousedown && this._isParentTd(target)) this._dragSelectMouseover(target);
  }
  handleMouseup({ target }) {
    if (this.isSelectMousedown) this._dragSelectMouseup(target);
  }
  _dragSelectMousedown(target) {
    this._toggleSelectStatus();
    this._clearCheckCells();
    this._setStartIdx(target);
    this._setEndIdx(target); //start 및 end index setting
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
    this._toggleSelectStatus();
    this._setEndIdx(target); //end index setting
    this._setCheckIdx(); // check(start~end)인덱스 세팅
    this._setSelectData(); //check인덱스 바탕으로 selectData세팅
  }
  //check
  _selectCell(selectData) {
    selectData.forEach((node) => {
      const { column, row } = node;
      const selectCell = _.$td({ x: column, y: row }, this.sheet);
      this._addSelected(selectCell);
    });
  }
  //check
  _isParentTd(node) {
    return node.parentElement.tagName === 'TD';
  }
  //check
  _addSelected(node) {
    node.classList.add('selected');
    node.firstElementChild.classList.add('selected');
  }
  //check
  _removeSelected(node) {
    node.classList.remove('selected');
    node.firstElementChild.classList.remove('selected');
  }
  //need
  _setStartIdx(target) {
    if (this._isParentTd(target)) target = target.parentElement;
    const { attributes } = target;
    this.selectIdx.start = { column: attributes.x.value, row: attributes.y.value };
  }
  //need
  _setEndIdx(target) {
    if (this._isParentTd(target)) target = target.parentElement;
    const { attributes } = target;
    this.selectIdx.end = { column: attributes.x.value, row: attributes.y.value };
  }
  //need
  _clearCheckCells() {
    const { start, end } = this.checkData;
    if (!start || !end) return;
    this._setSelectData();
    this.selectData.forEach((node) => {
      const { column, row } = node;
      const checkCell = _.$td({ x: column, y: row }, this.sheet);
      this._removeSelected(checkCell);
    });
    this.beforeSelectData.forEach((node) => {
      const { column, row } = node;
      const checkCell = _.$td({ x: column, y: row }, this.sheet);
      this._removeSelected(checkCell);
    });
  }
  //need
  _makeBlockCellIdx(start, end) {
    const blockCellIdxList = [];
    const { column: startColumn, row: startRow } = start; //need
    const { column: endColumn, row: endRow } = end; //need
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
  //need
  _setSelectData() {
    const { start, end } = this.selectIdx;
    this.selectData = this._makeBlockCellIdx(start, end);
  }
  //need
  _updateSelectData(moveIdx) {
    const { start, end } = this.selectIdx;
    const { moveColumn, moveRow } = moveIdx;
    start.column += moveColumn;
    end.column += moveColumn;
    start.row += moveRow;
    end.row += moveRow;
  }
  //need
  getSelectData() {
    return this.selectData;
  }
  //check
  _toggleSelectStatus() {
    this.isSelectMousedown = !this.isSelectMousedown;
  }
  //check
  _toggleDropStatus() {
    this.isDropMousedown = !this.isDropMousedown;
  }
}

export default Select;
