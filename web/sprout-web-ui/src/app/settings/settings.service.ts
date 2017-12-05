import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Setting {
  id: string;
  value: any;

  constructor(value: any) {
    this.value = value;
  }
}

@Injectable()
export class SettingsService {

  value: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(http: HttpClient) {
    http.get('/rest/client/config').subscribe((response: Setting[]) => {
      const config = {};
      response.map((setting: Setting) => {
        config[setting.id] = setting.value;
      });
      this.value.next(config);
    }, (err) => {
      console.warn('Ignore if running outside the Sprout platform: failed to retrieve config from server.', err);
      console.log('Using client configuration defaults');
    });
  }

}
