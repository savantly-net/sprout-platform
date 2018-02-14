import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StandardModule } from '../standard/standard.module';

const routes: Routes = [];
export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  exports: [
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    StandardModule
  ],
  declarations: [],
  providers: [ {provide: APP_BASE_HREF, useValue: '/'} ]
})
export class ComponentTestModule { }
