import DateHelper, { DateComparisonGranularity } from "./DateHelper.mjs";
/**
 * Provides an enumeration of the possible granularities by which numbers can be compared.
 */
 export class NumberComparisonGranularity {
  static Thousands = 1000;
  static Hundreds = 100;
  static Tens = 10;
  static Integer = 1;
  static Tenths = 0.1;
  static Hundredths = 0.01;
  static Thousandths = 0.001;
  static Default = -1;
  static Custom = 0;
}

/**
 * Encompasses the arguments to the BasicUtilities.deepEquals function.
 */
 export class DeepEqualityArgs {
  /**
   * Validates the order of the elements in the two arrays. Defaults to false.
   */
  validateElementOrder = false;
  /**
   * Validates the order of the own properties in the two objects. Defaults to false.
   */
  validatePropertyOrder = false;
  /**
   * The granularity with which to compare Date objects. Defaults to "ms", milliseconds. 
   * Other possible values are expressed as members of the DateComparisonGranularity class.
   */
  dateGranularity = DateComparisonGranularity.Default;
  /**
   * The function to use when dateGranularity is set to "?" (Custom). Defaults to a function
   * that does the same thing as the default; that is, one that returns whether the value of
   * the Date objects are equal.
   * @param {Date} a The first date to compare.
   * @param {Date} b The second date to compare.
   * @returns {boolean} true if the dates are the same at the custom granularity; otherwise, false.
   */
  dateGranularityCustom = (a, b) => a.valueOf() === b.valueOf();
  /**
   * The granularity with which to compare numbers. This is essentially the maximum value 
   * by which the two numbers may differ. Defaults to Number.EPSILON (essentially 0).
   */
  numberGranularity = NumberComparisonGranularity.Default;
  /**
   * The function to use when numberGranularity is set to -1 (Custom). Defaults to a function
   * that does the same thing as the default; that is, one that takes the absolute value of the
   * difference between the two numbers and returns whether it is less than Number.EPSILON.
   * @param {number} a The first number to compare.
   * @param {number} b The second number to compare.
   * @returns true if the numbers are the same at the custom granularity; otherwise, false.
   */
  numberGranularityCustom = (a, b) => Math.abs(a - b) < Number.EPSILON;
}

/**
 * Provides utility methods, mostly around equality.
 */
