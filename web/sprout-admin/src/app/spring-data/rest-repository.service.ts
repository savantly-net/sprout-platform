import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface Identifiable {
  id: any;
}

export abstract class HalResponse implements Identifiable {
  id: any;
  _embedded: any;
  _links: any;
}

export abstract class RestRepositoryService<T extends HalResponse> {

  findAll(): Observable<any> {
    return this.http.get(this.baseRepositoryPath);
  }

  findOne(id: string): Observable<any> {
    return this.http.get(this.baseRepositoryPath + '/' + id);
  }

  saveItem(item: T): Observable<any> {
    if (item['new'] === false) {
      return this.http.put(this.baseRepositoryPath + '/' + item.id, item);
    } else {
      return this.http.post(this.baseRepositoryPath, item);
    }
  }

  deleteItem(item: T): Observable<any> {
    return this.http.delete(this.baseRepositoryPath + '/' + item.id);
  }

  constructor(protected http: HttpClient, private baseRepositoryPath: string) { }

}
