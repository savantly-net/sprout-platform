import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdMenuModule, MdToolbarModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MdMenuModule,
    MdToolbarModule,
    MdButtonModule,
    FlexLayoutModule
  ],
  exports: [
    MdMenuModule,
    MdToolbarModule,
    MdButtonModule,
    FlexLayoutModule
  ],
  declarations: []
})
export class MaterialModule { }
