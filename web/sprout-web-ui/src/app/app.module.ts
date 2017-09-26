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
import { MaterialModule } from './material/material.module';
import { AuthenticationService, AuthGaurdService,
  RoleGaurdService, SecurityMockService, SecurityService } from '@savantly/ngx-security';
import { MenuService, MenuModule } from '@savantly/ngx-menu';
import { SproutPluginRegistryService } from '@savantly/ngx-sprout-plugin'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    MaterialModule,
    MenuModule
  ],
  exports: [
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  providers: [
    ApiService,
    AuthenticationService, AuthGaurdService, RoleGaurdService, SecurityMockService, SecurityService,
    MenuService,
    SproutPluginRegistryService
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
