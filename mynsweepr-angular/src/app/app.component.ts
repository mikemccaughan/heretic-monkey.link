import { Component, HostListener } from '@angular/core';
import { DialogService } from './@shared/components/dialog/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'mynsweepr-angular';

  constructor(private dialogSvc: DialogService) {
  }

  @HostListener('keyup', ['$event'])
  appKeyup(event: KeyboardEvent) {
    event.preventDefault();
    if ((event.shiftKey && event.key === "/") || event.key === '?') {
      this.dialogSvc.open('keys');
    }
    if (event.key === 'Esc') {
      this.dialogSvc.closeAll();
    }
  }
  closeDialog(id: string) {
    this.dialogSvc.close(id);
  }
}
