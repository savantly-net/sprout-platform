import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';

import { FilterPipe } from './pipes/filter.pipe';
import { AbstractNgModelComponent } from './components/abstract-ng-model-component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FilterPipe, AbstractNgModelComponent],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
  exports: [FilterPipe, AbstractNgModelComponent]
})
export class StandardModule { }
