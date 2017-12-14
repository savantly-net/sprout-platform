import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders({'Accept': 'text/html'});
    const options = {headers: headers, responseType: 'text' as 'text'};
    return this.http.get(plugin.url, options);
  }

  constructor(private http: HttpClient) {
    this.plugins = this.http.get('rest/plugins');
  }

}
