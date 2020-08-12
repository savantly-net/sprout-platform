import { ContentFieldModule } from '../content-field/content-field.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentTypesEditorComponent } from './content-types-editor/content-types-editor.component';
import { ContentTypesComponent } from './content-types.component';
import { ContentTypesService } from './content-types.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    ContentFieldModule,
    RouterModule.forChild([
      {
        path: 'content-type',
        component: ContentTypesComponent
      },
      {
        path: 'content-type-editor',
        component: ContentTypesEditorComponent
      }
    ])
  ],
  exports: [],
  declarations: [ContentTypesComponent, ContentTypesEditorComponent],
  providers: []
})
export class ContentTypesModule { }
