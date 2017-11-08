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
import { AuthenticationService, AuthGaurdService,
  RoleGaurdService, SecurityMockService, SecurityModule, ISecurityService } from '@savantly/ngx-security';
import { SproutPluginModule } from '@savantly/ngx-sprout-plugin';
import { PageModule } from './page/page.module';
import { PluginsModule } from './plugins/plugins.module';
import { CommonModule } from '@angular/common';
import { MenuModule } from '@savantly/ngx-menu';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    SecurityModule.forRoot(new SecurityMockService),
    SproutPluginModule.forRoot(),
    MaterialModule,
    MenuModule.forRoot(),
    PluginsModule,
    PageModule
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
    AuthenticationService, AuthGaurdService, RoleGaurdService,
    SecurityMockService, AppMenuService, DynamicBuilderService
  ],
  entryComponents: [ DynamicComponent ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef,
    protected securityService: ISecurityService) {}
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
