import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerPluginsService {

  _plugins: any[];

  getPlugins(): Observable<any> {
    return this.http.get('rest/plugins');
  }

  renderPlugin(name: string): Observable<any> {
    return this.http.get(this._plugins[name].url);
  }

  constructor(private http: HttpClient) {
    this.getPlugins().subscribe((plugins) =>  {
      this._plugins = plugins;
      console.log(plugins);
    });
  }

}
