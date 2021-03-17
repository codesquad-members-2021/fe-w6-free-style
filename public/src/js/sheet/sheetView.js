import { makeRowIndexHTML, makeShellHTML, td, tr } from './htmlTemplate.js';
import SheetModel from './sheetModel';
import Select from './feature/select';
import { add, _ } from '../util/util.js';
import CellEvent from './feature/cellEvent.js';
import FunctionBar from './feature/functionBar.js';
class SheetView {
  constructor(sheet) {
    this.sheet = sheet;
    this.sheetModel = new SheetModel();
    this.cellNameBox = _.$('.namebox');
    this.cellEvent;
    this.selectSheet;
  }
  init() {
    this.render();
    this.cellEvent = new CellEvent({
      sheet: this.sheet,
      model: this.sheetModel,
      cellNameBox: this.cellNameBox,
    });
    this.functionBar = new FunctionBar({
      cellNameBox: this.cellNameBox,
    });
    // this.selectSheet = new Select(this.sheet, this.sheetModel);
  }
  _makeColumnIndex() {
    const columnIndexList = this.sheetModel
      .getColumnIndex()
      .map((value) => td({ value }))
      .reduce(add, '');
    const columnIndxHTML = tr({ value: columnIndexList, classes: ['column-index'] });
    return columnIndxHTML;
  }
  _makeRowSheet(arr, row) {
    const rowSheet = arr
      .map((value, column) =>
        column ? makeShellHTML({ x: column, y: row }) : makeRowIndexHTML(value)
      )
      .reduce(add, '');
    const rowSheetHTML = tr({ value: rowSheet });
    return rowSheetHTML;
  }
  _makeSheet() {
    const sheetHTML = this.sheetModel
      .getSheetData()
      .slice(1)
      .map((rowData, row) => this._makeRowSheet(rowData, row + 1));
    return sheetHTML.join('');
  }
  render() {
    const ColumnIndex = this._makeColumnIndex();
    const sheetHTML = this._makeSheet();
    this.sheet.innerHTML = ColumnIndex + sheetHTML;
  }
}

export default SheetView;
