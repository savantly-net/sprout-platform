import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ApiService } from './shared';
import { routing } from './app.routing';
import { ContextMenuComponent } from './contextMenu/contextMenu.component';
import { MaterialModule } from './material/material.module';
import { AuthenticationService, AuthGaurdService,
  RoleGaurdService, SecurityMockService, SecurityModule, SecurityService } from '@savantly/ngx-security';
import { MenuModule, MenuService } from '@savantly/ngx-menu';
import { SproutPluginModule } from '@savantly/ngx-sprout-plugin';
import { HeaderComponent } from './header/header.component'
import { PluginsModule } from './plugins/plugins.module';

const menuServiceFactory = (_securityService: SecurityService) => {
  return new MenuService(_securityService);
};


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    SecurityModule.forRoot(),
    SproutPluginModule.forRoot(),
    MaterialModule,
    MenuModule,
    PluginsModule
  ],
  exports: [PluginsModule],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    ContextMenuComponent
  ],
  providers: [
    ApiService,
    AuthenticationService, AuthGaurdService, RoleGaurdService,
    SecurityMockService,
    {
      provide: MenuService,
      useFactory: menuServiceFactory,
      deps: [SecurityService]
    }
  ],
  entryComponents: [],
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
