import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PageContentService } from './content/page-content.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageService } from './page/page.service';
import { LayoutService } from './layout/layout.service';
import { LayoutListComponent } from './layout/layout-list/layout-list.component';
import { LayoutEditorComponent } from './layout/layout-editor/layout-editor.component';
import { PageListComponent } from './page/page-list/page-list.component';
import { PageEditorComponent } from './page/page-editor/page-editor.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [LayoutListComponent, LayoutEditorComponent, PageListComponent, PageEditorComponent],
  providers: [PageService, LayoutService, PageContentService]
})
export class WebPageModule { }
