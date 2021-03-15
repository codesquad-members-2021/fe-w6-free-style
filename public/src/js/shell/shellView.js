import { makeRowIndexHTML, makeShellHTML, td, tr } from './htmlTemplate.js';
const ASCII = {
  A: 65,
  Z: 90,
};

class Sheet {
  constructor(sheetContainer) {
    this.sheetContainer = sheetContainer;
    this.total = ASCII.Z - ASCII.A + 1;
    this.initMaxRow = 1000;
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
    this.sheetContainer.innerHTML = ColumnIndex;
  }
}

export default Sheet;
