import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTypesComponent } from './content-types.component';
import { ContentTypesService } from './content-types.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ContentTypesComponent],
  providers: [ContentTypesService]
})
export class ContentTypesModule { }
