import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantEditorComponent } from './tenant-editor/tenant-editor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TenantListComponent, TenantEditorComponent]
})
export class TenantModule { }
