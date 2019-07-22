import { EventEmitter } from '@angular/core';

export class Coords {
  public xChanged: EventEmitter<number>;
  private _x: number;
  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    if (this._x !== value) {
      this._x = value;
      this.xChanged.emit(value);
    }
  }

  public yChanged: EventEmitter<number>;
  private _y: number;
  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    if (this._y !== value) {
      this._y = value;
      this.yChanged.emit(value);
    }
  }

  constructor() {
    this.xChanged = new EventEmitter<number>();
    this.yChanged = new EventEmitter<number>();
  }
}
