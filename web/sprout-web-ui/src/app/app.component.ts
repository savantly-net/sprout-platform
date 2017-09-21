import { Component } from '@angular/core';
import { ApiService } from './shared';

import '../style/app.scss';
import { SecurityService } from '@savantly/ngx-security';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = 'https://github.com/preboot/angular2-webpack';
  title: string;
  security: SecurityService;

  constructor(
    private api: ApiService,
    security: SecurityService) {
    this.security = security;
    this.title = this.api.title;
  }
}
