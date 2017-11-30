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

  clearContentItems(webPage: Page): Promise<any> {
    const lastPromise = new Promise((resolve, reject) => {
      this.http.get(webPage._links.contentItems.href).subscribe(webPageContentItems => {
        const promises = (webPageContentItems as HalResponse)._embedded.webPageContents.map((webPageContentItem) => {
          return this.http.delete(webPageContentItem._links.self.href).toPromise();
        });
        Promise.all(promises).then((result) => {
          resolve(result);
        });
      });
    });
    return lastPromise;
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
          if (pageContent.contentItems.length > 0) {
            return this.pageContentService.associateContentItems(pageContent).toPromise();
          } else {
            return new Promise((resolve2, reject2) => {
              resolve2([]);
            });
          }
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
