import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettingsComponent } from './app-settings.component';
import { AppSettingsService } from './app-settings.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forChild([])
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppSettingsComponent
  ],
  declarations: [
    AppSettingsComponent
  ],
  providers: [AppSettingsService]
})
export class AppSettingsModule { }
