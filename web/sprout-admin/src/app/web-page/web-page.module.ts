import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { PageService } from './page/page.service';
import { LayoutService } from './layout/layout.service';
import { LayoutListComponent } from './layout/layout-list/layout-list.component';
import { LayoutEditorComponent } from './layout/layout-editor/layout-editor.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [PageComponent, LayoutListComponent, LayoutEditorComponent],
  providers: [PageService, LayoutService]
})
export class WebPageModule { }
