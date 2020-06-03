import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class ServerPlugin {
  name: String;
  description: String;
  key: string;
  version: string;
  installed: boolean;
}

export class ServerPluginExecutionResponse {
  succeeded: boolean;
  code: number;
  message: string;
}

@Injectable()
export class ServerPluginsService {

  getPlugins() {
    return this.http.get('/api/plugins');
  }

  renderPlugin(key: string): Observable<any> {
    const headers = new HttpHeaders({'Accept': 'text/html'});
    const options = {headers: headers, responseType: 'text' as 'text'};
    return this.http.get('/api/plugins/' + key, options);
  }

  installPlugin(plugin: ServerPlugin): Observable<ServerPluginExecutionResponse> {
    return this.http.post('/api/plugins/install', {key: plugin.key})as Observable<ServerPluginExecutionResponse>;
  }

  uninstallPlugin(plugin: ServerPlugin): Observable<ServerPluginExecutionResponse>  {
    return this.http.post('/api/plugins/uninstall', {key: plugin.key})as Observable<ServerPluginExecutionResponse>;
  }

  constructor(private http: HttpClient) {}

}
