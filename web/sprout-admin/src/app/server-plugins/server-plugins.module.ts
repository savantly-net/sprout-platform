import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerPluginsComponent } from './server-plugins.component';
import { ServerPluginsService } from './server-plugins.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ServerPluginsComponent],
  providers: [ServerPluginsService],
  exports: [ServerPluginsComponent]
})
export class ServerPluginsModule { }
