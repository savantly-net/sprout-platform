import { ContentField } from '../content-field/content-field.service';
import { Identifiable, RestRepositoryService, HalResponse } from '../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


export class ContentType extends HalResponse {
  id: string;
  name: string;
  description?: string;
  updateable: boolean;
  fields: ContentField[];
  icon?: string;
}

@Injectable()
export class ContentTypesService extends RestRepositoryService<ContentType> {

  findContentFields(contentType: ContentType): Observable<any> {
    return this.http.get(contentType._links.fields.href);
  }

  deleteContentField(contentType: ContentType, field: ContentField): Observable<any> {
    return this.http.delete(contentType._links.fields.href + '/' + field.id);
  }

  constructor(http: HttpClient) {
    super(http, '/api/contentTypes');
  }

}
