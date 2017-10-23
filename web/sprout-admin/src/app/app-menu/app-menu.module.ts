import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AppMenuComponent } from './app-menu.component';
import { AppMenuService } from './app-menu.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [AppMenuComponent],
  providers: [AppMenuService],
  exports: [AppMenuComponent]
})
export class AppMenuModule { }
