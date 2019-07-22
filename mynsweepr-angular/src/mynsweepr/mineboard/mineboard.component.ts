import { Component, OnInit, Input } from '@angular/core';
import { Minecell, Mineboard, BoardState } from '../classes';
import { MynsweeprService } from '../mynsweepr.service';
import { Utils } from '../classes/utils';

@Component({
  selector: 'app-mineboard',
  templateUrl: './mineboard.component.html',
  styleUrls: ['./mineboard.component.sass']
})
export class MineboardComponent implements OnInit {
  @Input()
  mineboard: Mineboard;

  private board: BoardState;

  get classes(): { [key: string]: boolean } {
    const classes = {
      'mineboard': true,
      'type-9': false,
      'type-16': false,
      'type-30': false
    };
    if (this.mineboard && this.mineboard.difficulty && this.mineboard.difficulty.type) {
      classes[`type-${this.mineboard.difficulty.type}`] = true;
      if (this.mineboard.difficulty.type === '?' && this.mineboard.difficulty.width) {
        Utils.redefineClass('type-\\?', `grid-template-columns: ${'min-content '.repeat(this.mineboard.difficulty.width)};`);
      }
    }
    return classes;
  }

  constructor(private boardSvc: MynsweeprService) {
    this.boardSvc.board.subscribe(board => this.board = board);
  }

  ngOnInit() {
  }
}
