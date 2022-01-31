import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yTrapDirective } from './a11y-trap.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [A11yTrapDirective],
  exports: [A11yTrapDirective]
})
export class DirectivesModule { }
