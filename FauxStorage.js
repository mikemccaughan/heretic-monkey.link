// A sham for the Storage API that uses an `Map` backer and does not survive refresh 
// (since Stack Snippets don't survive refresh). Might help with basic questions about 
// the Storage API regarding serialization, or getting/setting values.
//
// Note you'll need to use localStore instead of localStorage and sessionStore instead 
// of sessionStorage to use the shams.

class FauxStorage {
  // private class fields do not have wide support as of this writing
  // #store = new Map();
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let self = this;
    self.store = new Map();
    // eslint-disable-next-line no-undef
    return new Proxy(this, {
      /**
       * Allows for property-based access to keys in storage. E.g., localStore.example
       * is the same as localStore.getItem("example");
       * @param {FauxStorage} target The FauxStorage instance the proxy is for
       * @param {string} prop The name of the key to retrieve
       * @returns {string} The value associated with prop, or null
       */
      get(target, prop) {
        if (!(prop in target)) {
          return target.getItem(prop);
        }

        return target[prop];
      },
      /**
       * Allows for property-based setting of values in storage. E.g., 
       * localStore.example = "sample" is the same as localStore.setItem("example", "sample");
       * @param {FauxStorage} target The FauxStorage instance the proxy is for
       * @param {string} prop The name of the key to set
       * @param {string} value The value to store and associate with key
       * @returns {boolean} true if the values was successfully stored; otheriwse, false
       */
      set(target, prop, value) {
        if (!(prop in target)) {
          target.setItem(prop, value);
          return true;
        }

        return false;
      },
      /**
       * If the property specified is owned by FauxStorage or one of its ancestors,
       * returns its value, and inidcates it is not writable, enumerable, or configurable; 
       * otherwise, if it is constructed from a key in storage, returns its value, and
       * indicates it is writable, enumerable, and configurable.
       * @param {FauxStorage} target The FauxStorage instance the proxy is for
       * @param {string} prop The name of the key to get a descriptor for
       * @returns The property descriptor for the property
       */
      getOwnPropertyDescriptor(target, prop) {
        return prop in target ? {
          value: target[prop],
          writable: false,
          enumerable: false,
          configurable: false
        } : {
          value: target.getItem(prop),
          writable: true,
          enumerable: true,
          configurable: true
        };
      }
    });
  }
  /**
   * The number of data items in storage.
   */
  get length() {
    return this.store.size;
  }
  /**
   * Gets the value of the data item stored at key.
   * @param {string} key The name of the key for which to retrieve the value
   * @returns {string} The value associated with key
   */
  getItem(key) {
    return this.store.get(key) ?? null;
  }
  /**
   * Adds or updates the value of the data item stored at key.
   * @param {string} key The name of the key to associate with the value
   * @param {string} value The value to associate with the key
   */
  setItem(key, value) {
    this.store.set(key, String(value));
  }
  /**
   * Removes the key and value from storage, or does nothing if not present.
   * @param {string} key The name of the key to remove
   */
  removeItem(key) {
    this.store.delete(key);
  }
  /**
   * Gets the nth key in the current storage object.
   * @param {number} index An integer representing the zero-based index or the
   * key to be returned.
   * @returns {string} The key at index, or null if the index does not exist.
   */
  key(index) {
    return [...this.store.keys()][index];
  }
  /**
   * Removes all keys and values in storage.
   */
  clear() {
    this.store.clear();
  }
}
(function() {
  // Note: Requires new names because sandbox attribute on iframe denies access to 
  // localStorage/sessionStorage name, regardless of implementation.
  const localStore = new FauxStorage();
  const sessionStore = new FauxStorage();
  // eslint-disable-next-line no-undef
  Object.defineProperty(window, "localStore", {
    get: () => localStore,
    enumerable: true,
    configurable: true,
    writable: false
  });
  // eslint-disable-next-line no-undef
  Object.defineProperty(window, "sessionStore", {
    get: () => sessionStore,
    enumerable: true,
    configurable: true,
    writable: false
  });  
})();
