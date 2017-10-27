import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { StandardModule } from '../standard/standard.module';
import { PageContentService } from './content/page-content.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageService } from './page/page.service';
import { LayoutService } from './layout/layout.service';
import { LayoutListComponent } from './layout/layout-list/layout-list.component';
import { LayoutEditorComponent } from './layout/layout-editor/layout-editor.component';
import { PageListComponent } from './page/page-list/page-list.component';
import { PageEditorComponent } from './page/page-editor/page-editor.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { PageBrowserDialogComponent } from './page/page-browser-dialog/page-browser-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    StandardModule
  ],
  declarations: [LayoutListComponent, LayoutEditorComponent, PageListComponent, PageEditorComponent, PageBrowserDialogComponent],
  providers: [PageService, LayoutService, PageContentService],
  entryComponents: [PageBrowserDialogComponent]
})
export class WebPageModule { }
