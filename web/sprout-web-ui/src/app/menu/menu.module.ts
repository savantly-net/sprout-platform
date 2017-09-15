import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityModule } from '../security/security.module';
import { MaterialModule } from '../material/material.module';
import { MenuService } from './menu.service';
import { MenuComponent } from './menu.component';

@NgModule({
  imports: [
    CommonModule,
    SecurityModule,
    MaterialModule
  ],
  exports: [MenuComponent],
  declarations: [MenuComponent],
  providers: [MenuService]
})
export class MenuModule { }
