import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent implements OnInit {
  _id = '';
  get id(): string {
    if (!this._id || !this._id.length) {
      this._id = `popover-${Date.now()}`;
    }
    return this._id;
  }

  _text = 'Popover';
  @Input() set text(value: string) {
    this._text = value;
  }
  get text(): string {
    return this._text;
  }

  expanded = false;

  constructor() { }

  ngOnInit(): void {
  }
  togglePopup($event: Event) {
    const popover = document.getElementById(this.id);
    if (popover) {
      popover.hidden = !popover.hidden;
      this.expanded = !popover.hidden;
      if (this.expanded) {
        popover.removeAttribute('aria-hidden');
      } else {
        popover.setAttribute('aria-hidden', 'true');
      }
    }
  }
}
