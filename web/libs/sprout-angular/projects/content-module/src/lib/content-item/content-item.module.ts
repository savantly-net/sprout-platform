import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FieldTypeModule } from '../field-type/field-type.module';
import { StandardModule } from '../standard/standard.module';
import { ContentItemBrowserDialogComponent, ContentItemBrowserDialogContent } from './content-item-browser-dialog/content-item-browser-dialog.component';
import { ContentItemEditorEmbeddedComponent } from './content-item-editor-embedded/content-item-editor-embedded.component';
import { ContentItemEditorComponent } from './content-item-editor/content-item-editor.component';
import { ContentItemComponent } from './content-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    StandardModule,
    FieldTypeModule,
    RouterModule.forChild([
      {
        path: 'content-item',
        component: ContentItemComponent
      },
      {
        path: 'content-item-editor',
        component: ContentItemEditorComponent
      }
    ])
  ],
  exports: [FieldTypeModule,
    ContentItemComponent, 
    ContentItemEditorComponent, 
    ContentItemEditorEmbeddedComponent, 
    ContentItemBrowserDialogComponent, 
    ContentItemBrowserDialogContent],
  declarations: [ContentItemComponent, 
    ContentItemEditorComponent, 
    ContentItemEditorEmbeddedComponent, 
    ContentItemBrowserDialogComponent, 
    ContentItemBrowserDialogContent],
  providers: [],
  entryComponents: [ContentItemBrowserDialogComponent]
})
export class ContentItemModule { }
