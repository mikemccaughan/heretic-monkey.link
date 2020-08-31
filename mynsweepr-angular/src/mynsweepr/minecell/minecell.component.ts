import { Component, OnInit, Input } from '@angular/core';
import { MynsweeprService } from '../mynsweepr.service';
import { Direction } from '../classes/direction';
import { BoardState, Minecell } from '../classes';

@Component({
  selector: 'app-minecell',
  templateUrl: './minecell.component.html',
  styleUrls: ['./minecell.component.sass']
})
export class MinecellComponent implements OnInit {
  @Input()
  public cell: Minecell;

  private board: BoardState;

  constructor(private boardSvc: MynsweeprService) {
    this.boardSvc.board.subscribe(board => { this.board = board; this.updateState(); });
  }

  ngOnInit() {
  }

  updateState() {
    // get currrent cell
    if (this.cell) {
      if (this.board.mineboard.activeCoords.x === this.cell.x &&
        this.board.mineboard.activeCoords.y === this.cell.y &&
        !this.cell.isActive) {
        this.boardSvc.activateCell(this.board, this.cell);
      }
    }
  }

  cellClick(event: MouseEvent, cell: Minecell) {
    event.preventDefault();
    this.boardSvc.activateCell(this.board, cell);
    this.boardSvc.showCell(this.board, cell);
  }

  cellDblClick(event: MouseEvent, cell: Minecell) {
    event.preventDefault();
    this.boardSvc.activateCell(this.board, cell);
    this.boardSvc.showSurroundingCells(this.board, cell);
  }

  cellRightClick(event: MouseEvent, cell: Minecell) {
    event.preventDefault();
    this.boardSvc.activateCell(this.board, cell);
    if (cell.isHidden) {
      this.boardSvc.flagCell(this.board, cell);
    }
  }

  cellKeyup(event: KeyboardEvent, cell: Minecell) {
    event.preventDefault();
    this.boardSvc.activateCell(this.board, cell);
    switch (event.key) {
      case ' ':
      case 'Space':
      case 'Enter':
        this.boardSvc.showCell(this.board, cell);
        break;
      case 'f':
      case 'F':
      case 'Add':
        if (cell.isHidden) {
          this.boardSvc.flagCell(this.board, cell);
        }
        break;
      case 'r':
      case 'R':
      case 'Subtract':
        this.boardSvc.showSurroundingCells(this.board, cell);
        break;
      case 'w':
      case 'W':
      case 'ArrowUp':
      case 'Up':
      case '8':
        this.boardSvc.moveActiveCell(this.board, Direction.Up);
        break;
      case 'a':
      case 'A':
      case 'ArrowLeft':
      case 'Left':
      case '4':
        this.boardSvc.moveActiveCell(this.board, Direction.Left);
        break;
      case 'd':
      case 'D':
      case 'ArrowRight':
      case 'Right':
      case '6':
        this.boardSvc.moveActiveCell(this.board, Direction.Right);
        break;
      case 's':
      case 'S':
      case 'ArrowDown':
      case 'Down':
      case '2':
        this.boardSvc.moveActiveCell(this.board, Direction.Down);
        break;
    }
  }
}
