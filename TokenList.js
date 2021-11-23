class TokenList {
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
  get length() {
    return this.list.size;
  }
  get value() {
    return [...this.list].join(' ');
  }
  item(index) {
    return index < 0 || index > this.list.size - 1
      ? undefined
      : [...this.list][index];
  }
  contains(token) {
    return this.list.has(token);
  }
  add(...tokens) {
    tokens.forEach(token => this.list.add(token));
  }
  remove(...tokens) {
    tokens.forEach(token => this.list.delete(token));
  }
  replace(oldToken, newToken) {
    const arr = [...this.list];
    arr.splice(arr.indexOf(oldToken), 1, newToken);
    this.list = new Set(arr);
  }
  supports(token) {
    return true;
  }
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
  entries() {
    return this.list.entries();
  }
  forEach(callback, thisArg) {
    this.list.forEach(callback, thisArg);
  }
  keys() {
    return this.list.keys();
  }
  values() {
    return this.list.values();
  }
}
