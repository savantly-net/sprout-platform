import { RestRepositoryService, HalResponse } from '../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class AppMenu extends HalResponse {
    id: string;
    displayText: string;
    isPublic: boolean;
    roles: string[];
    items: AppMenu[];
    position: number;
    disabled: boolean;
    icon: string;
    parent: AppMenu;
}

@Injectable()
export class AppMenuService  extends RestRepositoryService<AppMenu> {

  getRootMenus(): Observable<AppMenu> {
    return this.http.get('/api/menus/search/findRootMenus?projection=inlineMenuItems');
  }

  addToItemList(parentItem: AppMenu, item: AppMenu): Observable<AppMenu> {
    const headers = new HttpHeaders({'Content-Type': 'text/uri-list'});
    const observable = new Observable<AppMenu>((observer) => {
      item.parent = parentItem._links.self.href;
      this.saveItem(item).subscribe((response) => {
        observer.next(<AppMenu>response);
//        this.http.post(parentItem._links.items.href, response._links.self.href, {headers: headers}).subscribe((savedChild) => {
//          observer.next(<AppMenu>savedChild);
//        });
      });
    });

    return observable;
  }

  getChildren(item: AppMenu): Observable<HalResponse> {
    return this.http.get(item._links.items.href);
  }

  removeChild(parentItem: AppMenu, item: AppMenu) {
    return this.http.delete('/api/menus/' + parentItem.id + '/items/' + item.id);
  }

  getChildrenByItemId(itemId: string): Observable<HalResponse> {
    return this.http.get('/api/menus/' + itemId + 'items');
  }

  constructor(http: HttpClient) {
    super(http, '/api/menus');
  }

}
