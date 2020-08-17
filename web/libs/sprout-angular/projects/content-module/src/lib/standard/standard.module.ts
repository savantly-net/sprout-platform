import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';
import { AbstractNgModelComponent } from './components/abstract-ng-model-component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FilterPipe, AbstractNgModelComponent],
  providers: [],
  exports: [FilterPipe, AbstractNgModelComponent]
})
export class StandardModule { }
