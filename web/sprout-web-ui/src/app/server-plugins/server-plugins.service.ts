import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class ServerPlugin {
  name: String;
  key: string;
  url: string;
}

@Injectable()
export class ServerPluginsService {

  plugins: Observable<any>;

  renderPlugin(plugin: ServerPlugin): Observable<any> {
    return this.http.get(plugin.url);
  }

  constructor(private http: HttpClient) {
    this.plugins = this.http.get('rest/plugins');
  }

}
