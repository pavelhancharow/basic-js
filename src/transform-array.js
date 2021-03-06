const CustomError = require("../extensions/custom-error");

module.exports = function transform(arr = []) {
  if (!Array.isArray(arr)) {
    throw new Error();
  }

  let array = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != '--discard-next' && arr[i] != '--discard-prev' && arr[i] != "--double-next" && arr[i] != "--double-prev") {
      array.push(arr[i]);
    } else if (arr[i] == '--discard-next' && i != arr.length - 1) {
      i++;
    } else if (arr[i] == '--discard-prev' && arr[i - 2] != '--discard-next' && i != 0) {
      array.pop();
    } else if (arr[i] == '--double-next' && i != arr.length - 1) {
      array.push(arr[i + 1]);
    } else if (arr[i] == '--double-prev' && arr[i - 2] != '--discard-next' && i != 0) {
      array.push(arr[i - 1]);
    }
  }

  return array;
};
