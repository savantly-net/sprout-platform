import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './menu.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forChild([])
  ],
  declarations: [MenuComponent],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
