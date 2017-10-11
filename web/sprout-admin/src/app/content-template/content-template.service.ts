import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class ContentTemplate {
  id: string;
  'new': boolean;
  name: string;
  content: string;
  createdDate: any;
  createdBy: any;
  modifiedDate: any;
  modifiedBy: any;
}

@Injectable()
export class ContentTemplateService {

  findAll(): Observable<any> {
    return this.http.get('/api/contentTemplates');
  }

  findOne(id: string): Observable<any> {
    return this.http.get('/api/contentTemplates/' + id);
  }

  saveItem(item: ContentTemplate): Observable<any> {
    if (item['new'] === false) {
      return this.http.put('/api/contentTemplates/' + item.id, item);
    } else {
      return this.http.post('/api/contentTemplates', item);
    }
  }

  deleteItem(item: ContentTemplate): Observable<any> {
    return this.http.delete('/api/contentTemplates' + item.id);
  }

  constructor(private http: HttpClient) {

  }

}
