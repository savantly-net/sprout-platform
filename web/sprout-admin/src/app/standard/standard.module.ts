import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceLocator } from './service-locator';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ServiceLocator]
})
export class StandardModule { }
