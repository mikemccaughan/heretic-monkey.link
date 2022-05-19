/**
 * Stolen from https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList combined with
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set:
 * 
 * The TokenList interface represents a set of space-separated tokens. A TokenList is 
 * indexed beginning with 0 as with JavaScript Array objects. TokenList is always 
 * case-sensitive.
 */
export default class TokenList {
  #validateValues(values) {
    var tokens = [...values];
    if (tokens.some(token => typeof token !== 'string' || token.length === 0)) {
      throw new SyntaxError("All arguments to add must be valid strings with content");
    }
    if (tokens.some(token => /\s/.test(token))) {
      throw new InvalidCharacterError("One of the arguments contained whitespace")
    }
  }
  #validateValue(value) {
    if (typeof value !== 'string' || value.length === 0) {
      throw new SyntaxError("The value must be a valid string with content");
    }
    if (/\s/.test(value)) {
      throw new InvalidCharacterError("One of the arguments contained whitespace")
    }
  }
  #parseStringToSet(value) {
    const tokens = value
      .trim()
      .split(' ')
      .map((token) => token.trim())
      .filter((token) => token.length);
    if (tokens.some(token => /\s/.test(token))) {
      throw new InvalidCharacterError("One of the arguments contained whitespace")
    }
    return new Set(tokens);
  }
  /**
   * Initializes a TokenList to the specified value, or just an empty list.
   * @param {undefined|null|TokenList|string[]|string} value The value to initialize the TokenList with.
   * Can be another instance of TokenList, an array of string tokens, or a space-separated list of 
   * tokens in string format.
   */
  constructor(value) {
    if (value == null || value.length === 0) {
      this.list = new Set();
    } else if (value instanceof TokenList) {
      this.list = new Set([...value.list]);
    } else if (Array.isArray(value)) {
      this.#validateValues(value);
      this.list = new Set([...value]);
    } else {
      this.list = this.#parseStringToSet(value);
    }
  }
  /**
   * Gets the number of tokens in the list.
   */
  get length() {
    return this.list.size;
  }
  /**
   * Gets or sets the list as a space-separated string.
   * Note that setting the value replaces any existing tokens in the list.
   */
  get value() {
    return [...this.list].join(' ');
  }
  set value(value) {
    if (typeof value !== 'string' || value.length === 0) {
      throw new SyntaxError("The value must be a valid string with content");
    }
    this.list = this.#parseStringToSet(value);
  }
  /**
   * Gets a token at a specific index, or undefined if the index is invalid or nothing exists there.
   * @param {number} index The index in the list at which to get the token.
   * @returns {string|undefined|null} The value at the specified index, or undefined.
   */
  item(index) {
    // Sets are great when you don't need to do anything with them involving indexes...
    return index < 0 || index > this.list.size - 1
      ? undefined
      : [...this.list][index];
  }
  /**
   * Inidcates whether the token is present.
   * @param {string} token The token which may be in the list.
   * @returns true if the token is included; otherwise, false.
   */
  contains(token) {
    return this.list.has(token);
  }
  /**
   * Adds all tokens to the list, except for those already present.
   * @param  {...string} tokens The tokens to add.
   */
  add(...tokens) {
    this.#validateValues(tokens);
    tokens.forEach(this.list.add);
  }
  /**
   * Removes all tokens from the list, if they are present.
   * @param  {...any} tokens The tokens to remove.
   */
  remove(...tokens) {
    this.#validateValues(tokens);
    tokens.forEach(this.list.delete)
  }
  /**
   * Replaces oldToken with newToken.
   * @param {string} oldToken The token to remove.
   * @param {string} newToken The token to add in oldToken's place.
   */
  replace(oldToken, newToken) {
    // Sets are great when you don't need to do anything with them involving indexes...
    var tokens = [oldToken, newToken];
    this.#validateValues(tokens);
    var newArray = [...this.list];
    newArray.splice(newArray.indexOf(oldToken), 1, newToken);
    this.list = new Set(newArray);
  }
  /**
   * Checks if the token is "in the associated attribute's supported tokens". Since this
   * implementation is not associated with any attribute, always returns true.
   * @param {string} token The token to test for support.
   * @returns true (this implementation supports all "tokens")
   */
  supports(token) {
    return true;
  }
  /**
   * If force is not given, removes the token if it is present and adds it if it is not present.
   * If force is true, adds the token. If force is false, removes the token.
   * @param {string} token The token to toggle.
   * @param {boolean} force true to add the token; otherwise, false to remove the token.
   * @returns true if token is now present; otherwise, false.
   */
  toggle(token, force) {
    this.#validateValue(token);
    if (force === true) {
      // added, not removed
      this.list.add(token);
      return true;
    } else if (force === false) {
      // removed, not added
      this.list.delete(token);
      return false;
    } else {
      // toggle
      if (this.list.has(token)) {
        this.list.delete(token);
        return false;
      } else {
        this.list.add(token);
        return true;
      }
    }
  }
  /**
   * Gets a new iterator object of the array of `[token, token]` for each token in the list.
   * @returns An iterator object that contains an array of `[token, token]` for each token in the list.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries
   */
  entries() {
    // Sets are great when you don't need to do anything with them involving indexes...
    return [...this.list.entries()].map(([k,v], i) => [i, v])[Symbol.iterator];
  }
  /**
   * Executes a function once for each value in the TokenList, in insertion order
   * @param {function} callback A function to execute, taking three arguments:
   * @param {string} callback.value The value of the token being processed
   * @param {string} callback.key The key of the token being processed (same as the `value`)
   * @param {string} callback.set The Set of all tokens in the list
   * @param {any} thisArg The value to use as `this` when executing `callback`
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach
   */
  forEach(callback, thisArg) {
    this.list.forEach(callback, thisArg);
  }
  /**
   * The keys() method of the TokenList interface returns an iterator allowing to go through all keys 
   * contained in this object. The keys are unsigned integers.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/keys
   */
  keys() {
    // Sets are great when you don't need to do anything with them involving indexes...
    return Object.keys([...this.list]).map(Number)[Symbol.iterator];
  }
  /**
   * Returns a new Iterator object that contains the values for each token in the TokenList object in insertion order.
   * @returns an Iterator object that contains the values for each token in the TokenList object.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values
   */
  values() {
    return this.list.values();
  }
}
