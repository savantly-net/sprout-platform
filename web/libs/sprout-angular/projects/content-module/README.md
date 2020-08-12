# ContentModule

Provides Angular components and services to consumer the Sprout Content Module.  
The HAL connectivity is provided by - https://github.com/lagoshny/ngx-hal-client


## Quickstart  

`npm install @savantly/ngx-sprout-content`  

Or all peer dependencies -  
`npm i @angular/cdk @angular/common @angular/flex-layout @angular/material @lagoshny/ngx-hal-client @savantly/ngx-jsoneditor ng2-ckeditor ngx-markdown-editor rxjs`

Add ckeditor module to your index.html -  
`<script src="https://cdn.ckeditor.com/4.14.1/standard/ckeditor.js"></script>`

Provide a configuration for the Spring Data Rest endpoint.  

```
import {Injectable} from '@angular/core';
import {ExternalConfigurationHandlerInterface, ExternalConfiguration} from '@lagoshny/ngx-hal-client';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ExternalConfigurationService implements ExternalConfigurationHandlerInterface {

  getProxyUri(): string {
    return 'http://proxy.url/api/';
  }

  getRootUri(): string {
    return 'https://serviceip.tomcat:8080/APP/';
  }

  getHttp(): HttpClient {
    return this.http;
  }

  constructor(private http: HttpClient) {
  }

  getExternalConfiguration(): ExternalConfiguration {
    return null;
  }

  setExternalConfiguration(externalConfiguration: ExternalConfiguration) {
  }
}
```

And import in your app module -  
- NgxHalClientModule
- SproutContentModule

```
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxHalClientModule} from '@lagoshny/ngx-hal-client';
import {SproutContentModule} from '@savantly/ngx-sprout-content'

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {ExternalConfigurationService} from './ExternalConfigurationService'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxHalClientModule.forRoot(),
    SproutContentModule
  ],
  providers: [
    {provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


# Contributing

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Code scaffolding

Run `ng generate component component-name --project content-module` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project content-module`.
> Note: Don't forget to add `--project content-module` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build content-module` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build content-module`, go to the dist folder `cd dist/content-module` and run `npm publish`.

## Running unit tests

Run `ng test content-module` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
