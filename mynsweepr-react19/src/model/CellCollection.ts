import { Cell } from "./Cell";
import { Difficulty } from "./Difficulty";
import { Utils } from "./Utils";

export class CellCollection extends Array<Cell> {
  #difficulty: Difficulty;
  #changed: ((cells: CellCollection) => CellCollection) | undefined;

  constructor(difficulty: Difficulty, ...cells: Array<Cell>) {
    super(
      ...cells
        .map((cel, idx) => {
          cel.index = idx;
          cel = CellCollection.setCoordsByIndexAndDiff(cel, difficulty);
          return cel;
        })
        .sort(CellCollection.sortByIndex),
    );
    this.#difficulty = difficulty;
  }

  get changed(): ((cells: CellCollection) => CellCollection) | undefined {
    return this.#changed;
  }
  set changed(value: ((cells: CellCollection) => CellCollection) | undefined) {
    if (this.#changed !== value) {
      this.#changed = value;
    }
  }

  static sortByIndex(a: Cell, b: Cell): number {
    return a.index - b.index;
  }
  static setCoordsByIndexAndDiff(cell: Cell, difficulty: Difficulty): Cell {
    const newCell = cell;
    newCell.x = Math.ceil(cell.index / difficulty.width);
    newCell.y = Math.ceil(cell.index / difficulty.height);
    return newCell;
  }
  add(cell: Cell): CellCollection {
    cell = CellCollection.setCoordsByIndexAndDiff(cell, this.#difficulty);
    const newCollection = new CellCollection(
      this.#difficulty,
      ...this.toSpliced(cell.index, 1, cell),
    );
    cell.onChange = (cel: Cell) => this.change(cel);
    if (Utils.isFunction(this.#changed)) {
      this.#changed(newCollection);
    }
    return newCollection;
  }
  remove(cell: Cell): CellCollection {
    const newCollection = new CellCollection(
        this.#difficulty, 
        ...this.toSpliced(cell.index, 1)
    );
    if (Utils.isFunction(this.#changed)) {
      this.#changed(newCollection);
    }
    return newCollection;
  }
  change(cell: Cell): CellCollection {
    const newCollection = new CellCollection(
      this.#difficulty,
      ...this.toSpliced(cell.index, 1, cell),
    );
    if (Utils.isFunction(this.#changed)) {
      this.#changed(newCollection);
    }
    return newCollection;
  }
  isGood() {
    return Utils.isGood(this.length, 1, 30 * 16) && this.every((cel: Cell) => cel.isGood);
  }
}
