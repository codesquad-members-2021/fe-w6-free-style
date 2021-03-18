import { _ } from '../../util/util';

class SelectEvent {
  constructor({ sheet, model, cellNameBox }) {
    this.sheet = sheet;
    this.sheetModel = model;
    this.cellNameBox = cellNameBox;
    this.firstSelect;
    this.lastSelect;
    this.firstTarget; //drop 첫번째 기준
    this.lastTarget; //drop 마지막 기준
    this.isSelectMousedown = false;
    this.isDropMousedown = false;
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
    if (this._isIndexCell(target)) return;
    if (!this._isParentTd(target)) {
      this._dragDropMousedown(target);
    } else {
      this._dragSelectMousedown(target);
    }
  }
  handleMouseover({ target }) {
    if (!this._isParentTd(target)) return;
    if (this.isSelectMousedown) this._dragSelectMouseover(target);
    if (this.isDropMousedown) this._dragDropMouseover(target);
  }
  handleMouseup({ target }) {
    if (this.isSelectMousedown) this._dragSelectMouseup(target);
    if (this.isDropMousedown) this._dragDropMouseup(target);
  }
  _dragSelectMousedown(target) {
    this._toggleSelectStatus();
    this._clearSelectCell();
    this._setFirstSelectData(target);
    this._setLastSelectData(target);
    this._setSelectData(this.firstSelect, this.lastSelect);
    this._selectCell();
  }
  _dragSelectMouseover(target) {
    this._clearSelectCell();
    this._setLastSelectData(target);
    this._setSelectData(this.firstSelect, this.lastSelect);
    this._selectCell();
  }
  _dragSelectMouseup(target) {
    this._toggleSelectStatus();
  }
  _dragDropMousedown(target) {
    this._toggleDropStatus();
    this._setFirstTargetData(target);
  }
  _dragDropMouseover(target) {
    this._setLastTargetData(target);
  }
  _dragDropMouseup(target) {
    this._toggleDropStatus();
    this._copyData();
  }
  _selectCell() {
    const selectData = this.sheetModel.getSelectData();
    selectData.forEach(({ cell, input }) => {
      this._addSelected(cell);
      this._addSelected(input);
    });
  }
  //select cell들 .selected 클래스 제거
  _clearSelectCell() {
    const selectData = this.sheetModel.getSelectData();
    if (!selectData.length) return;
    selectData.forEach(({ cell, input }) => {
      this._removeSelected(cell);
      this._removeSelected(input);
    });
  }
  _clearSelectValue() {
    const selectData = this.sheetModel.getSelectData();
    if (!selectData.length) return;
    selectData.forEach(({ input }) => {
      input.value = '';
    });
  }
  //블락 잡힌 범위 cell,input 구해주는 메소드
  _getBlockCells() {
    const selectBlockCellList = [];
    const { column: firstColumn, row: firstRow } = this._getLocation(this.firstSelect.cell);
    const { column: lastColumn, row: lastRow } = this._getLocation(this.lastSelect.cell);

    const [minColumn, maxColumn] = [
      Math.min(firstColumn, lastColumn),
      Math.max(firstColumn, lastColumn),
    ];
    const [minRow, maxRow] = [Math.min(firstRow, lastRow), Math.max(firstRow, lastRow)];

    for (let column = minColumn; column <= maxColumn; column++) {
      for (let row = minRow; row <= maxRow; row++) {
        const selectCell = _.$td({ x: column, y: row }, this.sheet);
        const selectInput = selectCell.firstElementChild;
        selectBlockCellList.push({ cell: selectCell, input: selectInput });
      }
    }
    return selectBlockCellList;
  }
  _copyData() {
    const selectData = this.sheetModel.getSelectData();
    const originSelectValue = this._getValueFromData(selectData);
    this._clearSelectCell();
    this._clearSelectValue();
    this._setMovedSelect();
    this._setSelectData();
    this._setValueToMovedSelect(originSelectValue);
    this._selectCell();
  }
  _getMoveIndex() {
    const { column: firstColumn, row: firstRow } = this._getLocation(this.firstTarget.cell);
    const { column: lastColumn, row: lastRow } = this._getLocation(this.lastTarget.cell);
    const moveIndex = { column: lastColumn - firstColumn, row: lastRow - firstRow };
    return moveIndex;
  }
  _setMovedSelect() {
    const { column: moveColumn, row: moveRow } = this._getMoveIndex();
    const { column: firstColumn, row: firstRow } = this._getLocation(this.firstSelect.cell);
    const { column: lastColumn, row: lastRow } = this._getLocation(this.lastSelect.cell);
    const newFirstCell = _.$td(
      { x: firstColumn * 1 + moveColumn, y: firstRow * 1 + moveRow },
      this.sheet
    );
    const newLastCell = _.$td(
      { x: lastColumn * 1 + moveColumn, y: lastRow * 1 + moveRow },
      this.sheet
    );

    this.firstSelect = this._getNodeData(newFirstCell);
    this.lastSelect = this._getNodeData(newLastCell);
  }
  //select-block된 cell,input데이터 모델에 setting
  _setSelectData() {
    const selectBlockCellList = this._getBlockCells();
    this.sheetModel.setSelectData(selectBlockCellList);
  }

  _getValueFromData(data) {
    const valueData = [];
    data.forEach(({ input }) => valueData.push(input.value));
    return valueData;
  }
  _setValueToMovedSelect(valueData) {
    const selectData = this.sheetModel.getSelectData();
    valueData.forEach((data, idx) => {
      selectData[idx].input.value = data;
    });
  }
  _setFirstSelectData(node) {
    this.firstSelect = this._getNodeData(node);
  }
  _setLastSelectData(node) {
    this.lastSelect = this._getNodeData(node);
  }
  _setFirstTargetData(node) {
    this.firstTarget = this._getNodeData(node);
  }
  _setLastTargetData(node) {
    this.lastTarget = this._getNodeData(node);
  }
  _getLocation(cell) {
    const { attributes } = cell;
    return { column: attributes.x.value, row: attributes.y.value };
  }
  _isParentTd(node) {
    return node.parentElement.tagName === 'TD';
  }
  _addSelected(node) {
    node.classList.add('selected');
  }
  _removeSelected(node) {
    node.classList.remove('selected');
  }
  _toggleSelectStatus() {
    this.isSelectMousedown = !this.isSelectMousedown;
  }
  _toggleDropStatus() {
    this.isDropMousedown = !this.isDropMousedown;
  }
  _isIndexCell(node) {
    const nodeParent = node.parentElement;
    return node.classList.contains('row-index') || nodeParent.classList.contains('column-index');
  }
  _getNodeData(node) {
    if (this._isParentTd(node)) {
      const input = node;
      const cell = node.parentElement;
      return { cell, input };
    } else {
      const input = node.firstElementChild;
      const cell = node;
      return { cell, input };
    }
  }
}

export default SelectEvent;
