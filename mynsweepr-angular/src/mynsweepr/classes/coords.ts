import { EventEmitter } from '@angular/core';

export class Coords {
  public coordsChanged: EventEmitter<Coords>;
  public xChanged: EventEmitter<number>;
  private xField: number;
  public get x(): number {
    return this.xField;
  }
  public set x(value: number) {
    if (this.xField !== value) {
      this.xField = value;
      if (this.xChanged) {
        this.xChanged.emit(value);
        this.coordsChanged.emit(this);
      }
    }
  }

  public yChanged: EventEmitter<number>;
  private yField: number;
  public get y(): number {
    return this.yField;
  }
  public set y(value: number) {
    if (this.yField !== value) {
      this.yField = value;
      if (this.yChanged) {
        this.yChanged.emit(value);
        this.coordsChanged.emit(this);
      }
    }
  }

  constructor(x?: number, y?: number) {
    this.xChanged = new EventEmitter<number>();
    this.yChanged = new EventEmitter<number>();
    this.coordsChanged = new EventEmitter<Coords>();
    this.xField = x;
    this.yField = y;
  }
}
