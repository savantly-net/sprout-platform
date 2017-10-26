import { HalResponse, RestRepositoryService } from '../../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class PageContent extends HalResponse {
  contentItems: string[];
  placeHolderId: string;
}

@Injectable()
export class PageContentService extends RestRepositoryService<PageContent> {

  constructor(http: HttpClient) {
    super(http, '/api/webPageContents');
  }

}
