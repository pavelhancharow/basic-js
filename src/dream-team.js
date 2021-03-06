const CustomError = require("../extensions/custom-error");

module.exports = function createDreamTeam(members) {
  if (!Array.isArray(members)) {
    return false;
  } else {
    return members.reduce((acc, item) => {
      if (typeof item === 'string') {
        acc.push(item.trim().charAt(0).toUpperCase());
      }
      return acc;
    }, []).sort().join('');
  }
};
