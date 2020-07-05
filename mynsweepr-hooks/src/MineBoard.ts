export interface IMineCell {
  val?: number;
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
export class MineBoard implements IBoard {
  private _difficulty: string = "9";
  private _width: number = 9;
  private _height: number = 9;
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
    if (boardOrWidth && boardOrWidth.hasOwnProperty("width")) {
      board = boardOrWidth as IBoard;
    }
    if (boardOrWidth && typeof height !== "undefined") {
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
  get difficulty(): string {
    return this._difficulty;
  }
  set difficulty(value: string) {
    if (this._difficulty !== value) {
      this._difficulty = value;
      if (value !== '?') {
        this.width = +value;
        this.height = value === '30' ? 16 : +value;
      }
    }
  }
  get width(): number {
    return this._width;
  }
  set width(value: number) {
    if (this._width !== value) {
      this._width = value;
    }
  }
  get height(): number {
    return this._height;
  }
  set height(value: number) {
    if (this._height !== value) {
      this._height = value;
    }
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
    val: number,
    index: number,
    clickCount?: number,
    hidden?: boolean,
    flag?: boolean
  ): IMineCell {
    hidden = typeof hidden === "boolean" ? hidden : true;
    flag = typeof flag === "boolean" ? flag : false;
    let key = `${x}.${y}.${val}`;
    return {
      key: key,
      val: val,
      x: x,
      y: y,
      index: index,
      clickCount: clickCount || 0,
      hidden: hidden,
      flag: flag
    };
  }
  private initPreboard(): void {
    this.preboard = [];
    for (let y = 0; y < this.height; y++) {
      this.preboard[y] = [];
      for (let x = 0; x < this.width; x++) {
        this.preboard[y][x] = 0;
      }
    }
  }
  private populatePreboard(): void {
    let cellCount = this.width * this.height;
    let mineCount = Math.floor(cellCount / 6);
    let val = -(mineCount * 2);
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
            this.preboard[y][x] = val;
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
        this.cells[cellIndex] = MineBoard.createCell(
          x,
          y,
          this.preboard[y][x],
          cellIndex
        );
        cellIndex++;
      }
    }
  }
  public buildBoard(callback?: (cells: IMineCell[]) => void): void {
    console.log(`building ${this.width}x${this.height} board...`);
    this.cells = [];
    this.initPreboard();
    this.populatePreboard();
    this.buildCells();
    this.sortCells();
    if (typeof callback === 'function') {
      callback(this.cells);
    }
  }
  public static getRemaining(cells: IMineCell[]): number {
    let mines = cells.filter(cell => (cell.val || 0) < 0 && !cell.flag);
    return mines.length;
  }
}