export default class BasicUtilities {
  /**
   * Checks if both items specified have the same value.
   * @param {unknown} a The first item to compare
   * @param {unknown} b The second item to compare
   * @param {boolean} deep true to use deep comparison (same as calling deepEquals);
   *  otherwise (default), don't use deep comparison
   * @param {DeepEqualityArgs} deepArgs The DeepEqualityArgs instance to use when deep = true.
   * @returns {boolean} true, if a and b have the same base value (for objects, share the
   *  same keys and values; for arrays, share the same elements; for both, in any order, 
   *  unless both deep and validatePropertyOrder are true)
   * @remarks Throws custom Error if JSON.stringify throws.
   */
  static areTheSame(a, b, deep = false,
    deepArgs = new DeepEqualityArgs) {
    if (deep) {
      // Passing deep == true calls deepEquals
      return BasicUtilities.deepEquals(a, b, deepArgs);
    }
    if (typeof a !== typeof b) {
      // Essentially preempting any === vs == typos. Also checks for one being 
      // undefined and the other not.
      return false;
    }
    if (typeof a === 'undefined' && typeof b === 'undefined') {
      // If both are undefined, then they are the same.
      return true;
    }
    if ((a === null && b !== null) || (a !== null && b === null)) {
      // If one's null and the other isn't, they are not equal, but may have the same typeof ('object').
      // If one's undefined and the other isn't, that will be caught by the typeof check above.
      return false;
    }
    if (
      (Array.isArray(a) && !Array.isArray(b)) ||
      (!Array.isArray(a) && Array.isArray(b))
    ) {
      // If one's an array and the other isn't, they are not the same.
      return false;
    }
    if (
      (a instanceof Date && !(b instanceof Date)) ||
      (!(a instanceof Date) && b instanceof Date)
    ) {
      // If one's a Date and the other isn't, they are not the same.
      return false;
    }
    if (a instanceof Date) {
      // Just checks the value, so the dates must be the same down to the millisecond.
      // To use dateGranularity, deep must be true.
      return a.valueOf() === b.valueOf();
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      // Check arrays at a surface level (if deep === true, we never get here)
      // difference between this and deepEquals: this compares dates by value only in arrays
      return (
        a.length === b.length &&
        a.every((aItem) =>
          b.some((bItem) =>
            BasicUtilities.areTheSame(aItem, bItem)
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
      // if it's not a special type (i.e. it's a number, string, Boolean, BigInt, etc.), just use equality
      return a === b;
    }
    if (typeof a === 'object') {
      if (a === null && b === null) {
        // Since typeof null === 'object', but running Object.keys(null) throws a TypeError.
        return true;
      }
      // difference between this and deepEquals: this compares object references
      return a === b;
    }
    if (typeof a === 'function') {
      // for functions, we're just checking their "toString" output and "name" values.
      return a.name === b.name && a.toString() === b.toString();
    }
  }
  /**
   * Does a deep comparison of two arrays.
   * @param {unknown[]} a The first array to compare.
   * @param {unknown[]} b The second array to compare.
   * @param {DeepEqualityArgs} deepArgs The arguments to the function.
   * @returns {boolean} true if the two arrays are the same; otherwise false.
   */
  static deepEqualsArrays(a, b, deepArgs = new DeepEqualityArgs) {
    if (typeof a !== typeof b) {
      return false;
    }
    if ((a === null && b !== null) || (a !== null && b === null)) {
      return false;
    }
    if (!Array.isArray(b) || !Array.isArray(a)) {
      throw new Error(`Both values specified must be arrays according to the Array.isArray function.`);
    }
    return (
      a.length === b.length &&
        deepArgs.validateElementOrder ?
        a.every((aItem, index) => BasicUtilities.deepEquals(aItem, b[index], deepArgs)) :
        a.every((aItem) => b.some((bItem) => BasicUtilities.deepEquals(aItem, bItem, deepArgs)))
    );
  }
  /**
   * 
   * @param {unknown} a The first item to compare
   * @param {unknown} b The second item to compare
   * @param {DeepEqualityArgs} deepArgs The arguments to the function.
   * @returns {boolean} true, if a and b have the same base value (for objects, share the
   *  same keys and values; for arrays, share the same elements; for both, in any order, 
   *  unless both validatePropertyOrder are true)
   */
  static deepEquals(a, b, deepArgs) {
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
      typeof a !== 'number' &&
      !Array.isArray(a) &&
      !(a instanceof Date)
    ) {
      return a === b;
    }
    if (typeof a === 'number') {
      if (deepArgs.numberGranularity === NumberComparisonGranularity.Custom) {
        return deepArgs.numberGranularityCustom(a, b);
      } else if (deepArgs.numberGranularity === NumberComparisonGranularity.Default) {
        return Math.abs(a - b) <= Number.EPSILON;
      } else {
        return Math.abs(a - b) <= deepArgs.numberGranularity
          /* Frickin IEEE754 floating point */
          || (deepArgs.numberGranularity === 0.1 && Math.abs(a - b).toFixed(18).localeCompare('0.100000000000000089') === 0)
          || (deepArgs.numberGranularity === 0.01 && Math.abs(a - b).toFixed(18).localeCompare('0.010000000000000009') === 0)
          ;
      }
    }
    if (a instanceof Date) {
      return DateHelper.diffDates(a, b, deepArgs.dateGranularity, deepArgs.dateGranularityCustom).amount === 0;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      // Note that unlike areTheSame, deepEquals checks order of array items also
      return (
        a.length === b.length &&
        a.every((aItem, index) => BasicUtilities.deepEquals(aItem, b[index], deepArgs))
      );
    }
    if (typeof a === 'object') {
      if (a === null && b === null) {
        // Since typeof null === 'object', but running Object.entries(null) throws a TypeError.
        return true;
      }
      // Deep equals compares the entries of each object
      if (deepArgs.validatePropertyOrder) {
        // Uses an array comparison of the result of Object.entries using a deepEquals with validateElementOrder = true
        const aEntries = Object.entries(a);
        const bEntries = Object.entries(b);
        deepArgs.validateElementOrder = true;
        return BasicUtilities.deepEqualsArrays(aEntries, bEntries, deepArgs);
      }
      // Uses for...in so that all properties in the prototype chain are considered if validatePropertyOrder is false
      let isSame = true;
      for (const key in a) {
        isSame = isSame && (key in b) && BasicUtilities.deepEquals(a[key], b[key], deepArgs);
        if (!isSame) {
          return false;
        }
      }
      return isSame;
    }
    if (typeof a === 'function') {
      // for functions, we're just checking their "toString" output and "name" values.
      return a.name === b.name && a.toString() === b.toString();
    }
  }
  static firstCapital(value) {
    return typeof value === 'string' && (value.length < 2 ? value.toUpperCase() : `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`);
  }
  static titleCase(value) {
    return typeof value === 'string' && value.replace(/\b\w\b/g, (word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`);
  }
  static parseBoolean(value) {
    if (typeof value === 'string') {
      // array of common 'true' values; more nuanced than any string = true.
      return ['true', 'yes', 'y', '1'].includes(value.toLowerCase());
    } else {
      return !!value;
    }
  }
}
