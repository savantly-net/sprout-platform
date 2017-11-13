import { HalResponse, RestRepositoryService } from '../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Role extends HalResponse {
  authority: string;
}

@Injectable()
export class RoleService extends RestRepositoryService<Role> {

  constructor(http: HttpClient) {
    super(http, '/api/roles');
  }

}
