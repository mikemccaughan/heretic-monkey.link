import { TimeSpan } from './TimeSpan.mjs';
export const CacheExpirationType = {
  Absolute: 0,
  Sliding: 1,
};
export class CacheExpiration {
  constructor(type, expiration, onExpiration) {
    this.type = type;
    this.expiration = expiration;
    this.onExpired = onExpiration;
  }
  stop() {
    this.isRunning = false;
  }
  start() {
    this.isRunning = true;
    this.beganAt = new Date();
    // default 1 hour expiration
    this.expiresAt = new Date(new Date(this.beganAt.valueOf()).setHours(this.beganAt.getHours() + 1));
    if (this.type === CacheExpirationType.Absolute) {
      if (this.expiration && this.expiration.valueOf() > 0) {
        this.expiresAt = this.expiration;
      }
    }
    if (this.type === CacheExpirationType.Sliding) {
      if (this.expiration instanceof TimeSpan) {
        this.expiresAt = this.expiration.addToDate(this.beganAt);
      }
    }
    this.elapsed = TimeSpan.fromSubtractingTwoDates(this.beganAt, this.expiresAt);
    this.expirationCheck = setTimeout(this.checkExpiration.bind(this), this.expiresAt.valueOf() - this.beganAt.valueOf());
  }
  resetExpiration() {
    if (this.type === CacheExpirationType.Sliding) {
      this.isRunning = false;
      clearTimeout(this.expirationCheck);
      this.start();
    }
  }
  checkExpiration() {
    if (this.expiresAt instanceof Date && !Number.isNaN(this.expiresAt.valueOf())) {
      if (TimeSpan.fromSubtractingTwoDates(this.beganAt, Date.now()).totalMilliseconds >= this.elapsed.totalMilliseconds) {
        this.stop();
        this.onExpired();
      }
    }
  }
}
export class Cache {
  static InfiniteAbsoluteExpiration = new CacheExpiration(
    CacheExpirationType.Absolute,
    new Date(0)
  );
  static NoSlidingExpiration = new CacheExpiration(
    CacheExpirationType.Sliding,
    TimeSpan.Zero
  );
  constructor(expiration, onExpiration) {
    this.expiration = expiration;
    this.#entries = new Map();
    this.onExpired = onExpiration;
  }
  get(key) {
    return this.#entries.get(key);
  }
  set(key, value) {
    this.expiration.resetExpiration();
    this.#entries.set(key, value);
    return this;
  }
  delete(key) {
    this.expiration.resetExpiration();
    return this.#entries.delete(key);
  }
  clear() {
    this.expiration.resetExpiration();
    this.#entries.clear();
  }
}
export default class CacheManager {
  static #token = Symbol('ctor');
  static instance;
  static lastId = -1;
  static caches;
  static Create() {
    caches = new Map();
    return instance ?? (instance = new CacheManager(CacheManager.#token));
  }
  constructor(token) {
    if (token !== CacheManager.#token) {
      throw new Error('Use Create() to get an instance of CacheManager');
    }
  }
  static CreateCache(expiration) {
    const id = CacheManager.lastId++;
    const cache = new Cache(expiration, () => { CacheManager.caches.delete(id); });
    CacheManager.caches.set(id, cache);
    return cache;
  }
}