const CustomError = require("../extensions/custom-error");

module.exports = function countCats(matrix) {
  let count = 0;

  for (let i = 0; i < matrix.length; i++) {
    let item = matrix[i];
    for (let j = 0; j < item.length; j++) {
      if (item[j] === '^^') {
        count++;
      }
    }
  }
  return count;
};
