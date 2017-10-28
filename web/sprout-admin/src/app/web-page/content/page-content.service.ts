import { HalResponse, RestRepositoryService } from '../../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class PageContent extends HalResponse {
  contentItems: string[];
  placeHolderId: string;
  webPage?: string;
}

@Injectable()
export class PageContentService extends RestRepositoryService<PageContent> {

  associateContentItems(pageContent: PageContent): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'text/uri-list'});
    return this.http.post(pageContent._links.contentItems.href, pageContent.contentItems.join('\n'), {headers: headers});
  }

  constructor(http: HttpClient) {
    super(http, '/api/webPageContents');
  }

}
