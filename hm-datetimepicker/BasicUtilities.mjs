export default class BasicUtilities {
  static areTheSame(a, b, deep = false) {
    if (deep) {
      return BasicUtilities.deepEquals(a, b);
    }
    if (typeof a !== typeof b) {
      return false;
    }
    if ((a === null && b !== null) || (a !== null && b === null)) {
      return false;
    }
    if (
      (Array.isArray(a) && !Array.isArray(b)) ||
      (!Array.isArray(a) && Array.isArray(b))
    ) {
      return false;
    }
    if (
      (a instanceof Date && !(b instanceof Date)) ||
      (!(a instanceof Date) && b instanceof Date)
    ) {
      return false;
    }
    if (a instanceof Date) {
      return a.valueOf() === b.valueOf();
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      // difference between this and deepEquals: this compares dates by value only in arrays
      return (
        a.length === b.length &&
        a.every((aItem) =>
          b.some((bItem) =>
            aItem instanceof Date
              ? aItem.valueOf() === bItem.valueOf()
              : aItem === bItem
          )
        )
      );
    }
    if (
      typeof a !== 'object' &&
      typeof a !== 'function' &&
      !Array.isArray(a) &&
      !(a instanceof Date)
    ) {
      return a === b;
    }
    if (typeof a === 'object') {
      // difference between this and deepEquals: this compares keys and values as separate arrays
      // and doesn't descend into child objects.
      return (
        BasicUtilities.areTheSame(Object.keys(a), Object.keys(b)) &&
        BasicUtilities.areTheSame(Object.values(a), Object.values(b))
      );
    }
    if (typeof a === 'function') {
      // for functions, we're just checking their "toString" output and "name" values.
      return a.name === b.name && a.toString() === b.toString();
    }
  }
  static deepEquals(a, b) {
    if (typeof a !== typeof b) {
      return false;
    }
    if ((a === null && b !== null) || (a !== null && b === null)) {
      return false;
    }
    if (
      (Array.isArray(a) && !Array.isArray(b)) ||
      (!Array.isArray(a) && Array.isArray(b))
    ) {
      return false;
    }
    if (
      typeof a !== 'object' &&
      typeof a !== 'function' &&
      !Array.isArray(a) &&
      !(a instanceof Date)
    ) {
      return a === b;
    }
    if (a instanceof Date) {
      return a.valueOf() === b.valueOf();
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      return (
        a.length === b.length &&
        a.every((aItem, index) => BasicUtilities.deepEquals(aItem, b[index]))
      );
    }
    if (typeof a === 'object') {
      const aEntries = Object.entries(a);
      const bEntries = Object.entries(b);
      return BasicUtilities.deepEquals(aEntries, bEntries);
    }
    if (typeof a === 'function') {
      // for functions, we're just checking their "toString" output and "name" values.
      return a.name === b.name && a.toString() === b.toString();
    }
  }
}
