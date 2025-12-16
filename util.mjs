import { Temporal } from "./js-temporal/polyfill/dist/index.esm.js";

export default class Util {
  /**
   * Debounces a function
   * @param {Function} fn The function to debounce
   * @param {number} ms The number of milliseconds to wait between calls
   * @returns {Function} The debounced function
   */
  static debounce(fn, ms) {
    var timer = 0;
    /**
     * The debouncing function
     * @param {Event|any} e Typically this function is used as a way of preventing
     * events from overwhelming an event handler function.
     */
    return function (e) {
      window.clearTimeout(timer);
      timer = window.setTimeout(
        (function (v) {
          return function () {
            fn(v);
          };
        })(e),
        ms
      );
    };
  }
  /**
   * Ensures the WeakMap used for getData and setData is in memory.
   */
  static ensureMap() {
    if (!this.datamap) {
      this.datamap = new WeakMap();
    }
    if (console.assert) {
      console.assert(this.datamap instanceof WeakMap, "datamap is not a WeakMap");
      console.assert(typeof this.datamap !== "undefined", "datamap is undefined");
    }
  }
  /**
   * Gets the data associated with the element and name, or null if there
   * is no data for the element or name.
   * @param {HTMLElement} element The element to associate the data with
   * @param {string} name The key under which the data will be stored
   * @returns {any|null} The value for the element and name
   */
  static getData(element, name) {
    this.ensureMap();
    let data = this.datamap?.get(element);
    return data && data[name];
  }
  /**
   * Sets the data associated with the element and name, or null to remove
   * the data.
   * @param {HTMLElement} element The element to associate the data with
   * @param {string} name The key under which the data will be stored
   * @param {any|null} value The value for the element and name, or null
   * to remove the data.
   */
  static setData(element, name, value) {
    this.ensureMap();
    this.datamap?.set(element, { [name]: value });
  }
  /**
   * Gets the closest ancestor, that matches the selector, to the element.
   * @param {HTMLElement} element The element whose ancestor will be retrieved
   * @param {string} selector The selector that the ancestor must match against
   * @returns {HTMLElement|null} The ancestor, or null if there was no ancestor
   * found that matches the selector.
   */
  static getAncestor(element, selector) {
    if (element.closest) {
      return element.closest(selector);
    }
    let parent = element.parentElement;
    if (parent == null) {
      return null;
    }
    if (parent.matches(selector)) {
      return parent;
    }
    if (parent === window.document.documentElement) {
      return null;
    }

    return this.getAncestor(parent, selector);
  }
  /**
   * Checks if the value is not undefined and not null.
   * @param {unknown} value The value to check
   * @returns true if the value is not undefined and not null
   */
  static isNotNU(value) {
    return typeof value !== "undefined" && 
      value !== null;
  }
  /**
   * Checks if the value is null or undefined.
   * @param {unknown} value The value to check
   * @returns true if the value is null or undefined.
   */
  static isNU(value) {
    return typeof value === "undefined" || 
      value === null;
  }
  /**
   * Checks if the value is "good" (not undefined and not null).
   * @param {!unknown} value The value to examine the "goodness" of
   * @returns {asserts value is {}} true if value is not undefined and not null; otherwise, false.
   */
  static isGood(value) {
    console.assert(Util.isNotNU(value));
  }
  /**
   * Checks if the value is "good" (not undefined, not null, and an instance of T).
   * @param {unknown} value The value to examine the "goodness" of
   * @param {Function} T The constructor function to check against
   * @returns {asserts value is T} true if value is not undefined and not null; otherwise, false.
   */
  static isAGoodT(value, T) {
      Util.isGood(value);
    console.assert(
      value instanceof T
    );
  }
  /**
   * Checks if the value is "bad" (undefined or null).
   * @param {unknown} value The value to examine the "badness" of
   * @returns {asserts value is null} true if value is undefined or null; otherwise, false.
   */
  static isBad(value) {
    console.assert(Util.isNU(value));
  }
  /**
   * Checks if the value is a good string (not undefined, not null, and has
   * a length between minLength and maxLength).
   * @param {unknown} value The value to check
   * @param {number} minLength The minimum length of the string (inclusive, default 1)
   * @param {number} maxLength The maximum length of the string (inclusive, default Infinity)
   * @returns {boolean} true if value is a good string; otherwise, false.
   */
  static isGoodString(value/*:unknown*/, minLength = 1, maxLength = Infinity)/*: value is string*/ {
    return Util.isNotNU(value) && typeof value === "string" && value.length >= minLength && value.length <= maxLength;
  }
  /**
   * Checks if the value is a bad string (undefined, null, or does not have a length
   * between minLength and maxLength).
   * @param {unknown} value The value to check
   * @param {number} minLength The minimum length of the string (inclusive, default 1)
   * @param {number} maxLength The maximum length of the string (inclusive, default Infinity)
   * @returns {boolean} true if value is a bad string; otherwise, false.
   */
  static isBadString(value/*:unknown*/, minLength = 1, maxLength = Infinity)/*: value is null | undefined*/ {
    return !this.isGoodString(value, minLength, maxLength);
  }
  /**
   * Checks if the value is a good number (not undefined, not null, not NaN, and has
   * a value between min and max).
   * @param {unknown} value The value to check
   * @param {number} min The minimum value of the number (inclusive, default -Infinity)
   * @param {number} max The maximum value of the number (inclusive, default Infinity)
   * @returns {boolean} true if value is a good number; otherwise, false.
   */
  static isGoodNumber(value/*:unknown*/, min = -Infinity, max = Infinity)/*: value is number*/ {
    return Util.isNotNU(value) && typeof value === "number" && !isNaN(value) && value >= min && value <= max;
  }
  /**
   * Checks if the value is a bad number (undefined, null, NaN, or does not have a value
   * between min and max).
   * @param {unknown} value The value to check
   * @param {number} min The minimum value of the number (inclusive, default -Infinity)
   * @param {number} max The maximum value of the number (inclusive, default Infinity)
   * @returns {boolean} true if the value is a bad number; otherwise, false.
   */
  static isBadNumber(value/*:unknown*/, min = -Infinity, max = Infinity)/*: value is null | undefined*/ {
    return !this.isGoodNumber(value, min, max);
  }
  /**
   * Checks if the value is a good array (not undefined, not null, and has
   * a length between minLength and maxLength).
   * @param {unknown} value The value to check
   * @param {number} minLength The minimum length of the array (inclusive, default 1)
   * @param {number} maxLength The maximum length of the array (inclusive, default Infinity)
   * @param {boolean} [verifyExisting=false] true to verify all <length> items in the array are good; otherwise, false (default)).
   * @returns {boolean} true if the value is a good array; otherwise, false.
   */
  static isGoodArray/*<T>*/(value/*: T[]*/, minLength = 1, maxLength = Infinity, verifyExisting = false)/*: value is T[]*/ {
    return Util.isNotNU(value) && 
      Array.isArray(value) && 
      value.length >= minLength && 
      value.length <= maxLength && 
      (!verifyExisting || value.every((el) => Util.isGood(el)));
  }
  /**
   * Checks if the value is a bad array (undefined, null, or does not have a length between minLength and maxLength).
   * @param {unknown} value The value to check
   * @param {number} minLength The minimum length of the array (inclusive, default 1)
   * @param {number} maxLength The maximum length of the array (inclusive, default Infinity)
   * @param {boolean} [verifyExisting=false] true to verify all <length> items in the array are good; otherwise, false (default)).
   * @returns {boolean} true if the value is a bad array; otherwise, false.
   * @description This is the opposite of isGoodArray. Note that verifyExisting=true checks if all elements are _good_ not bad.
   */
  static isBadArray/*<T>*/(value/*: T[]*/, minLength = 1, maxLength = Infinity, verifyExisting = false)/*: value is null | undefined*/ {
    return !this.isGoodArray(value, minLength, maxLength, verifyExisting);
  }
  static #randomValues = new Uint8Array(256);
  static #randomIntervals = new Map/*<string, Uint8Array>*/();
  static #randomIndex = 0;
  /**
   * Generates a random number value between 0 and 255
   * @returns A random number value between 0 and 255
   */
  static getRandomValue() {
    if (Util.isBadArray(this.#randomValues, 256, Infinity) || this.#randomIndex >= 256) {
      this.#randomValues = (globalThis ?? window).crypto.getRandomValues(new Uint8Array(256));
      this.#randomIndex = 0;
    }
    return this.#randomValues[this.#randomIndex++ % 256];
  }
  /**
   * Generates a random number between min and max
   * @param {number} min The minimum value to generate (inclusive, default 0)
   * @param {number} max The maximum value to generate (inclusive, default 1)
   * @returns A random number between min and max
   */
  static getRandomValueBetween(min = 0, max = 1) {
    const keyObj = { min, max };
    const key = JSON.stringify(keyObj);
    if (!this.#randomIntervals.has(key) || this.#randomIndex >= 256) {
      this.#randomIntervals.set(key, (globalThis ?? window).crypto.getRandomValues(new Uint8Array(256)));
      this.#randomIndex = 0;
    }
    const randomValues = this.#randomIntervals.get(key);
    return min + (max - min) * Math.floor(randomValues[this.#randomIndex++ % 256] / 255);
  }
  /**
   * Checks if two values are equal. If deep is true, the comparison will be deep.
   * @param {unknown} a The first value to compare
   * @param {unknown} b The second value to compare
   * @param {boolean} deep If true, the comparison will be deep; otherwise, false
   * @returns {boolean} true if the values are equal; otherwise, false.
   */
  static areEqual(a/*: unknown*/, b/*: unknown*/, deep/*: boolean*/)/*: boolean*/ {
    // Object.is handles most cases, but not all.
    if (Object.is(a, b) && Util.isNotNU(a) && Util.isNotNU(b)) {
      return true;
    }
    // If the types are different, they can't be equal
    if (typeof a !== typeof b) {
      return false;
    }
    // Check a few special cases for types
    switch (typeof a) {
      case 'object':
        if (typeof b !== 'object') {
          // Should have been caught previously
          return false;
        } else if (a instanceof Date && b instanceof Date) {
          // Date objects are compared by their time value
          return a.valueOf() === b.valueOf();
        } else if (a !== null && b !== null && (
          a instanceof Date && 
          b instanceof Temporal.PlainDateTime
        )) {
          return Temporal.PlainDateTime.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Date && 
          b instanceof Temporal.Instant
        )) {
          return Temporal.Instant.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Date && 
          b instanceof Temporal.PlainDate
        )) {
          return Temporal.PlainDate.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Date && 
          b instanceof Temporal.ZonedDateTime
        )) {
          return Temporal.ZonedDateTime.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Date && 
          b instanceof Temporal.PlainTime
        )) {
          return Temporal.PlainTime.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Date && 
          b instanceof Temporal.PlainYearMonth
        )) {
          return Temporal.PlainYearMonth.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Date && 
          b instanceof Temporal.PlainMonthDay
        )) {
          return b.equals(a);
        } else if (a !== null && b !== null && (
          a instanceof Temporal.PlainDateTime && 
          b instanceof Date
        )) {
          return Temporal.PlainDateTime.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.Instant  && 
          b instanceof Date
        )) {
          return Temporal.Instant.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.PlainDate  && 
          b instanceof Date
        )) {
          return Temporal.PlainDate.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.ZonedDateTime  && 
          b instanceof Date
        )) {
          return Temporal.ZonedDateTime.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.PlainTime  && 
          b instanceof Date
        )) {
          return Temporal.PlainTime.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.PlainYearMonth  && 
          b instanceof Date
        )) {
          return Temporal.PlainYearMonth.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.PlainMonthDay && 
          b instanceof Date 
        )) {
          return a.equals(b);
        } else if (a !== null && b !== null && (
          a instanceof Temporal.PlainDateTime && 
          b instanceof Temporal.PlainDateTime 
        )) {
          return Temporal.PlainDateTime.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.Instant  && 
          b instanceof Temporal.Instant
        )) {
          return Temporal.Instant.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.PlainDate  && 
          b instanceof Temporal.PlainDate
        )) {
          return Temporal.PlainDate.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.ZonedDateTime  && 
          b instanceof Temporal.ZonedDateTime
        )) {
          return Temporal.ZonedDateTime.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.PlainTime  && 
          b instanceof Temporal.PlainTime
        )) {
          return Temporal.PlainTime.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.PlainYearMonth  && 
          b instanceof Temporal.PlainYearMonth
        )) {
          return Temporal.PlainYearMonth.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.PlainMonthDay && 
          b instanceof Temporal.PlainMonthDay
        )) {
          return a.equals(b);
        }else if (a !== null && b !== null && (
          a instanceof Temporal.PlainDateTime && 
          b instanceof Temporal.Instant 
        )) {
          return Temporal.PlainDateTime.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.Instant  && 
          b instanceof Temporal.PlainDateTime
        )) {
          return Temporal.Instant.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.PlainDate  && 
          b instanceof Temporal.ZonedDateTime
        )) {
          return Temporal.PlainDate.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.ZonedDateTime  && 
          b instanceof Temporal.PlainDate
        )) {
          return Temporal.ZonedDateTime.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.PlainTime  && 
          b instanceof Temporal.ZonedDateTime
        )) {
          return Temporal.PlainTime.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.PlainYearMonth  && 
          b instanceof Temporal.ZonedDateTime
        )) {
          return Temporal.PlainYearMonth.compare(a, b) === 0;
        } else if (a !== null && b !== null && (
          a instanceof Temporal.PlainMonthDay && 
          b instanceof Temporal.PlainDate
        )) {
          return a.equals(b);
        } else if (Array.isArray(a) && Array.isArray(b)) {
          if (a.length !== b.length) {
            return false;
          }
          // Array positions may differ if deep == false
          return deep ?
            a.every((elA, i) => Util.areEqual(elA, b[i], deep)) :
            a.every((elA) => b.some((elB) => Util.areEqual(elA, elB, deep)));
        } else if (a instanceof RegExp && b instanceof RegExp) {
          // There are edge cases where this would not work, but it's good enough for most cases
          return a.toString() === b.toString(); 
        } else if (a != null && b != null) {
          const entriesA = Object.entries(a);
          const entriesB = Object.entries(b);
          // if a primitive is wrapped in an object (e.g. Object(1)), Object.entries(obj) returns [].
          if (entriesA.length === 0 && entriesB.length === 0) {
            // The primitive value can be retrieved via valueOf()
            const valueA = a.valueOf();
            const valueB = b.valueOf();
            return Util.areEqual(valueA, valueB, deep);
          }
          return Util.areEqual(entriesA, entriesB, deep);
        } else if (a === null && b === null) {
          // null are equal to each other shallowly, but not deeply
          return !deep;
        } 

        return false;
      case 'bigint':
        // bigint support in Object.is is unknown
        return a === b;
      case 'symbol':
        if (typeof b === 'symbol') {
          // Symbols are like objects; they use reference equality, but they only have
          // one property.
          return a.description === b.description;
        }

        return false;
    }
    
    return a === b;
  }

}
