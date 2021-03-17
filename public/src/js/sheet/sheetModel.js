const ASCII = {
  A: 65,
  Z: 90,
};

class SheetModel {
  constructor() {
    this.maxRow = 50;
    this.maxColumn = ASCII.Z - ASCII.A + 1;
    this.sheetData;
    this.selectData = []; //{cell,input} 형태로 저장
    this.init();
  }
  init() {
    this.setsheetData();
    this.setColumnIndex();
  }
  setColumnIndex() {
    const total = ASCII.Z - ASCII.A + 1;
    const columnIndexArr = new Array(total + 1)
      .fill('')
      .map((_, idx) => (idx ? String.fromCharCode(ASCII.A + idx - 1) : ''));
    this.sheetData[0] = columnIndexArr;
  }
  getColumnIndex() {
    return this.sheetData[0];
  }
  //maxRow-row, totalColumn-column 만드는 메소드
  setsheetData() {
    //Max+1: column index 넣기 위한 자리 / total+1: row index 넣기 위한 자리
    this.sheetData = Array.from(Array(this.maxRow + 1), (_, idx) =>
      new Array(this.maxColumn + 1).fill('').map((_, i) => (i ? '' : idx))
    );
  }
  getSheetData() {
    return this.sheetData;
  }
  setData({ col, row, value }) {
    this.sheetData[row][col] = value;
  }
  getData(row, col) {
    return this.sheetData[row][col];
  }
  getSelectData() {
    return this.selectData;
  }
  addSelectData(data) {
    this.selectData.push(data); //{cell,input}
  }
  setSelectData(selectData) {
    this.selectData = selectData; //[{cell,input},...]
  }
  clearSelectData() {
    this.selectData = [];
  }
  getFirstInput() {
    if (!this.selectData.length) return null;
    const { input: firstInput } = this.selectData[0];
    return firstInput;
  }
  getFirstCell() {
    if (!this.selectData.length) return null;
    const { cell: firstCell } = this.selectData[0];
    return firstCell;
  }
  getLastInput() {
    if (!this.selectData.length) return null;
    const { input: lastInput } = this.selectData[this.selectData.length - 1];
    return lastInput;
  }
  getLastCell() {
    if (!this.selectData.length) return null;
    const { cell: lastCell } = this.selectData[this.selectData.length - 1];
    return lastCell;
  }
}

export default SheetModel;
