import { Injectable } from '@angular/core';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public components: { [key: string]: DialogComponent } = {};
  constructor() {}

  public register(id: string, component: DialogComponent): void {
    this.components[id] = component;
    this.components[id].closed.subscribe((closedId: string) => {

    });
  }

  public open(id: string) {
    // close all dialogs
    Object.keys(this.components).forEach(key => this.close(key));
    // open this one
    this.components[id].open();
  }
  public close(id: string) {
    this.components[id].close();
  }
}
