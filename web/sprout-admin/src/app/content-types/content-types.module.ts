import { ContentFieldModule } from '../content-field/content-field.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ContentTypesEditorComponent } from './content-types-editor/content-types-editor.component';
import { ContentTypesComponent } from './content-types.component';
import { ContentTypesService } from './content-types.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
    ContentFieldModule
  ],
  exports: [MaterialModule],
  declarations: [ContentTypesComponent, ContentTypesEditorComponent],
  providers: [ContentTypesService]
})
export class ContentTypesModule { }
