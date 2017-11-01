import { AppMenuService, AppMenu } from './app-menu.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Menu, MenuService } from '@savantly/ngx-menu';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'my-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {
  @Input() menu: MatSidenav;
  menus: Observable<Menu[]>;
  appMenus: AppMenu[];

  constructor(private menuService: MenuService, private appMenuService: AppMenuService) {
    this.menus = this.menuService.getMenus();
    this.appMenuService.getRootMenus().subscribe((response) => {
      this.appMenus = response._embedded.menus;
    }, (error) => {
      console.log(error);
      this.appMenus = [];
    });
  }

  ngOnInit() {
  }

}
