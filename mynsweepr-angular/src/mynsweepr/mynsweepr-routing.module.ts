import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MynsweeprComponent } from './mynsweepr.component';

const mynsweeprRoutes: Routes = [
  {
    path: 'mynsweepr',
    component: MynsweeprComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(mynsweeprRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MynsweeprRoutingModule { }
