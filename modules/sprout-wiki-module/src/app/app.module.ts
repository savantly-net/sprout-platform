import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MenuModule, MenuService } from '@savantly/ngx-menu';
import { SecurityService, SecurityModule } from '@savantly/ngx-security';
import { WikiModule } from '@savantly/sprout-wiki-plugin';
import { SproutPluginRegistryService } from '@savantly/ngx-sprout-plugin';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    WikiModule,
    MenuModule,
    SecurityModule
  ],
  providers: [MenuService, SecurityService, SproutPluginRegistryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
