import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentFieldComponent } from './content-field.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ContentFieldComponent],
  declarations: [ContentFieldComponent],
  providers: []
})
export class ContentFieldModule { }
