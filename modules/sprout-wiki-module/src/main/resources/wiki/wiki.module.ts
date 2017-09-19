import { WikiComponent } from './wiki.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [WikiComponent],
  declarations: [WikiComponent],
  providers: []
})
export class WikiModule { }
