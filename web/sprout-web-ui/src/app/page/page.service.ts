import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PageService {

  getPage(id: string): Observable<string> {
    return this.http.get('rest/pages/' + id, {responseType: 'text'});
  }

  getHomePage(): Observable<string> {
    return this.http.get('rest/pages/home', {responseType: 'text'});
  }

  constructor(private http: HttpClient) { }

}
