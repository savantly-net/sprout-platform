import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContentTemplateComponent } from './content-template.component';
import { ContentTemplateEditorComponent } from './content-template-editor/content-template-editor.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    RouterModule.forChild([
      {
        path: 'content-template',
        component: ContentTemplateComponent
      },
      {
        path: 'content-template-editor',
        component: ContentTemplateEditorComponent
      }
    ])
  ],
  declarations: [ContentTemplateComponent, ContentTemplateEditorComponent],
  exports: [ContentTemplateComponent, ContentTemplateEditorComponent],
  providers: []
})
export class ContentTemplateModule { }
