import { HalResponse, RestRepositoryService } from '../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class Role {
  authority: string;
  _links: any;
  _embedded: any;
}

@Injectable()
export class RoleService {
  baseRepositoryPath = '/api/roles';

  findAll(options?: any): Observable<any> {
    return this.http.get(this.baseRepositoryPath, options);
  }

  findOne(id: string, options?: any): Observable<any> {
    return this.http.get(this.baseRepositoryPath + '/' + id, options);
  }

  saveItem(item: Role): Observable<any> {
    console.info('attempting to save object: {}', item);
    if (item['new'] === false) {
      return this.http.put(this.baseRepositoryPath + '/' + item.authority, item);
    } else {
      return this.http.post(this.baseRepositoryPath, item);
    }
  }

  deleteItem(item: Role): Observable<any> {
    return this.http.delete(this.baseRepositoryPath + '/' + item.authority);
  }

  constructor(protected http: HttpClient) { }

}
