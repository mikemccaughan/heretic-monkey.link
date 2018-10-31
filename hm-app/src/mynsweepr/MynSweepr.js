import React, { Component } from 'react';
import Utility from '../utility';
import DifficultySelector from './DifficultySelector';
import MineBoard from './MineBoard';
import Scoreboard from './Scoreboard';
import './MynSweepr.css';

export default class MynSweepr extends Component {
  constructor(props) {
    super(props);
    this.handleDifficultyChanged = this.difficultyChanged.bind(this);
    this.handleWidthChanged = this.widthChanged.bind(this);
    this.handleHeightChanged = this.heightChanged.bind(this);
    this.handleBack = this.back.bind(this);
    this.handleMinesRemainingChanged = this.minesRemainingChanged.bind(this);
    this.handleFlagCell = this.flagCell.bind(this);
    this.handleCellReveal = this.revealCell.bind(this);
    this.handleCellRevealNearby = this.revealNearby.bind(this);
    this.handleLoss = this.lost.bind(this);
    this.handleConfirm = this.confirm.bind(this);
    this.defaultState = {
      difficulty: '9',
      width: 9,
      height: 9,
      minesRemaining: 0,
      won: false,
      lost: false,
      cells: this.initializeBoard(9, 9),
      totalClickCount: 0
    };
    this.state = Object.assign({}, this.defaultState);
    this.scoreboard = null;
  }

  init(options) {
    const { difficulty, width, height } = options;
    const cells = this.initializeBoard(width, height);
    if (typeof difficulty !== 'undefined') {
      this.setState(
        {
          ...this.defaultState,
          difficulty: difficulty || '?',
          width: width,
          height: height,
          cells: cells
        },
        this.minesRemainingChanged.bind(this)
      );
    } else if (width !== 'undefined') {
      this.setState(prevState => {
        let height = prevState.height;
        return {
          ...this.defaultState,
          difficulty: '?',
          width: width,
          height: height,
          cells: cells
        };
      }, this.minesRemainingChanged.bind(this));
    } else if (height !== 'undefined') {
      this.setState(prevState => {
        let width = prevState.width;
        return {
          ...this.defaultState,
          difficulty: '?',
          width: width,
          height: height,
          cells: cells
        };
      }, this.minesRemainingChanged.bind(this));
    }

    if (this.scoreboard) {
      this.scoreboard.handleStopClock();
    }
  }

  difficultyChanged(changeEvent) {
    let difficulty = parseInt(changeEvent.target.value, 10);
    let width = isNaN(difficulty) ? 30 : difficulty;
    let height = isNaN(difficulty) ? 16 : difficulty === 30 ? 16 : difficulty;
    this.init({ difficulty, width, height });
  }
  widthChanged(changeEvent) {
    let width = parseInt(changeEvent.target.value, 10);
    width = isNaN(width) ? 0 : width;
    this.init({ width });
  }
  heightChanged(changeEvent) {
    let height = parseInt(changeEvent.target.value, 10);
    height = isNaN(height) ? 0 : height;
    this.init({ height });
  }

  sortCells(cells) {
    const isNotSorted = cells.some((c, i) => c.index !== i);
    if (isNotSorted) {
      console.log(`not sorted - sorting cells`);
      return cells.sort((a, b) => a.index - b.index);
    }

    return cells;
  }
  updateCells(cells) {
    this.setState(
      { cells: [...this.sortCells(cells)] },
      this.minesRemainingChanged.bind(this)
    );
  }
  takeActionOnSurroundingCells(
    cell,
    action,
    conditional = cel => true,
    takeActionOnSelf = false,
    cells = this.state.cells
  ) {
    let minX = 0,
      maxX = this.state.width - 1;
    let minY = 0,
      maxY = this.state.height - 1;
    let startX = cell.x - 1 <= minX ? minX : cell.x - 1;
    let stopX = cell.x + 1 >= maxX ? maxX : cell.x + 1;
    let startY = cell.y - 1 <= minY ? minY : cell.y - 1;
    let stopY = cell.y + 1 >= maxY ? maxY : cell.y + 1;
    for (let cellX = startX; cellX <= stopX; cellX++) {
      for (let cellY = startY; cellY <= stopY; cellY++) {
        if (takeActionOnSelf || !(cellY === cell.y && cellX === cell.x)) {
          let cell = cells.find(c => c.x === cellX && c.y === cellY);
          if (conditional(cell)) {
            cells = this.sortCells(action(cell, this.sortCells(cells)));
          }
        }
      }
    }

    return this.sortCells(cells);
  }
  takeActionOnCell(cell, action, cells = this.state.cells) {
    cells = this.sortCells(cells);
    const cellsBefore = cell.index > 0 ? [...cells.slice(0, cell.index)] : [];
    const cellsAfter =
      cell.index + 1 < cells.length ? cells.slice(cell.index + 1) : [];
    return this.sortCells([...cellsBefore, action(cell), ...cellsAfter]);
  }

