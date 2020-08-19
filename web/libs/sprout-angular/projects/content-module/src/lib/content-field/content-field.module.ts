import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AbstractContentFieldEditorComponent } from './content-field-editor/abstract-content-field.component';
import { ContentFieldEditorComponent } from './content-field-editor/content-field-editor.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ContentFieldEditorComponent, AbstractContentFieldEditorComponent],
  declarations: [ContentFieldEditorComponent, AbstractContentFieldEditorComponent],
  providers: []
})
export class ContentFieldModule { }
