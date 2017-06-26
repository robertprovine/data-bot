const names = {};

const fieldTitleToName = (fieldTitle) => {
  let str = '';
  for (val of fieldTitle) {
    if (val === ' ') {
      str += '_';
    } else {
      str += val.toLowerCase();
    }
  }
  return str;
};

console.log(fieldTitleToName('Type of Palace'));
// should account for references and change them to _id by default
