import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogService: DialogService,
    public element: ElementRef
  ) { }

  @Input()
  public id: string;
  @Input()
  public title: string;
  @Input()
  public classes: { [key: string]: boolean };
  @Output()
  public closed: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.dialogService.register(this.id, this);
  }

  open() {
    this.classes.show = true;
  }

  close() {
    this.classes.show = false;
    this.closed.emit(this.id);
  }
}
