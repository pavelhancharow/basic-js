const CustomError = require("../extensions/custom-error");

const chainMaker = {
  arr: [],
  getLength() {
    return this.arr.length;
  },
  addLink(value) {
    if (value == undefined && value != null) {
      this.arr.push(`( )`);
    } else {
      this.arr.push(`( ${value} )`);
    }
    return this;
  },
  removeLink(position) {
    if (!isNaN(position)) {
      for (let i = 0; i < this.arr.length; i++) {
        if (i == position - 1) {
          this.arr.splice(i, 1);
        }
      }
    } else {
      this.arr = [];
      throw new Error();
    }
    return this;
  },
  reverseChain() {
    this.arr.reverse();
    return this;
  },
  finishChain() {
    let str = '';
    this.arr.forEach(item => str += item + '~~');
    this.arr = [];
    return str.slice(0, -2);
  }
};

module.exports = chainMaker;
