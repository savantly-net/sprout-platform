import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MenuModule, MenuService } from '@savantly/ngx-menu';
import { SecurityModule, SecurityService } from '@savantly/ngx-security';
import { WikiModule } from '@savantly/sprout-wiki-plugin';
import { SproutPluginModule } from '@savantly/ngx-sprout-plugin';

export const menuServiceFactory1 = (_securityService: SecurityService) => {
  return new MenuService(_securityService);
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SproutPluginModule.forRoot(),
    SecurityModule,
    MenuModule,
    WikiModule
  ],
  exports: [],
  providers: [
    SecurityService,
    {
      provide: MenuService,
      useFactory: menuServiceFactory1,
      deps: [SecurityService]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
