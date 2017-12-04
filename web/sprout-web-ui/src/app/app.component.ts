import { Component } from '@angular/core';
import { ApiService } from './shared';

import '../style/app.scss';
import { SettingsService } from './settings/settings.service';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = 'https://github.com/preboot/angular2-webpack';
  title: string;
  clientConfig: any;

  constructor(private api: ApiService, settingsService: SettingsService) {
    this.title = this.api.title;
    this.clientConfig = settingsService.value.getValue();
  }
}
