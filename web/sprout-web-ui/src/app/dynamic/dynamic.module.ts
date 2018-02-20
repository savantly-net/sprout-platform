import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { DynamicBuilderService } from './dynamic-builder.service';
import { DynamicComponent, DynamicDirective } from './dynamic.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    LoaderComponent,
    DynamicComponent,
    DynamicDirective],
  providers: [DynamicBuilderService],
  entryComponents: [
    DynamicComponent,
    LoaderComponent
  ]
})
export class DynamicModule { }
