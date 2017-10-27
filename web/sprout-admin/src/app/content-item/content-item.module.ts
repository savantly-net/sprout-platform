import { MaterialModule } from '../material/material.module';
import { StandardModule } from '../standard/standard.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentItemComponent } from './content-item.component';
import { ContentItemService } from './content-item.service';
import { ContentItemEditorComponent } from './content-item-editor/content-item-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { ContentItemBrowserDialogComponent } from './content-item-browser-dialog/content-item-browser-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    StandardModule
  ],
  declarations: [ContentItemComponent, ContentItemEditorComponent, ContentItemBrowserDialogComponent],
  providers: [ContentItemService],
  entryComponents: [ContentItemBrowserDialogComponent]
})
export class ContentItemModule { }