  showCell(cell) {
    return Object.assign({}, cell, { hidden: false });
  }
  showCellInCells(cell, cells = this.state.cells) {
    return this.takeActionOnCell(
      cell,
      this.showCell.bind(this),
      this.sortCells(cells)
    );
  }

  flag(cell) {
    return Object.assign({}, cell, { flag: !cell.flag });
  }
  flagCellInCells(cell, cells = this.state.cells) {
    return this.takeActionOnCell(
      cell,
      this.flag.bind(this),
      this.sortCells(cells)
    );
  }
  flagCell(cell) {
    this.maybeStartClock();
    this.updateCells(this.flagCellInCells(cell));
  }

  revealAllCells(cells) {
    for (let cell of this.sortCells(cells)) {
      cells = this.reveal(true, cell, this.sortCells(cells));
    }

    return this.sortCells(cells);
  }
  revealAround(revealingAll, cell, cells = this.state.cells) {
    return this.takeActionOnSurroundingCells(
      cell,
      this.reveal.bind(this, revealingAll),
      cel => !!cel,
      false,
      this.sortCells(cells)
    );
  }
  reveal(revealingAll, cell = null, cells = this.state.cells) {
    if (!cell) {
      return this.sortCells(cells);
    }
    let cellState = this.sortCells(cells)[cell.index];
    if (!cellState) {
      return this.sortCells(cells);
    }
    if (!cellState.hidden) {
      return this.sortCells(cells);
    }
    if (cellState.flag) {
      return this.sortCells(cells);
    }
    if (cell.value < 0) {
      cells = this.showCellInCells(cell, this.sortCells(cells));
      this.lost();
      if (!revealingAll) {
        cells = this.revealAllCells(this.sortCells(cells));
      }
    } else if (cell.value === 0) {
      cells = this.showCellInCells(cell, this.sortCells(cells));
      if (!revealingAll) {
        cells = this.revealAround(revealingAll, cell, this.sortCells(cells));
      }
    } else {
      cells = this.showCellInCells(cell, this.sortCells(cells));
    }

    return this.sortCells(cells);
  }
  revealNearby(cell, revealingAll = false, cells = this.state.cells) {
    if (cell.hidden || cell.value <= 0) {
      return this.sortCells(cells);
    }

    let flagCount = 0;
    cells = this.takeActionOnSurroundingCells(
      cell,
      (cel, cels) => {
        if (cel.flag) {
          flagCount++;
        }

        return cels;
      },
      cel => !!cel,
      false,
      this.sortCells(cells)
    );

    if (flagCount !== cell.value) {
      return this.sortCells(cells);
    }

    this.maybeStartClock();
    this.updateCells(
      this.sortCells(
        this.revealAround(revealingAll, cell, this.sortCells(cells))
      )
    );
  }
  revealCell(cell, revealingAll = false, cells = this.state.cells) {
    this.maybeStartClock();
    this.updateCells(this.reveal(revealingAll, cell, this.sortCells(cells)));
  }

