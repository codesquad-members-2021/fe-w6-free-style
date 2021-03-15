const ASCII = {
  A: 65,
  Z: 90,
};

class ShellModel {
  constructor() {
    this.initMaxRow = 1000;
    //A~Z까지 26개
    this.total = ASCII.Z - ASCII.A + 1;
    //index적는 것까지 total+1개 만든다.
    this.shellData = Array.from(Array(this.initMaxRow), () => new Array(this.total + 1));
  }
  setData(row, col, value) {
    this.shellData[row][col] = value;
    return value;
  }
  getData(row, col) {
    return this.shellData[(row, col)];
  }
}

export default ShellModel;
