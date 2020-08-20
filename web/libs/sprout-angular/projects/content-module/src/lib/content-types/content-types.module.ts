import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContentFieldModule } from '../content-field/content-field.module';
import { routes } from './content-type.route';
import { ContentTypeEditorBodyField, ContentTypesEditorComponent } from './content-types-editor/content-types-editor.component';
import { ContentTypesComponent } from './content-types.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
    ContentFieldModule
  ],
  exports: [ContentTypesComponent, ContentTypesEditorComponent, ContentTypeEditorBodyField],
  declarations: [ContentTypesComponent, ContentTypesEditorComponent, ContentTypeEditorBodyField],
  providers: []
})
export class ContentTypesModule { }
