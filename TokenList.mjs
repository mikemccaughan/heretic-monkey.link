/**
 * Implements the DOMTokenList interface and stores the information 
 * in memory. The list will not have duplicate areas.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TokenList {
  /**
   * Creates a new instance of the TokenList class.
   * @param {string|undefined} value A value to parse as a token list.
   */
  constructor(value) {
    if (value == null || value.length === 0) {
      this.list = new Set();
    } else {
      this.list = new Set(value
        .trim()
        .split(' ')
        .map((token) => token.trim())
        .filter((token) => token.length)
      );
    }
  }
  /**
   * The number of unique tokens in the list.
   */
  get length() {
    return this.list.size;
  }
  /**
   * The value of the list as a space-separated list of tokens.
   * (Note that means that tokens with spaces may be lost)
   */
  get value() {
    return [...this.list].join(' ');
  }
  /**
   * Gets the token at the index or null.
   * @param {number} index Gets the token at the index given
   * @returns {string|null} The token at the index or null
   */
  item(index) {
    return index < 0 || index > this.list.size - 1
      ? null
      : [...this.list][index];
  }
  /**
   * Indicates whether the list contains the given token.
   * @param {string} token The token to find in the list
   * @returns {boolean} true if the token is in the list; otherwise, false
   */
  contains(token) {
    return this.list.has(token);
  }
  /**
   * Adds the specified tokens to the list.
   * @param  {...string} tokens The tokens to add to the list
   */
  add(...tokens) {
    tokens.forEach(token => this.list.add(token));
  }
  /**
   * Removes the specified tokens from the list.
   * @param  {...string} tokens The tokens to remove from the list
   */
  remove(...tokens) {
    tokens.forEach(token => this.list.delete(token));
  }
  /**
   * Replaces the token with another one.
   * @param {string} oldToken The token to replace
   * @param {string} newToken The new token to use
   */
  replace(oldToken, newToken) {
    const arr = [...this.list];
    arr.splice(arr.indexOf(oldToken), 1, newToken);
    this.list = new Set(arr);
  }
  /**
   * Indicates whether the token was found in the allowed list
   * @param {string} token The token to query for
   * @returns {boolean} true if the token is allowable in the token list
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  supports(token) {
    return true;
  }
  /**
   * If the token exists in the list, removes it from the list and returns
   * false. If the token does not exist, adds it to the list and returns
   * true.
   * @param {string} token The token to add or remove
   * @param {boolean|undefined} force (optional) If included, turns the 
   * toggle into a one way-only operation. If set to false, then token
   * will only be removed, not added. If set to true, then token will 
   * only be added, not removed.
   * @returns {boolean} true if token is in the list after the call;
   * otherwise, false
   */
  toggle(token, force) {
    if (force === true) {
      // added, not removed
      this.list.add(token);
      return true;
    } else if (force === false) {
      // removed, not added
      if (this.list.has(token)) {
        this.list.delete(token);
      }
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
   * Gets an interator of [key, value] pairs.
   * @returns {IterableIterator<[string, string]>} The array of 
   * [key, value] pairs, each with the token as both key and value.
   */
  entries() {
    return this.list.entries();
  }
  /**
   * @typedef {function(string, number, any): void} callbackFn
   *  
   */
  /**
   * Calls the callback for each value in the list, in insertion order.
   * @param {callbackFn} callback The function to execute for each 
   * element in the list.
   * @param {TokenList} thisArg (default) The value to use as this 
   * when executing callback.
   */
  forEach(callback, thisArg) {
    this.list.forEach(callback, thisArg);
  }
  /**
   * Alias for the values() method.
   * @returns {IterableIterator<string>} An iterator for the tokens
   * in the list.
   */
  keys() {
    return this.list.keys();
  }
  /**
   * Returns an iterator for the tokens in the list, in insertion order.
   * @returns {IterableIterator<string>} An iterator for the tokens
   * in the list.
   */
  values() {
    return this.list.values();
  }
}
