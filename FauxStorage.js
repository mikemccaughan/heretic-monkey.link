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
    let self = this;
    self.store = new Map();
    return new Proxy(this, {
      get(target, prop) {
        if (!(prop in target)) {
          return target.getItem(prop);
        }

        return target[prop];
      },
      set(target, prop, value) {
        if (!(prop in target)) {
          target.setItem(prop, value);
          return true;
        }

        return false;
      },
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
  get length() {
    return this.store.size;
  }
  getItem(key) {
    return this.store.get(key) ?? null;
  }
  setItem(key, value) {
    this.store.set(key, String(value));
  }
  removeItem(key) {
    this.store.delete(key);
  }
  key(index) {
    return [...this.store.keys()][index];
  }
  clear() {
    this.store.clear();
  }
}
(function() {
  // Note: Requires new names because sandbox attribute on iframe denies access to 
  // localStorage/sessionStorage name, regardless of implementation.
  const localStore = new FauxStorage();
  const sessionStore = new FauxStorage();
  Object.defineProperty(window, "localStore", {
    get: () => localStore,
    enumerable: true,
    configurable: true,
    writable: false
  });
  Object.defineProperty(window, "sessionStore", {
    get: () => sessionStore,
    enumerable: true,
    configurable: true,
    writable: false
  });  
})();
