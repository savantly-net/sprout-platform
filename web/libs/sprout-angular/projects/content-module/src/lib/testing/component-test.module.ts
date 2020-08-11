import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxHalClientModule } from '@lagoshny/ngx-hal-client';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StandardModule } from '../standard/standard.module';
import { ExternalConfigurationService } from './external-configuration.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [];
export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    CommonModule,
    routing,
    NgxHalClientModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    StandardModule
  ],
  declarations: [],
  providers: [ 
    HttpClient,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService} 
  ]
})
export class ComponentTestModule { }
