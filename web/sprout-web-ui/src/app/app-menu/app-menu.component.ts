import { AppMenuService, AppMenu } from './app-menu.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Menu, MenuService } from '@savantly/ngx-menu';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'my-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {
  @Input() menu: MatSidenav;
  menus: Observable<Menu[]>;
  appMenus: AppMenu[];

  navigate(url: string) {
    if (url !== null) {
      this.router.navigateByUrl(url);
    }
  }

  constructor(private menuService: MenuService, private appMenuService: AppMenuService, private router: Router) {
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
