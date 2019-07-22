import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MynsweeprComponent } from './mynsweepr.component';
import { DifficultyComponent } from './difficulty/difficulty.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { MineboardComponent } from './mineboard/mineboard.component';
import { MinecellComponent } from './minecell/minecell.component';
import { MynsweeprRoutingModule } from './mynsweepr-routing.module';
import { SharedModule } from '../app/@shared/shared.module';

@NgModule({
  declarations: [
    MynsweeprComponent, DifficultyComponent, ScoreboardComponent, MineboardComponent, MinecellComponent
  ],
  exports: [
    MynsweeprComponent, DifficultyComponent, ScoreboardComponent, MineboardComponent, MinecellComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MynsweeprRoutingModule
  ]
})
export class MynsweeprModule { }
