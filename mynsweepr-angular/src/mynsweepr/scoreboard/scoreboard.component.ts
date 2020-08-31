import { Component, OnInit, Input } from '@angular/core';
import { BoardState, Scoreboard } from '../classes';
import { MynsweeprService } from '../mynsweepr.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.sass']
})
export class ScoreboardComponent implements OnInit {
  @Input()
  public scoreboard: Scoreboard;
  public highscore: string;
  private board: BoardState;

  constructor(private boardSvc: MynsweeprService) {
    this.boardSvc.board.subscribe(board => this.board = board);
  }

  ngOnInit() {
  }

}
