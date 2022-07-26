export interface ITypedStorage<T> {
  hasKey(key: string): boolean;
  newKey(): string;
  save(key: string | null, item: T): string;
  get(key: string): T | null;
}

export class TypedStorage<T> implements ITypedStorage<T> {
  s: Storage;
  private _keys: Set<string> = new Set<string>();
  constructor() {
    this.s = localStorage;
  }
  get keys(): Set<string> {
    this.loadKeys();
    return this._keys;
  }
  private loadKeys(): void {
    Object.keys(this.s).filter(sk => !this._keys.has(sk)).forEach(sk => this._keys.add(sk));
  }
  hasKey(key: string): boolean {
    this.loadKeys();
    return this._keys.has(key);
  }
  newKey(): string {
    let lastKey =
      this._keys.size === 0
        ? "key0000000000000000"
        : Array.from(this.keys.values()).pop()!;
    let lastInt = parseInt(lastKey.substring(3));
    return `key${`0000000000000000${lastInt + 1}`.slice(-16)}`;
  }
  save(key: string | null, item: T): string {
    if (key == null) {
      key = this.newKey();
    }
    if (!this.hasKey(key)) {
      this._keys.add(key);
    }
    this.s.setItem(key, JSON.stringify(item));
    return key;
  }
  get(key: string): T | null {
    if (!this.hasKey(key)) {
      return null;
    }
    return JSON.parse(this.s.getItem(key)!);
  }
}
