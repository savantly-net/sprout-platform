import { AppMenuModule } from './app-menu/app-menu.module';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { ContentItemModule } from './content-item/content-item.module';
import { ContentTemplateModule } from './content-template/content-template.module';
import { ContentTypesModule } from './content-types/content-types.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { MenuModule } from './menu/menu.module';
import { ServiceLocator } from './standard/service-locator';
import { WebPageModule } from './web-page/web-page.module';
import { UserModule } from './user/user.module';
import { FileBrowserComponent } from './file-browser/file-browser.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FileBrowserComponent
  ],
  imports: [
    BrowserModule,
    routing,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    MenuModule,
    AppMenuModule,
    ContentTemplateModule,
    ContentTypesModule,
    ContentItemModule,
    WebPageModule,
    UserModule,
    AppSettingsModule
  ],
  exports: [MaterialModule, MenuModule],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor (injector: Injector) {
    ServiceLocator.injector = injector;
  }
}

