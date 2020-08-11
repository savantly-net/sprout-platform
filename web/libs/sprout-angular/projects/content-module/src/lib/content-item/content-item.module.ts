import { FieldTypeModule } from '../field-type/field-type.module';
import { StandardModule } from '../standard/standard.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentItemComponent } from './content-item.component';
import { ContentItemService } from './content-item.service';
import { ContentItemEditorComponent } from './content-item-editor/content-item-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { ContentItemBrowserDialogComponent, ContentItemBrowserDialogContent } from './content-item-browser-dialog/content-item-browser-dialog.component';
import { RouterModule } from '@angular/router';

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
  exports: [FieldTypeModule],
  declarations: [ContentItemComponent, ContentItemEditorComponent, ContentItemBrowserDialogComponent, ContentItemBrowserDialogContent],
  providers: [],
  entryComponents: [ContentItemBrowserDialogComponent]
})
export class ContentItemModule { }
