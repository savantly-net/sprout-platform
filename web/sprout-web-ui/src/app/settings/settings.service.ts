import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Setting {
  id: string;
  value: string;
}
export class Settings {
  siteTitle: Setting;
  siteDescription: Setting;
  siteUrl: Setting;
  keywords: Setting;
  siteName: Setting;
  siteImage: Setting;
}

@Injectable()
export class SettingsService {

  value: Promise<Settings>;

  constructor(http: HttpClient) {
    this.value = new Promise((resolve) => {
        http.get('/rest/client/config').subscribe((response: Settings) => {
          resolve(response);
        }, (err) => {
          console.warn('Ignore if running outside the Sprout platform: failed to retrieve config from server.', err);
          console.log('Using client configuration defaults');
          resolve({
            siteTitle: 'Sprout App',
            siteDescription: 'My Awesome Sprout Application',
            siteUrl: window.location.href,
            keywords: 'sprout, spring, cms',
            siteName: 'Sprout site',
            siteImage: './img/sprout.png'
          });
        });
    });
  }

}
