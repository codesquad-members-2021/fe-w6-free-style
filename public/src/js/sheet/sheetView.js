import { makeRowIndexHTML, makeShellHTML, td, tr } from './htmlTemplate.js';
import SheetModel from './sheetModel';
const ASCII = {
  A: 65,
  Z: 90,
};

class SheetView {
  constructor(sheet) {
    this.sheet = sheet;
    this.sheetModel = new SheetModel();
    this.sheetData = this.sheetModel.sheetData;
  }
  init() {
    this.render();
  }
  _makeColumnIndex() {
    let columnIndexList = td();
    for (let code = ASCII.A; code <= ASCII.Z; code++) {
      columnIndexList += td({ value: String.fromCharCode(code) });
    }
    const columnIndxHTML = tr({ value: columnIndexList, classes: ['column-index'] });
    return columnIndxHTML;
  }
  _makeShell(idx) {
    const indexShell = makeRowIndexHTML(idx);
    let shellInputHTML = '';
    for (let i = 1; i <= this.total; i++) {
      shellInputHTML += makeShellHTML();
    }
    const shellHTML = indexShell + shellInputHTML;
    return shellHTML;
  }
  render() {
    const ColumnIndex = this._makeColumnIndex();
    this.sheet.innerHTML = ColumnIndex;
  }
}

export default SheetView;
