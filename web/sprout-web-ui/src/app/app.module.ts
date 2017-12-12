import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { AppMenuService } from './app-menu/app-menu.service';
import { ApiService } from './shared';
import { routing } from './app.routing';
import { ContextMenuComponent } from './contextMenu/contextMenu.component';
import { DynamicBuilderService } from './dynamic/dynamic-builder.service';
import { DynamicComponent } from './dynamic/dynamic.component';
import { MaterialModule } from './material/material.module';
import { SecurityMockService, SecurityModule, ISecurityService } from '@savantly/ngx-security';
import { SproutPluginModule } from '@savantly/ngx-sprout-plugin';
import { PageModule } from './page/page.module';
import { PluginsModule } from './plugins/plugins.module';
import { SettingsService } from './settings/settings.service';
import { StandardModule } from './standard/standard.module';
import { CommonModule } from '@angular/common';
import { MenuModule, MenuService } from '@savantly/ngx-menu';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    SecurityModule,
    SproutPluginModule.forRoot(),
    MaterialModule,
    MenuModule,
    PluginsModule,
    PageModule,
    StandardModule
  ],
  exports: [PluginsModule],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContextMenuComponent,
    AppMenuComponent,
    DynamicComponent
  ],
  providers: [
    ApiService,
    {provide: ISecurityService, useClass: SecurityMockService},
    {provide: MenuService, useClass: MenuService, deps: [ISecurityService]},
    AppMenuService, DynamicBuilderService,
    SettingsService
  ],
  entryComponents: [ DynamicComponent ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
