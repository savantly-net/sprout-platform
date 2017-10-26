import { ContentItem } from '../../content-item/content-item.service';
import { HalResponse, RestRepositoryService } from '../../spring-data/rest-repository.service';
import { PageContentService, PageContent } from '../content/page-content.service';
import { Layout } from '../layout/layout.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class Page extends HalResponse {
  name: string;
  description?: string;
  webPageLayout: Layout;
  contentItems: {key: string, value: any}[];
  home: boolean;
}

@Injectable()
export class PageService extends RestRepositoryService<Page> {

  getWebPageLayout(item: Page): Observable<any> {
    return this.http.get(item._links.webPageLayout.href);
  }

  saveContentItems(webPage: Page, contentItems: PageContent[]): Promise<any> {
    // const headers = new HttpHeaders({'Content-Type': 'text/uri-list'});
    // const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const promise = new Promise((resolve, reject) => {

      const newPageContentPromises: Promise<PageContent>[] = [];
      contentItems.map((item) => {
        newPageContentPromises.push(this.pageContentService.saveItem(item).toPromise());
      });

      Promise.all(newPageContentPromises).then((webPageContent: PageContent[]) => {
        const headers = new HttpHeaders({'Content-Type': 'text/uri-list'});
        const hrefs = webPageContent.map((item) => {
          return item._links.self.href;
        });
        this.http.put(webPage._links.contentItems.href, hrefs.join('\n')).subscribe((response) => {
          resolve(response);
        });
      });

    });
    return promise;
  }

  constructor(http: HttpClient, private pageContentService: PageContentService) {
    super(http, '/api/webPages');
  }

}
