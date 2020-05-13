import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantEditorComponent } from './tenant-editor/tenant-editor.component';
import { TenantService } from './tenant.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [TenantListComponent, TenantEditorComponent],
  providers: [ TenantService ]
})
export class TenantModule { }
