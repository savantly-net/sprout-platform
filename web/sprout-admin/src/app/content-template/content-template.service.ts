import { RestRepositoryService, Identifiable } from '../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class ContentTemplate implements Identifiable {
  id: string;
  'new': boolean;
  name: string;
  description: string;
  content: string;
  createdDate: any;
  createdBy: any;
  modifiedDate: any;
  modifiedBy: any;
}

@Injectable()
export class ContentTemplateService extends RestRepositoryService<ContentTemplate> {

  constructor(http: HttpClient) {
    super(http, '/api/contentTemplates');
  }

}
