import { makeRowIndexHTML, makeShellHTML, td, tr } from './htmlTemplate.js';
import SheetModel from './sheetModel';
import Select from './feature/select';
const ASCII = {
  A: 65,
  Z: 90,
};

class SheetView {
  constructor(sheet) {
    this.sheet = sheet;
    this.sheetModel = new SheetModel();
    this.selectSheet = new Select(sheet);
  }
  init() {
    this.render();
  }
  _makeColumnIndex() {
    const columnIndexList = this.sheetModel
      .getColumnIndex()
      .reduce((acc, value) => acc + td({ value }), '');
    const columnIndxHTML = tr({ value: columnIndexList, classes: ['column-index'] });
    return columnIndxHTML;
  }
  _makeRowSheet(arr) {
    const rowSheet = arr.reduce((acc, value, idx) => {
      if (idx === 0) return acc + makeRowIndexHTML(value);
      return acc + makeShellHTML();
    }, '');
    const rowSheetHTML = tr({ value: rowSheet });
    return rowSheetHTML;
  }
  _makeSheet() {
    const sheetData = this.sheetModel.getSheetData().slice(1);
    const sheetHTML = sheetData.reduce((acc, rowData) => acc + this._makeRowSheet(rowData), '');
    return sheetHTML;
  }
  render() {
    const ColumnIndex = this._makeColumnIndex();
    const sheetHTML = this._makeSheet();
    this.sheet.innerHTML = ColumnIndex + sheetHTML;
  }
}

export default SheetView;
