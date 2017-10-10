import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatButtonModule, MatIconModule, MatRippleModule,
  MatListModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    FlexLayoutModule
  ]
})
export class MaterialModule { }
