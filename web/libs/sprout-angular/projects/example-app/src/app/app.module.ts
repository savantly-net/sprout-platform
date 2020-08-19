import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxHalClientModule } from '@lagoshny/ngx-hal-client';
import { SproutContentModule } from '@savantly/ngx-sprout-content';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExternalConfigurationService } from '../environments/external-configuration.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ContentItemEmbeddedEditorComponent } from './content-item-embedded-editor/content-item-embedded-editor.component';
import { ContentTypeEmbeddedEditorComponent } from './content-type-embedded-editor/content-type-embedded-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContentItemEmbeddedEditorComponent,
    ContentTypeEmbeddedEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    NgxHalClientModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SproutContentModule
  ],
  providers: [{provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
