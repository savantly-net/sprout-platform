import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldTypeComponent } from './field-type.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule
  ],
  exports: [ FieldTypeComponent ],
  declarations: [ FieldTypeComponent ]
})
export class FieldTypeModule { }
