import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SettingsService {

  value: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(http: HttpClient) {
    http.get('/rest/client/config').subscribe((response) => {
      this.value.next(response);
    }, (err) => {
      console.warn('Ignore if running outside the Sprout platform: failed to retrieve config from server.', err);
      console.log('Using client configuration defaults');
      this.value.next({
        siteTitle: 'Sprout App',
        siteDescription: 'My Awesome Sprout Application',
        siteUrl: window.location.href,
        keywords: 'sprout, spring, cms',
        siteName: 'Sprout site',
        siteImage: './img/sprout.png'
      });
    });
  }

}
