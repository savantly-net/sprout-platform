import { HalResponse, RestRepositoryService } from '../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Privilege extends HalResponse {
  id: string;
}

@Injectable()
export class PrivilegeService extends RestRepositoryService<Privilege>  {

  constructor(http: HttpClient) {
    super(http, '/api/repo/privileges');
  }

}
