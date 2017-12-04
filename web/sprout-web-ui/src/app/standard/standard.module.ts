import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceLocator } from './service-locator';
import { FilterPipe } from './pipes/filter.pipe';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FilterPipe],
  providers: [ServiceLocator, HttpClient],
  exports: [FilterPipe, HttpClientModule]
})
export class StandardModule { }
