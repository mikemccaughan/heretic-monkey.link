import { EventEmitter } from '@angular/core';

export class Difficulty {
  typeChanged: EventEmitter<string>;
  private typeField: string;
  public get type(): string {
    return this.typeField;
  }
  public set type(value: string) {
    if (this.typeField !== value) {
      this.typeField = value;
      this.typeChanged.emit(value);
    }
  }

  widthChanged: EventEmitter<number>;
  private widthField: number;
  public get width(): number {
    return this.widthField;
  }
  public set width(value: number) {
    if (this.widthField !== value) {
      this.widthField = value;
      this.widthChanged.emit(value);
    }
  }

  heightChanged: EventEmitter<number>;
  private heightField: number;
  public get height(): number {
    return this.heightField;
  }
  public set height(value: number) {
    if (this.heightField !== value) {
      this.heightField = value;
      this.heightChanged.emit(value);
    }
  }

  constructor() {
    this.typeChanged = new EventEmitter<string>();
    this.widthChanged = new EventEmitter<number>();
    this.heightChanged = new EventEmitter<number>();
  }

  toJSON() {
    return JSON.stringify({
      type: this.type,
      width: this.width,
      height: this.height
    });
  }
}
