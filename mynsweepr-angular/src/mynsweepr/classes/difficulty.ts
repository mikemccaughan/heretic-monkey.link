import { EventEmitter } from '@angular/core';

export class Difficulty {
  typeChanged: EventEmitter<string>;
  private _type: string;
  public get type(): string {
    return this._type;
  }
  public set type(value: string) {
    if (this._type !== value) {
      this._type = value;
      this.typeChanged.emit(value);
    }
  }

  widthChanged: EventEmitter<number>;
  private _width: number;
  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    if (this._width !== value) {
      this._width = value;
      this.widthChanged.emit(value);
    }
  }

  heightChanged: EventEmitter<number>;
  private _height: number;
  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    if (this._height !== value) {
      this._height = value;
      this.heightChanged.emit(value);
    }
  }

  constructor() {
    this.typeChanged = new EventEmitter<string>();
    this.widthChanged = new EventEmitter<number>();
    this.heightChanged = new EventEmitter<number>();
  }
}
