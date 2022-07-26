import { Temporal } from './temporal';

export interface IMineCell {
  value?: number;
  index?: number;
  key?: string;
  x?: number;
  y?: number;
  hidden?: boolean;
  flag?: boolean;
  clickCount?: number;
}
export interface IBoard {
  difficulty: string;
  width: number;
  height: number;
  cells: IMineCell[];
}
export class Board implements IBoard {
  difficulty: string;
  width: number;
  height: number;
  cells: IMineCell[];
  private preboard: number[][] = [];
  constructor();
  constructor(width: string | number, height: string | number);
  constructor(board: IBoard);
  constructor(
    boardOrWidth?: IBoard | string | number,
    height?: string | number
  ) {
    let board: IBoard = { difficulty: "9", width: 9, height: 9, cells: [] };
    if (boardOrWidth?.hasOwnProperty("width")) {
      board = boardOrWidth as IBoard;
    }
    if (boardOrWidth != null && typeof height !== "undefined") {
      board = {
        difficulty:
          +boardOrWidth === 9 && +height === 9
            ? "9"
            : +boardOrWidth === 16 && +height === 16
              ? "16"
              : +boardOrWidth === 30 && +height === 16 ? '30' : '?',
        width: +boardOrWidth,
        height: +height,
        cells: []
      };
    }
    this.difficulty = board.difficulty;
    this.width = board.width;
    this.height = board.height;
    this.cells = board.cells;
  }
  exportBoard(): string {
    return JSON.stringify(this);
  }
  importBoard(boardJson: string) {
    const board = JSON.parse(boardJson);
    this.width = board.width;
    this.height = board.height;
    this.cells = board.cells;
    this.sortCells();
  }
  private sortCells(): void {
    const isNotSorted = this.cells.some((c, i) => c.index !== i);
    if (isNotSorted) {
      this.cells = this.cells.sort((a, b) => (a.index || 0) - (b.index || 0));
    }
  }
  private static createCell(
    x: number,
    y: number,
    value: number,
    index: number,
    clickCount?: number,
    hidden?: boolean,
    flag?: boolean
  ): IMineCell {
    hidden = typeof hidden === "boolean" ? hidden : true;
    flag = typeof flag === "boolean" ? flag : false;
    let key = `${x}.${y}.${value}`;
    return {
      key: key,
      value: value,
      x: x,
      y: y,
      index: index,
      clickCount: clickCount || 0,
      hidden: hidden,
      flag: flag
    };
  }
  private initPreboard(): void {
    this.preboard = Array.from(new Array(this.height), (v, i) => new Array(this.width).fill(0));

    const pb: number[][] = [];
    for (let y = 0; y < this.height; y++) {
      pb[y] = [];
      for (let x = 0; x < this.width; x++) {
        pb[y][x] = 0;
      }
    }


  }
  private populatePreboard(): void {
    let cellCount = this.width * this.height;
    let mineCount = Math.floor(cellCount / 6);
    let value = -(mineCount * 2);
    let isBetween = function (value: number, min: number, max: number): boolean {
      return value >= min && value <= max;
    };
    for (let i = 0; i < mineCount; i++) {
      let x: number, y: number;
      while (true) {
        x = Math.floor(Math.random() * this.width);
        y = Math.floor(Math.random() * this.height);
        if (0 <= this.preboard[y][x]) {
          break;
        }
      }
      for (let m = -1; m < 2; m++) {
        for (let n = -1; n < 2; n++) {
          if (n === 0 && m === 0) {
            this.preboard[y][x] = value;
          } else if (
            isBetween(y + n, 0, this.height - 1) &&
            isBetween(x + m, 0, this.width - 1)
          ) {
            this.preboard[y + n][x + m]++;
          }
        }
      }
    }
  }
  private buildCells(): void {
    this.cells = [];
    let cellIndex = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.cells[cellIndex] = Board.createCell(
          x,
          y,
          this.preboard[y][x],
          cellIndex
        );
        cellIndex++;
      }
    }
  }
  public buildBoard(): void {
    this.cells = [];
    this.initPreboard();
    this.populatePreboard();
    this.buildCells();
    this.sortCells();
  }
  public static getRemaining(cells: IMineCell[]): number {
    let mines = cells.filter(cell => (cell.value || 0) < 0 && !cell.flag);
    return mines.length;
  }
}
export class Utils {
  static areEqual(a: any, b: any, deep: boolean): boolean {
    if (Object.is(a, b)) {
      return true;
    }
    if (typeof a !== typeof b) {
      return false;
    }
    switch (typeof a) {
      case 'object':
        if (a instanceof Date && b instanceof Date) {
          return a.valueOf() === b.valueOf();
        } else if (Temporal && (
          a instanceof Temporal.PlainDateTime ||
          a instanceof Temporal.ZonedDateTime ||
          a instanceof Temporal.Instant ||
          b instanceof Temporal.PlainDateTime ||
          b instanceof Temporal.ZonedDateTime ||
          b instanceof Temporal.Instant
        )) {
          if (a instanceof Date && (
            b instanceof Temporal.PlainDateTime ||
            b instanceof Temporal.ZonedDateTime ||
            b instanceof Temporal.Instant
          )) {
            return a.valueOf() === b.valueOf();
          } else if (b instanceof Date && (
            a instanceof Temporal.PlainDateTime ||
            a instanceof Temporal.ZonedDateTime ||
            a instanceof Temporal.Instant
          )) {
            return a.valueOf() === b.valueOf();
          } else if ((
            a instanceof Temporal.PlainDateTime ||
            a instanceof Temporal.ZonedDateTime ||
            a instanceof Temporal.Instant
          ) && (
              b instanceof Temporal.PlainDateTime ||
              b instanceof Temporal.ZonedDateTime ||
              b instanceof Temporal.Instant
            )) {
            return a.valueOf() === b.valueOf();
          }
        } else if (Array.isArray(a) && Array.isArray(b)) {
          if (a.length !== b.length) {
            return false;
          }
          // Array positions may differ if deep == false
          return deep ?
            a.every((elA, i) => Utils.areEqual(elA, b[i], deep)) :
            a.every((elA) => b.some((elB) => Utils.areEqual(elA, elB, deep)));
        } else if (a instanceof RegExp && b instanceof RegExp) {
          // There are edge cases where this would not work
          return a.toString() === b.toString(); 
        } else if (a !== null && b !== null) {
          const entriesA = Object.entries(a);
          const entriesB = Object.entries(b);
          // if a primitive is wrapped in an object (e.g. Object(1)), Object.entries(obj) returns [].
          if (entriesA.length === 0 && entriesB.length === 0) {
            // The primitive value can be retrieved via valueOf()
            const valueA = a.valueOf();
            const valueB = b.valueOf();
            return Utils.areEqual(valueA, valueB, deep);
          }
          return Utils.areEqual(entriesA, entriesB, deep);
        } else {
          return false;
        }
        break;
      case 'bigint':
        // bigint support in Object.is is unknown
        return a === b;
        case 'symbol':
          // Symbols are like objects; they use reference equality, but they only have
          // one property.
          return a.description === b.description;
    }
    return false;
  }
}