import { Injectable } from '@angular/core';
import { BoardState } from './classes/board-state';
import { BehaviorSubject, Observable } from 'rxjs';
import { Direction } from './classes/direction';
import { Minecell } from './classes';

@Injectable({
  providedIn: 'root'
})
export class MynsweeprService {
  boardSource: BehaviorSubject<BoardState> = new BehaviorSubject<BoardState>(new BoardState());
  board: Observable<BoardState> = this.boardSource.asObservable();

  constructor() { }

  setBoard(board: BoardState) {
    this.boardSource.next(board);
  }

  setActiveCell(board: BoardState, x: number, y: number): void {
    const coords = board.mineboard.activeCoords;
    coords.x = x;
    coords.y = y;
    board.mineboard.activeCoords = coords;
    this.setBoard(board);
  }

  moveActiveCell(board: BoardState, direction: Direction): void {
    const coords = board.mineboard.activeCoords;
    if (!coords) return;
    const diff = board.difficulty;
    if (!diff) return;
    const maxX = diff.width;
    const maxY = diff.height;
    switch (direction) {
      case Direction.Down:
        if (coords.y < maxY - 1) {
          coords.y += 1;
        }
        break;
      case Direction.Left:
        if (coords.x > 0) {
          coords.x -= 1;
        }
        break;
      case Direction.Right:
        if (coords.x < maxX - 1) {
          coords.x += 1;
        }
        break;
      case Direction.Up:
        if (coords.y > 0) {
          coords.y -= 1;
        }
        break;
    }
    board.mineboard.activeCoords = coords;
    console.log('activeCoords: ', JSON.stringify(coords));
    this.setBoard(board);
  }

  activateCell(board: BoardState, cell: Minecell): void {
    if (cell.isActive) {
      return;
    }

    cell.isActive = true;
    this.setActiveCell(board, cell.x, cell.y);
    this.setBoard(board);
  }

  showCell(board: BoardState, cell: Minecell): void {
    if (!cell.isHidden) {
      return;
    }

    cell.isHidden = false;
    if (cell.nearby === 0) {
      // clear all surrounding cells to one level deep of nearby
      this.showSurroundingCells(board, cell);
    }

    if (cell.hasMine) {
      this.epicFail(board);
    }

    this.checkForWin(board);
    this.setBoard(board);
  }

  checkForWin(board: BoardState) {
    if (board.mineboard.cells.every(cell => (cell.hasFlag && cell.hasMine && cell.isHidden) || (!cell.isHidden && !cell.hasMine))) {
      board.status = 'won';
    }
  }

  epicFail(board: BoardState): void {
    board.mineboard.cells.filter(cell => cell.isHidden).forEach(cell => cell.isHidden = false);
    board.status = "lost";
    this.setBoard(board);
  }

  acknowledgedStatus(board: BoardState): void {
    if (['lost', 'won'].includes(board.status)) {
      board.mineboard.buildBoard();
    }

    board.status = null;
    this.setBoard(board);
  }

  flagCell(board: BoardState, cell: Minecell): void {
    board.mineboard.cells.find(cel => cel.index === cell.index).hasFlag = !cell.hasFlag;
    this.checkForWin(board);
    this.setBoard(board);
  }

  getSurroundingCells(board: BoardState, cell: Minecell): Minecell[] {
    const cells: Minecell[] = [];
    let next = this.up(board, cell.x, cell.y);
    if (next) {
      cells.push(next);
    }
    next = this.right(board, cell.x, cell.y);
    if (next) {
      cells.push(next);
    }
    next = this.down(board, cell.x, cell.y);
    if (next) {
      cells.push(next);
    }
    next = this.left(board, cell.x, cell.y);
    if (next) {
      cells.push(next);
    }
    next = this.upRight(board, cell.x, cell.y);
    if (next) {
      cells.push(next);
    }
    next = this.upLeft(board, cell.x, cell.y);
    if (next) {
      cells.push(next);
    }
    next = this.downLeft(board, cell.x, cell.y);
    if (next) {
      cells.push(next);
    }
    next = this.downRight(board, cell.x, cell.y);
    if (next) {
      cells.push(next);
    }
    return cells;
  }

  showSurroundingCells(board: BoardState, cell: Minecell): void {
    const surroundingCells = this.getSurroundingCells(board, cell);
    const flagCount = surroundingCells.filter(cel => cel.hasFlag).length;
    if (cell.nearby === 0 || cell.nearby === flagCount) {
      surroundingCells.forEach(cel => !cel.hasFlag && this.showCell(board, cel));
    }

    this.checkForWin(board);
    this.setBoard(board);
  }

  up(board: BoardState, x: number, y: number): Minecell | undefined {
    return board.mineboard.cellsByCoords[x][y - 1];
  }

  down(board: BoardState, x: number, y: number): Minecell | undefined {
    return board.mineboard.cellsByCoords[x][y + 1];
  }

  left(board: BoardState, x: number, y: number): Minecell | undefined {
    return board.mineboard.cellsByCoords[x - 1] && board.mineboard.cellsByCoords[x - 1][y];
  }

  right(board: BoardState, x: number, y: number): Minecell | undefined {
    return board.mineboard.cellsByCoords[x + 1] && board.mineboard.cellsByCoords[x + 1][y];
  }

  upRight(board: BoardState, x: number, y: number): Minecell | undefined {
    return board.mineboard.cellsByCoords[x + 1] && board.mineboard.cellsByCoords[x + 1][y - 1];
  }

  upLeft(board: BoardState, x: number, y: number): Minecell | undefined {
    return board.mineboard.cellsByCoords[x - 1] && board.mineboard.cellsByCoords[x - 1][y - 1];
  }

  downRight(board: BoardState, x: number, y: number): Minecell | undefined {
    return board.mineboard.cellsByCoords[x + 1] && board.mineboard.cellsByCoords[x + 1][y + 1];
  }

  downLeft(board: BoardState, x: number, y: number): Minecell | undefined {
    return board.mineboard.cellsByCoords[x - 1] && board.mineboard.cellsByCoords[x - 1][y + 1];
  }
}
