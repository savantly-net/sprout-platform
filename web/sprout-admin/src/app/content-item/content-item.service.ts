import { Identifiable, RestRepositoryService, HalResponse } from '../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContentTemplate } from '../content-template/content-template.service';

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

  setContentTemplate(contentItem: ContentItem, template: ContentTemplate) {
    const headers = new HttpHeaders({'Content-Type': 'text/uri-list'});
    return this.http.put(contentItem._links.template.href, template._links.self.href, {headers: headers});
  }

  constructor(http: HttpClient) {
    super(http, '/api/repo/contentItems');
  }

}
