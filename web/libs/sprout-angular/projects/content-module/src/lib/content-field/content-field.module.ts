import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentFieldComponent } from './content-field.component';
import { ContentFieldEditorComponent } from './content-field-editor/content-field-editor.component';
import { AbstractContentFieldEditorComponent } from './content-field-editor/abstract-content-field.component';
import { StandardModule } from '../standard';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ContentFieldComponent, ContentFieldEditorComponent, AbstractContentFieldEditorComponent],
  declarations: [ContentFieldComponent, ContentFieldEditorComponent, AbstractContentFieldEditorComponent],
  providers: []
})
export class ContentFieldModule { }
