import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentItemComponent } from './content-item.component';
import { ContentItemService } from './content-item.service';
import { ContentItemEditorComponent } from './content-item-editor/content-item-editor.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [ContentItemComponent, ContentItemEditorComponent],
  providers: [ContentItemService]
})
export class ContentItemModule { }
