import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FilterPipe],
  providers: [],
  exports: [FilterPipe]
})
export class StandardModule { }
