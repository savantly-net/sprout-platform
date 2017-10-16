import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContentItemModule } from './content-item/content-item.module';
import { ContentTemplateModule } from './content-template/content-template.module';
import { ContentTypesModule } from './content-types/content-types.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { MenuModule } from './menu/menu.module';
import { ServiceLocator } from './standard/service-locator';
import { WebPageModule } from './web-page/web-page.module';

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
    ContentItemModule,
    WebPageModule
  ],
  exports: [MaterialModule, MenuModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor (injector: Injector) {
    ServiceLocator.injector = injector;
  }
}

