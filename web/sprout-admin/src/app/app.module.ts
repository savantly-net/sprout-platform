import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContentItemsModule } from './content-items/content-items.module';
import { ContentTemplateModule } from './content-template/content-template.module';
import { ContentTypesModule } from './content-types/content-types.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    MenuModule,
    ContentTemplateModule,
    ContentTypesModule,
    ContentItemsModule
  ],
  exports: [MaterialModule, MenuModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
