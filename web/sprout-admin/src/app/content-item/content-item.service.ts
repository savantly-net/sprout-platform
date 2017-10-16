import { Identifiable, RestRepositoryService, HalResponse } from '../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class ContentItem extends HalResponse {
  id: string;
  name: string;
  description?: string;
  fieldValues: any;
  template: any;
  contentType: any;
}

@Injectable()
export class ContentItemService extends RestRepositoryService<ContentItem>  {

  getContentType(contentItem: ContentItem) {
    return this.http.get(contentItem._links.contentType.href);
  }

  getContentTemplate(contentItem: ContentItem) {
    return this.http.get(contentItem._links.template.href);
  }

  constructor(http: HttpClient) {
    super(http, '/api/contentItems');
  }

}
