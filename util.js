export default class Util {
  /**
   * Debounces a function
   * @param {Function} fn The function to debounce
   * @param {number} ms The number of milliseconds to wait between calls
   * @returns {Function} The debounced function
   */
  static debounce(fn, ms) {
    var timer;
    /**
     * The debouncing function
     * @param {Event|any} e Typically this function is used as a way of preventing
     * events from overwhelming an event handler function.
     */
    return function (e) {
      clearTimeout(timer);
      timer = setTimeout(
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
    let data = this.datamap.get(element);
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
    this.datamap.set(element, { [name]: value });
  }
  /**
   * Gets the closest ancestor to the element that matches the selector.
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
    if (parent === document.documentElement) {
      return null;
    }

    return this.getAncestor(parent, selector);
  }
}
