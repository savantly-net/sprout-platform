import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Menu, MenuService } from '@savantly/ngx-menu';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'my-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppMenuComponent implements OnInit {
  @Input() menu: MatSidenav;
  menus: Observable<Menu[]>;

  constructor(private menuService: MenuService) {
    this.menus = this.menuService.getMenus()
  }

  ngOnInit() {
  }

}
