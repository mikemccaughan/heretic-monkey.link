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
    if (this.s.length !== this._keys.size) {
      for (let i = this.s.length - 1; i > -1; i--) {
        if (!this._keys.has(this.s.key(i)!)) {
          this._keys.add(this.s.key(i)!);
        } else {
          break;
        }
      }
    }
  }
  hasKey(key: string): boolean {
    this.loadKeys();
    return this._keys.has(key);
  }
  newKey(): string {
    let lastKey =
      this._keys.size === 0
        ? "board00000"
        : Array.from(this.keys.values()).pop();
    let lastInt = parseInt(lastKey!.substring(5));
    return `board${`00000${lastInt + 1}`.slice(-5)}`;
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
