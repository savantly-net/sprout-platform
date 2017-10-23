import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '@savantly/ngx-menu';

@Injectable()
export class AppMenuService {
  menus: Menu[];

  constructor(private http: HttpClient) {
    this.http.get('/api/menus').subscribe((response: any) => {
      this.menus = response._embedded.menus;
    });
  }

}
