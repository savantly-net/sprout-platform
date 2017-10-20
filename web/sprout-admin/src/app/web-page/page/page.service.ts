import { ContentItem } from '../../content-item/content-item.service';
import { HalResponse, RestRepositoryService } from '../../spring-data/rest-repository.service';
import { Layout } from '../layout/layout.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class Page extends HalResponse {
  name: string;
  description?: string;
  webPageLayout: Layout;
  contentItems: {key: string, value: ContentItem}[];
  home: boolean;
}

@Injectable()
export class PageService extends RestRepositoryService<Page> {

  getWebPageLayout(item: Page): Observable<any> {
    return this.http.get(item._links.webPageLayout.href);
  }

  constructor(http: HttpClient) {
    super(http, '/api/webPages');
  }

}
