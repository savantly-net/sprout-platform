import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldTypeComponent } from './field-type.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { JsonEditorModule } from '@savantly/ngx-jsoneditor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    CKEditorModule,
    LMarkdownEditorModule,
    JsonEditorModule
  ],
  exports: [ FieldTypeComponent ],
  declarations: [ FieldTypeComponent ]
})
export class FieldTypeModule {}
