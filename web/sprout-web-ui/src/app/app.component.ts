import { Component } from '@angular/core';
import { ApiService } from './shared';

import '../style/app.scss';

function _window(): any {
  return window;
}

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = 'https://github.com/preboot/angular2-webpack';
  title: string;
  clientConfig: any = _window().clientConfig;

  constructor(private api: ApiService) {
    this.title = this.api.title;
  }
}
