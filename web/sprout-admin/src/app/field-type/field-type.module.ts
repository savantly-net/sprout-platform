import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldTypeComponent } from './field-type.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { Ng4JsonEditorModule } from 'angular4-jsoneditor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
    CKEditorModule,
    LMarkdownEditorModule,
    Ng4JsonEditorModule
  ],
  exports: [ FieldTypeComponent, FormsModule, ReactiveFormsModule, MaterialModule, CKEditorModule ],
  declarations: [ FieldTypeComponent ]
})
export class FieldTypeModule {}
