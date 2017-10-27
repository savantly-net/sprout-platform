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
    const promise = new Promise((resolve, reject) => {

      const newPageContentPromises: Promise<PageContent>[] = [];
      contentItems.map((item) => {
        if (!item.webPage) {
          throw new Error('webPage property must be set');
        }
        const itemCopy = Object.assign({}, item);
        delete itemCopy.contentItems;
        newPageContentPromises.push(this.pageContentService.saveItem(itemCopy).toPromise());
      });

      Promise.all(newPageContentPromises).then((webPageContent: PageContent[]) => {
        // Loop through the saved items and merge the properties with the objects that were passed in originally
        webPageContent.map((newItem) => {
          contentItems.map((oldItem) => {
            if (newItem.placeHolderId === oldItem.placeHolderId) {
              oldItem = Object.assign(oldItem, newItem);
            }
          } );
        });
        const associationPromises = contentItems.map((pageContent) => {
          return this.pageContentService.associateContentItems(pageContent).toPromise();
        });
        Promise.all(associationPromises).then((pageContents) => {
          resolve(pageContents);
//          const headers = new HttpHeaders({'Content-Type': 'text/uri-list'});
//          const hrefs = pageContents.map((item) => {
//            return item._links.self.href;
//          });
//          this.http.post(webPage._links.contentItems.href, hrefs.join('\n')).subscribe((response) => {
//            resolve(response);
//          });
        });
      });

    });
    return promise;
  }

  constructor(http: HttpClient, private pageContentService: PageContentService) {
    super(http, '/api/webPages');
  }

}
