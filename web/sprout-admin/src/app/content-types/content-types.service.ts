import { ContentField } from '../content-field/content-field.service';
import { Identifiable, RestRepositoryService } from '../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export class ContentType implements Identifiable {
  id: string;
  name: string;
  description?: string;
  updateable: boolean;
  fields: ContentField[];
  icon?: string;
}

@Injectable()
export class ContentTypesService extends RestRepositoryService<ContentType> {

  constructor(http: HttpClient) {
    super(http, '/api/contentTypes');

  }

}
