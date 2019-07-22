import { EventEmitter } from '@angular/core';

export class Minecell {
  isHiddenChanged: EventEmitter<Minecell>;
  private _isHidden: boolean;
  public get isHidden(): boolean {
    return this._isHidden;
  }
  public set isHidden(value: boolean) {
    if (this._isHidden !== value) {
      this._isHidden = value;
      this.isHiddenChanged && this.isHiddenChanged.emit(this);
    }
  }

  hasFlagChanged: EventEmitter<Minecell>;
  private _hasFlag: boolean;
  public get hasFlag(): boolean {
    return this._hasFlag;
  }
  public set hasFlag(value: boolean) {
    if (this._hasFlag !== value) {
      this._hasFlag = value;
      this.hasFlagChanged && this.hasFlagChanged.emit(this);
    }
  }

  index?: number;
  value?: number;
  x?: number;
  y?: number;
  isActive?: boolean;
  get nearby(): number {
    return this.value >= 0 ? this.value : null;
  }
  get hasMine(): boolean {
    return this.value < 0;
  }
  constructor(cell?: Partial<Minecell>) {
    if (cell) {
      this.isHidden = typeof cell.isHidden === 'boolean' ? cell.isHidden : true;
      this.hasFlag = typeof cell.hasFlag === 'boolean' ? cell.hasFlag : false;
      this.index = cell.index;
      this.value = cell.value;
      this.x = cell.x;
      this.y = cell.y;
    }
    this.isHiddenChanged = new EventEmitter<Minecell>();
    this.hasFlagChanged = new EventEmitter<Minecell>();
  }
  get classes(): { [key: string]: boolean } {
    return {
      cell: true,
      hidden: this.isHidden,
      flag: this.hasFlag,
      active: this.isActive,
      nearby: !!this.nearby && !this.hasFlag,
      [`nearby-${this.nearby}`]: !!this.nearby,
      mine: this.hasMine && !this.hasFlag
    };
  }
}
