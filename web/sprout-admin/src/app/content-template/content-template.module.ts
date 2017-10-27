import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContentTemplateComponent } from './content-template.component';
import { ContentTemplateService } from './content-template.service';
import { ContentTemplateEditorComponent } from './content-template-editor/content-template-editor.component';
import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule
  ],
  declarations: [ContentTemplateComponent, ContentTemplateEditorComponent],
  providers: [ContentTemplateService]
})
export class ContentTemplateModule { }