  getFlaggedCells() {
    const count = Utility.count(this.state.cells, cel => cel.flag);
    return count;
  }
  getHiddenCells() {
    const count = Utility.count(this.state.cells, cel => cel.hidden);
    return count;
  }
  hasHiddenCells() {
    const count = Utility.count(
      this.state.cells,
      cel => cel.hidden && !cel.flag
    );
    return count > 0;
  }
  getMinesRemaining() {
    const count = Utility.count(
      this.state.cells,
      cel => cel.value < 0 && !cel.flag
    );
    return count;
  }
  minesRemainingChanged() {
    const remainingMines = this.getMinesRemaining();
    this.setState({ minesRemaining: remainingMines });
    if (remainingMines === 0 && !this.hasHiddenCells()) {
      this.won();
    }
  }
  createCell(x, y, value, index, clickCount, hidden, flag) {
    hidden = typeof hidden === 'boolean' ? hidden : true;
    flag = typeof flag === 'boolean' ? flag : false;
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
  initializeBoard(width, height) {
    width = typeof width === 'number' ? width : 9;
    height = typeof height === 'number' ? height : 9;

    let cellCount = width * height;
    let mineCount = Math.floor(cellCount / 6);
    let board = [];
    let cells = [];
    let cellIndex = 0;
    for (let y = 0; y < height; y++) {
      board[y] = [];
      for (let x = 0; x < width; x++) {
        board[y][x] = 0;
      }
    }
    let value = -(mineCount * 2);
    let isBetween = function(value, min, max) {
      return value >= min && value <= max;
    };
    for (let i = 0; i < mineCount; i++) {
      let x, y;
      while (true) {
        x = Math.floor(Math.random() * width);
        y = Math.floor(Math.random() * height);
        if (0 <= board[y][x]) {
          break;
        }
      }
      for (let m = -1; m < 2; m++) {
        for (let n = -1; n < 2; n++) {
          if (n === 0 && m === 0) {
            board[y][x] = value;
          } else if (
            isBetween(y + n, 0, height - 1) &&
            isBetween(x + m, 0, width - 1)
          ) {
            board[y + n][x + m]++;
          }
        }
      }
    }
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        cells[cellIndex] = this.createCell(x, y, board[y][x], cellIndex);
        cellIndex++;
      }
    }

    return this.sortCells(cells);
  }

  back() {
    this.props.parent.setState({ which: 0 });
  }
  won() {
    if (!this.state.won) {
      this.setState({ won: true });
      if (this.scoreboard) {
        this.scoreboard.handleStopClock();
      }
    }
  }
  lost() {
    if (!this.state.lost) {
      this.setState({ lost: true });
      if (this.scoreboard) {
        this.scoreboard.handleStopClock();
      }
    }
  }
  confirm() {
    this.init({
      difficulty: this.state.difficulty,
      width: this.state.width,
      height: this.state.height
    });
  }

  maybeStartClock() {
    if (this.state.totalClickCount === 0) {
      this.setState({ totalClickCount: this.state.totalClickCount + 1 });
      if (this.scoreboard) {
        this.scoreboard.handleStartClock();
      }
    }
  }

  render() {
    return (
      <div className="minesweeper">
        <a href="https://github.com/mikemccaughan/heretic-monkey.link">
          <img
            style={{ position: 'absolute', top: 0, right: 0, border: 0 }}
            src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
            alt="Fork me on GitHub"
          />
        </a>
        <button onClick={this.handleBack}>Back</button>
        <DifficultySelector
          difficulty={this.state.difficulty}
          width={this.state.width}
          height={this.state.height}
          difficultyChanged={this.handleDifficultyChanged}
          widthChanged={this.handleWidthChanged}
          heightChanged={this.handleHeightChanged}
        />
        <Scoreboard
          ref={scoreboard => (this.scoreboard = scoreboard)}
          minesRemaining={this.state.minesRemaining}
          clockValue={this.state.clockValue}
        />
        <MineBoard
          won={this.state.won}
          lost={this.state.lost}
          cells={this.state.cells}
          width={this.state.width}
          height={this.state.height}
          minesRemainingChanged={this.handleMinesRemainingChanged}
          flagCell={this.handleFlagCell}
          revealCell={this.handleCellReveal}
          revealNearby={this.handleCellRevealNearby}
          confirm={this.handleConfirm}
          startClock={this.handleStartClock}
        />
      </div>
    );
  }
}
