import { Component, OnInit } from '@angular/core';
import { MynsweeprService } from './mynsweepr.service';
import { BoardState } from './classes/board-state';
import { DialogService } from '../app/@shared/components/dialog/dialog.service';

@Component({
  selector: 'app-mynsweepr',
  templateUrl: './mynsweepr.component.html',
  styleUrls: ['./mynsweepr.component.sass']
})
export class MynsweeprComponent implements OnInit {
  state: BoardState;

  constructor(private mynsweeprSvc: MynsweeprService, private dialogSvc: DialogService) {
    this.mynsweeprSvc.board.subscribe(state => {
      this.state = state;
      if (state.status) {
        switch (state.status) {
          case 'lost':
            this.dialogSvc.open('lost');
            break;
          case 'won':
            this.dialogSvc.open('won');
            break;
        }
      }
    });
  }

  closeDialog(id: string) {
    this.dialogSvc.close(id);
    this.mynsweeprSvc.acknowledgedStatus(this.state);
  }

  ngOnInit() {
  }

}
