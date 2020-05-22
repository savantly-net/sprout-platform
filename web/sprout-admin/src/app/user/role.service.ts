import { HalResponse, RestRepositoryService } from '../spring-data/rest-repository.service';
import { Privilege } from './privilege.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class Role {
  id: string;
  privileges: Privilege[];
  _links: any;
  _embedded: any;
}

@Injectable()
export class RoleService {
  baseRepositoryPath = '/api/repo/roles';

  findAll(options?: any): Observable<any> {
    return this.http.get(this.baseRepositoryPath, options);
  }

  findOne(id: string, options?: any): Observable<any> {
    return this.http.get(this.baseRepositoryPath + '/' + id, options);
  }

  saveItem(item: Role): Observable<any> {
    console.info('attempting to save object: {}', item);
    if (item['new'] === false) {
      return this.http.put(this.baseRepositoryPath + '/' + item.id, item);
    } else {
      return this.http.post(this.baseRepositoryPath, item);
    }
  }

  putPrivileges(role: Role, refs: string[]) {
    const payload = refs.join('\n');
    const headers = new HttpHeaders({'Content-Type': 'text/uri-list'});
    return this.http.put(role._links.privileges.href, payload, {headers: headers});
  }

  deleteItem(item: Role): Observable<any> {
    return this.http.delete(this.baseRepositoryPath + '/' + item.id);
  }

  constructor(protected http: HttpClient) { }

}
