import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ContentItemsModule } from './content-items/content-items.module';
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
    MaterialModule,
    MenuModule,
    ContentTypesModule,
    ContentItemsModule
  ],
  exports: [MaterialModule, MenuModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
