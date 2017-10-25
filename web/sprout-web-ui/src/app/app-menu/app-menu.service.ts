import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '@savantly/ngx-menu';
import { Observable } from 'rxjs/Observable';

export class AppMenu {
    id: string;
    displayText: string;
    _public: boolean;
    roles: string[];
    items: AppMenu[];
    position: number;
    disabled: boolean;
    icon: string;
    url: string;
    new: boolean;
}

@Injectable()
export class AppMenuService {
  menus: Menu[];

  getRootMenus(): Observable<any> {
    return this.http.get('/api/menus/search/findRootMenus?projection=inlineMenuItems');
  }

  constructor(private http: HttpClient) {
    this.getRootMenus().subscribe((response) => {
      this.menus = response._embedded.menus;
    });
  }

}
