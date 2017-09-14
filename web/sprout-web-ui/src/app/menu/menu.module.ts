import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityModule } from '../security/security.module';
import { MenuService } from './menu.service';
import { MenuComponent } from './menu.component';

@NgModule({
  imports: [
    CommonModule,
    SecurityModule
  ],
  exports: [MenuComponent, MenuService],
  declarations: [MenuComponent]
})
export class MenuModule { }
