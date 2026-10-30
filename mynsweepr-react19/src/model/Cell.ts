import { Utils } from "./Utils";

export class Cell {
  #isMine: boolean;
  #isRevealed: boolean;
  #isFlagged: boolean;
  #adjacentMines: number;
  #index: number;
  #x: number;
  #y: number;
  #onChange: undefined | ((cell: Cell) => void);

  constructor(cell: Partial<Cell>) {
    this.#isMine = cell.isMine ?? false;
    this.#isRevealed = cell.isRevealed ?? false;
    this.#isFlagged = cell.isFlagged ?? false;
    this.#adjacentMines = cell.adjacentMines ?? 0;
    this.#index = cell.index ?? 0;
    this.#x = cell.x ?? 0;
    this.#y = cell.y ?? 0;
    this.#onChange = cell.onChange;
  }

  get onChange(): undefined | ((cell: Cell) => void) {
    return this.#onChange;
  }
  set onChange(value: (cell: Cell) => void) {
    if (this.#onChange !== value) {
      this.#onChange = value;
    }
  }

  get isMine(): boolean {
    return this.#isMine;
  }
  set isMine(value: boolean) {
    if (this.#isMine !== value) {
      this.#isMine = value;
      if (Utils.isFunction(this.#onChange)) {
        this.#onChange(this);
      }
    }
  }

  get isRevealed(): boolean {
    return this.#isRevealed;
  }
  set isRevealed(value: boolean) {
    if (this.#isRevealed !== value) {
      this.#isRevealed = value;
      if (Utils.isFunction(this.#onChange)) {
        this.#onChange(this);
      }
    }
  }

  get isFlagged(): boolean {
    return this.#isFlagged;
  }
  set isFlagged(value: boolean) {
    if (this.#isFlagged !== value) {
      this.#isFlagged = value;
      if (Utils.isFunction(this.#onChange)) {
        this.#onChange(this);
      }
    }
  }

  get adjacentMines(): number {
    return this.#adjacentMines;
  }
  set adjacentMines(value: number) {
    if (this.#adjacentMines !== value) {
      this.#adjacentMines = value;
      if (Utils.isFunction(this.#onChange)) {
        this.#onChange(this);
      }
    }
  }

  get index(): number {
    return this.#index;
  }
  set index(value: number) {
    if (this.#index !== value) {
      this.#index = value;
      if (Utils.isFunction(this.#onChange)) {
        this.#onChange(this);
      }
    }
  }

  get x(): number {
    return this.#x;
  }
  set x(value: number) {
    if (this.#x !== value) {
      this.#x = value;
      if (Utils.isFunction(this.#onChange)) {
        this.#onChange(this);
      }
    }
  }

  get y(): number {
    return this.#y;
  }
  set y(value: number) {
    if (this.#y !== value) {
      this.#y = value;
      if (Utils.isFunction(this.#onChange)) {
        this.#onChange(this);
      }
    }
  }

  get isGood(): boolean {
    return (
      Utils.isGood(this.index, 0, Number.MAX_SAFE_INTEGER - 1) &&
      Utils.isGood(this.x, 0, this.index) &&
      Utils.isGood(this.y, 0, this.index)
    );
  }
}
