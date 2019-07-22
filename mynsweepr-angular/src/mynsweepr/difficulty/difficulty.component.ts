import { Component, OnInit, Input } from '@angular/core';
import { BoardState, Difficulty } from '../classes';
import { MynsweeprService } from '../mynsweepr.service';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.sass']
})
export class DifficultyComponent implements OnInit {
  @Input()
  public difficulty: Difficulty;

  private board: BoardState;

  constructor(private boardSvc: MynsweeprService) {
    this.boardSvc.board.subscribe(board => this.board = board);
  }

  ngOnInit() {
  }
}
