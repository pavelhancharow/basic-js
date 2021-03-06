const CustomError = require("../extensions/custom-error");

module.exports = function repeater(str = '', { repeatTimes = 1, separator = '+', addition = '', additionRepeatTimes = 1, additionSeparator = '|' }) {
  const string = String(str);
  const add = String(addition);

  let result = '',
    additionStr = '',
    count = 0;

  if (add.length != 0) {
    while (count < additionRepeatTimes) {
      additionStr += add + additionSeparator;
      count++;
    }

    additionStr = additionStr.slice(0, additionStr.length - additionSeparator.length);
    count = 0;
  }

  while (count < repeatTimes) {
    result += string + additionStr + separator;
    count++;
  }

  return result.slice(0, result.length - separator.length);
}