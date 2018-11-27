export const toString = obj => {
  let str = JSON.stringify(obj, (key, val) => {
    if (typeof val === 'function') {
      return "!#" + val.toString() + "!#";
    } else return val;
  });

  str = str.replace(/(")?!#(")?/g, '').replace(/\\n/g, '').replace(/\\"/g, '"');

  return str;
}
