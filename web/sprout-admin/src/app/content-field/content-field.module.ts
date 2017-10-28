import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentFieldComponent } from './content-field.component';
import { ContentFieldService } from './content-field.service';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ContentFieldComponent],
  declarations: [ContentFieldComponent],
  providers: [ContentFieldService]
})
export class ContentFieldModule { }
