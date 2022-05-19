import { TimeSpan } from './TimeSpan.mjs';
/**
 * Provides an enumeration of the types of cache expiration.
 */
export const CacheExpirationType = {
  Absolute: 0,
  Sliding: 1,
};

/**
 * Encapsulates the timing needed for expiration of cache entries.
 */
export class CacheExpiration {
  constructor(type, expiration, onExpiration) {
    this.type = type;
    this.expiration = expiration;
    this.onExpired = onExpiration;
  }
  /**
   * Stops the cache expiration.
   */
  stop() {
    this.isRunning = false;
    clearTimeout(this.expirationCheck);
  }
  /**
   * Starts the cache expiration.
   */
  start() {
    this.isRunning = true;
    this.beganAt = new Date();
    // default 1 hour expiration
    this.expiresAt = new Date(new Date(this.beganAt.valueOf()).setHours(this.beganAt.getHours() + 1));
    if (this.type === CacheExpirationType.Absolute) {
      // If the expiration is absolute, then the time of expiration is the specified time.
      if (this.expiration && this.expiration.valueOf() > 0) {
        this.expiresAt = this.expiration;
      }
    }
    if (this.type === CacheExpirationType.Sliding) {
      // If the expiration is sliding, then the time of expiration is the time the expiration began plus the TimeSpan.
      if (this.expiration instanceof TimeSpan) {
        this.expiresAt = this.expiration.addToDate(this.beganAt);
      }
    }
    this.elapsed = TimeSpan.fromSubtractingTwoDates(this.beganAt, this.expiresAt);
    this.expirationCheck = setTimeout(this.checkExpiration.bind(this), this.expiresAt.valueOf() - this.beganAt.valueOf());
  }
  /**
   * Resets the expiration process if the expiration type is sliding.
   */
  resetExpiration() {
    if (this.type === CacheExpirationType.Sliding) {
      this.stop();
      this.start();
    }
  }
  /**
   * Checks if the cache has expired and if so, calls the onExpired callback.
   */
  checkExpiration() {
    if (this.expiresAt instanceof Date && !Number.isNaN(this.expiresAt.valueOf())) {
      if (TimeSpan.fromSubtractingTwoDates(this.beganAt, Date.now()).totalMilliseconds >= this.elapsed.totalMilliseconds) {
        this.stop();
        this.onExpired();
      }
    }
  }
}

/**
 * Provides a simple cache for arbitrary objects with custom expiration.
 */
export class Cache {
  #onExpired;
  /**
   * Causes cache entries to never expire.
   */
  static InfiniteAbsoluteExpiration = new CacheExpiration(
    CacheExpirationType.Absolute,
    new Date(0)
  );
  /**
   * Causes cache entries to never expire, on a sliding expiration basis.
   */
  static NoSlidingExpiration = new CacheExpiration(
    CacheExpirationType.Sliding,
    TimeSpan.Zero
  );
  constructor(expiration, onExpiration) {
    this.expiration = expiration;
    this.#entries = new Map();
    this.#onExpired = this.expiration.onExpired = onExpiration;
  }
  /**
   * Provides access to the onExpired callback function.
   */
  get onExpired() {
    return this.#onExpired;
  }
  set onExpired(valued) {
    if (this.#onExpired !== value) {
      this.#onExpired = value;
      this.expiration.onExpired = value;
    }
  }
  /**
   * Provides access to cached values.
   * @param {any} key The key with which to look up the cached value.
   * @returns The value cached under the specified key.
   */
  get(key) {
    return this.#entries.get(key);
  }
  /**
   * Adds/Updates a cached value.
   * @param {any} key The under which to store the specified value.
   * @param {any} value The value to store under the specified key.
   * @returns The Cache instance.
   */
  set(key, value) {
    this.expiration.resetExpiration();
    this.#entries.set(key, value);
    return this;
  }
  /**
   * Deletes a value from the cache.
   * @param {any} key The key of the value to delete from the cache.
   * @returns true if a value in the Cache object existed and has been removed, or false if the value does not exist.
   */
  delete(key) {
    this.expiration.resetExpiration();
    return this.#entries.delete(key);
  }
  /**
   * Clears the entire cache. Use with caution.
   */
  clear() {
    this.expiration.resetExpiration();
    this.#entries.clear();
  }
}

/**
 * Manages the creation of Caches in an application.
 */
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
