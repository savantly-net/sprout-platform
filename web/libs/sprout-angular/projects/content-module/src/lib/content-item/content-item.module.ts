import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FieldTypeModule } from '../field-type/field-type.module';
import { StandardModule } from '../standard/standard.module';
import { ContentItemBrowserDialogComponent, ContentItemBrowserDialogContent } from './content-item-browser-dialog/content-item-browser-dialog.component';
import { ContentItemEditorComponent } from './content-item-editor/content-item-editor.component';
import { ContentItemComponent } from './content-item.component';
import { contentItemRoutes } from './content-item.route';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    StandardModule,
    FieldTypeModule,
    RouterModule.forChild(contentItemRoutes)
  ],
  exports: [FieldTypeModule,
    ContentItemComponent, 
    ContentItemEditorComponent,
    ContentItemBrowserDialogComponent, 
    ContentItemBrowserDialogContent],
  declarations: [ContentItemComponent, 
    ContentItemEditorComponent,
    ContentItemBrowserDialogComponent, 
    ContentItemBrowserDialogContent],
  providers: [],
  entryComponents: [ContentItemBrowserDialogComponent]
})
export class ContentItemModule { }
