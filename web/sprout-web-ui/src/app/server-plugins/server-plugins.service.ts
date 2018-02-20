import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class ServerPlugin {
  name: String;
  key: string;
  welcomeUrl: string;
}

@Injectable()
export class ServerPluginsService {

  plugins: Observable<any>;

  renderPlugin(plugin: ServerPlugin, params?): Observable<any> {
    let method = 'get';
    let path = plugin.welcomeUrl;
    if (params) {
      if (params['method']) {
        method = params['method'];
      }
      if (params['path']) {
        path = path + params['path'];
      }
    }
    const headers = new HttpHeaders({'Accept': 'text/html'});
    const options = {headers: headers, responseType: 'text' as 'text'};
    return this.http[method](path, options);
  }

  constructor(private http: HttpClient) {
    this.plugins = this.http.get('rest/plugins');
  }

}
