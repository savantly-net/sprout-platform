import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class ServerPlugin {
  name: String;
  description: String;
  key: string;
  welcomeUrl: string;
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
    return this.http.get('rest/plugins');
  }

  renderPlugin(plugin: ServerPlugin): Observable<any> {
    const headers = new HttpHeaders({'Accept': 'text/html'});
    const options = {headers: headers, responseType: 'text' as 'text'};
    return this.http.get(plugin.welcomeUrl, options);
  }

  installPlugin(plugin: ServerPlugin): Observable<ServerPluginExecutionResponse> {
    return this.http.post('rest/plugins/install', {key: plugin.key});
  }

  uninstallPlugin(plugin: ServerPlugin): Observable<ServerPluginExecutionResponse>  {
    return this.http.post('rest/plugins/uninstall', {key: plugin.key});
  }

  constructor(private http: HttpClient) {}

}
