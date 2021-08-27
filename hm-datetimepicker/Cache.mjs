import { TimeSpan } from './TimeSpan.mjs';
export const CacheExpirationType = {
  Absolute: 0,
  Sliding: 1,
};
export class CacheExpiration {
  constructor(type, expiration) {
    this.type = type;
    this.expiration = expiration;
  }
}
export default class Cache {
  static InfiniteAbsoluteExpiration = new CacheExpiration(
    CacheExpirationType.Absolute,
    new Date(0)
  );
  static NoSlidingExpiration = new CacheExpiration(
    CacheExpirationType.Sliding,
    TimeSpan.Zero
  );

  constructor() {}
}
