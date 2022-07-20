import { Minecell } from './minecell';
import { EventEmitter } from '@angular/core';
import { Difficulty } from './difficulty';
import { Coords } from './coords';

export class Mineboard {
  remainingChanged: EventEmitter<number>;
  activeCoordsChanged: EventEmitter<Coords>;
  cells: Minecell[];
  cellsByCoords?: Minecell[][];
  difficulty: Partial<Difficulty>;
  private activeCoordsField: Coords;
  public get activeCoords(): Coords {
    return this.activeCoordsField;
  }
  public set activeCoords(value: Coords) {
    if (this.activeCoordsField.x !== value.x || this.activeCoordsField.y !== value.y) {
      this.activeCoordsField.x = value.x;
      this.activeCoordsField.y = value.y;
      if (this.activeCoordsChanged) {
        this.activeCoordsChanged.emit(this.activeCoords);
      }
    }
  }
  private cellsField: number[][];
  constructor() {
    this.remainingChanged = new EventEmitter<number>();
    this.activeCoordsField = new Coords();
    this.activeCoordsChanged = new EventEmitter<Coords>();
  }
  private initialize(): void {
    const maxY = this.difficulty.height || 9;
    const maxX = this.difficulty.width || 9;
    this.cellsField = [];
    this.cellsByCoords = [];
    for (let y = 0; y < maxY; y++) {
      this.cellsField[y] = [];
      for (let x = 0; x < maxX; x++) {
        this.cellsField[y][x] = 0;
        this.cellsByCoords[x] = this.cellsByCoords[x] ?? [];
        this.cellsByCoords[x][y] = this.cellsByCoords[x][y] ?? null;
      }
    }
  }
  private generate(): void {
    const maxY = this.difficulty.height || 9;
    const maxX = this.difficulty.width || 9;
    const cellCount = maxY * maxX;
    const mineCount = Math.floor(cellCount / 6);
    const value = -(mineCount * 2);
    const isBetween = (val: number, min: number, max: number): boolean => val >= min && val <= max;
    for (let i = 0; i < mineCount; i++) {
      let x: number;
      let y: number;
      while (true) {
        x = Math.floor(Math.random() * maxX);
        y = Math.floor(Math.random() * maxY);
        if (0 <= this.cellsField[y][x]) {
          break;
        }
      }
      for (let m = -1; m < 2; m++) {
        for (let n = -1; n < 2; n++) {
          if (n === 0 && m === 0) {
            this.cellsField[y][x] = value;
          } else if (isBetween(y + n, 0, maxY - 1) && isBetween(x + m, 0, maxX - 1)) {
            this.cellsField[y + n][x + m]++;
          }
        }
      }
    }
  }
  private buildCells(): void {
    const maxY = this.difficulty.height || 9;
    const maxX = this.difficulty.width || 9;
    this.cells = [];
    let cellIndex = 0;
    for (let y = 0; y < maxY; y++) {
      for (let x = 0; x < maxX; x++) {
        const cell = this.createCell({
          x,
          y,
          value: this.cellsField[y][x],
          index: cellIndex
        });
        this.cells[cellIndex] = cell;
        this.cellsByCoords[x][y] = cell;
        cellIndex++;
      }
    }
  }
  private sortCells(): void {
    const isNotSorted = this.cells.some((c, i) => c.index !== i);
    if (isNotSorted) {
      this.cells = this.cells.sort((a: Minecell, b: Minecell) => (a.index || 0) - (b.index || 0));
    }
  }
  private createCell(cell: Partial<Minecell>): Minecell {
    const newCell = new Minecell(cell);
    newCell.hasFlagChanged.subscribe(this.cellChanged.bind(this));
    newCell.isHiddenChanged.subscribe(this.cellChanged.bind(this));
    return newCell;
  }
  private cellChanged(cel: Minecell) {
    const minesRemaining = this.cells.filter(cell => cell.hasMine).length - this.cells.filter(cell => cell.hasFlag).length;
    this.remainingChanged.emit(minesRemaining);
  }
  public buildBoard(): void {
    this.initialize();
    this.generate();
    this.buildCells();
    this.sortCells();
  }
}
