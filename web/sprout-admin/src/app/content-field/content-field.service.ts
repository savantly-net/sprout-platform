import { RestRepositoryService } from '../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export class ContentField {
  id: string;
  name: string;
  displayName: string;
  sortOrder: number;
  fieldType: string;
  required: boolean;
}

@Injectable()
export class ContentFieldService extends RestRepositoryService<ContentField> {

  constructor(http: HttpClient) {
    super(http, '/api/contentFields');

  }

}
