import { _ } from '../../util/util';

class Select {
  constructor(sheet) {
    this.sheet = sheet;
    this.isMouseDown = false;
    this.startIdx = {};
    this.checkData = {};
    this.selectData = [];
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
    const targetCell = target.parentElement;
    this.isMouseDown = true;
    this._clearCheckCells();
    this._setStartIdx(targetCell);
    this._setCheckIdx(targetCell);
    this._selectCell(targetCell);
  }
  handleMouseover({ target }) {
    if (!this.isMouseDown || !this._isParentTd(target)) return;
    const targetCell = target.parentElement;
    this._clearCheckCells();
    this._setCheckIdx(targetCell);
    this._selectCell(targetCell);
  }
  handleMouseup({ target }) {
    this.isMouseDown = false;
    if (!this.isMouseDown || !this._isParentTd(target)) return;
    const targetCell = target.parentElement;
    this._setCheckIdx(targetCell);
  }
  _selectCell(endNode) {
    const { attributes } = endNode;
    const endIdx = { column: attributes.x.value, row: attributes.y.value };
    const blockCellIdxList = this._makeBlockCellIdx(this.startIdx, endIdx);
    blockCellIdxList.forEach((node) => {
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
  _setCheckIdx(target) {
    const { attributes } = target;
    this.checkData.start = { column: this.startIdx.column, row: this.startIdx.row };
    this.checkData.end = { column: attributes.x.value, row: attributes.y.value };
  }
  _clearCheckCells() {
    if (!this.checkData.start || !this.checkData.end) return;
    const blockCellIdxList = this._makeBlockCellIdx(this.checkData.start, this.checkData.end);
    blockCellIdxList.forEach((node) => {
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
  _setCheckIdx(node) {
    const { attributes } = node;
    const startColumn = this.startIdx.column;
    const startRow = this.startIdx.row;
    const endColumn = attributes.x.value;
    const endRow = attributes.y.value;

    this.checkData.start = {
      column: Math.min(startColumn, endColumn),
      row: Math.min(startRow, endRow),
    };
    this.checkData.end = {
      column: Math.max(startColumn, endColumn),
      row: Math.max(startRow, endRow),
    };
  }
}

export default Select;
