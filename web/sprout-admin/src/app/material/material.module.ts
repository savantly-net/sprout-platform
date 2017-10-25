import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatRippleModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatSelectModule,
  MatCheckboxModule,
  MatExpansionModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgcFloatButtonModule } from 'ngc-float-button';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    FlexLayoutModule,
    NgcFloatButtonModule
  ],
  providers: []
})
export class MaterialModule { }
