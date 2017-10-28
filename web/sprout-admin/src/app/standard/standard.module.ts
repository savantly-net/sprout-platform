import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceLocator } from './service-locator';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FilterPipe],
  providers: [ServiceLocator],
  exports: [FilterPipe]
})
export class StandardModule { }
