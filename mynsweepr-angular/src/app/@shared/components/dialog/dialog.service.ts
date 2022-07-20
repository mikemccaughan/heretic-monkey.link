import { EventEmitter, Injectable } from '@angular/core';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public components: { [key: string]: DialogComponent } = {};

  public dialogClosed: EventEmitter<DialogComponent>;

  constructor() {
    this.dialogClosed = new EventEmitter<DialogComponent>();
  }

  public register(id: string, component: DialogComponent): void {
    if (id == null) {
      throw new Error("id must be provided to the DialogService's register method");
    }
    if (component == null) {
      throw new Error("component must be provided to the DialogService's register method");
    }
    this.components[id] = component;
    this.components[id].closed.subscribe((closedId: string) => {
      this.dialogClosed.emit(this.components[closedId]);
    });
  }

  public open(id: string) {
    // close all dialogs
    this.closeAllExcept(id);
    // open this one
    if (!Reflect.has(this.components, id)) {
      throw new Error(`A dialog with the id "${id}" was not registered with the dialog service. Registered ids: ${Object.keys(this.components)?.join(', ')}`);
    }
    this.components[id].open();
  }
  public close(id: string) {
    this.components[id].close();
  }
  public closeAll() {
    Object.keys(this.components).forEach(key => this.close(key));
  }
  public closeAllExcept(id: string) {
    Object.keys(this.components).filter(cid => cid !== id).forEach(key => this.close(key));
  }
}
