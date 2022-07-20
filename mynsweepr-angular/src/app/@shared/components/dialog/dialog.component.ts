import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener
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

  @HostListener('keyup', ['$event'])
  private dialogKeyup(event: KeyboardEvent) {
    if (event && event.key === 'Escape') {
      this.close();
    }
  }

  private previouslyFocused: Element | null;

  ngOnInit() {
    this.dialogService.register(this.id, this);
  }

  open() {
    this.previouslyFocused = document.activeElement;
    this.classes.show = true;
    this.element.nativeElement.querySelector('a[href],input,button,select').focus();
  }

  close() {
    let wasOpen = this.classes.show;
    this.classes.show = false;
    if (this.previouslyFocused && this.previouslyFocused instanceof HTMLElement) {
      this.previouslyFocused.focus();
    }
    if (wasOpen) {
      this.closed.emit(this.id);
    }
  }
}
