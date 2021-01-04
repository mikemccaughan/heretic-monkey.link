class TokenList {
  constructor(value) {
    if (value == null || value.length === 0) {
      this.list = [];
    } else {
      this.list = value
        .trim()
        .split(' ')
        .map((token) => token.trim())
        .filter((token) => token.length);
    }
  }
  get length() {
    return this.list.length;
  }
  get value() {
    return this.list.join(' ');
  }
  item(index) {
    return index < 0 || index > this.list.length - 1
      ? undefined
      : this.list[index];
  }
  contains(token) {
    return this.list.includes(token);
  }
  add(...tokens) {
    this.list = [...this.list, ...tokens];
  }
  remove(...tokens) {
    this.list = this.list.filter((token) => tokens.includes(token));
  }
  replace(oldToken, newToken) {
    this.list.splice(this.list.indexOf(oldToken), 1, newToken);
  }
  supports(token) {
    return true;
  }
  toggle(token, force) {
    if (force === true) {
      // added, not removed
      this.list.push(token);
      return true;
    } else if (force === false) {
      // removed, not added
      if (this.list.includes(token)) {
        this.list.splice(this.list.indexOf(token), 1);
      }
      return false;
    } else {
      // toggle
      if (this.list.includes(token)) {
        this.list.splice(this.list.indexOf(token), 1);
        return false;
      } else {
        this.list.push(token);
        return true;
      }
    }
  }
  entries() {
    return this.list[Symbol.iterator];
  }
  forEach(callback, thisArg) {
    this.list.forEach(callback, thisArg);
  }
  keys() {
    return this.entries();
  }
  values() {
    return this.entries();
  }
}
