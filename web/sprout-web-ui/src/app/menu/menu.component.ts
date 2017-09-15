import { SecurityService } from '../security/security.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService, Menu } from './menu.service';
import { MdMenuTrigger } from '@angular/material';

@Component({
  selector: 'my-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;
  menus: Menu[];
  security: SecurityService;

  openMenu() {
    this.trigger.openMenu();
  }

  noop() {

  }

  closeMenu() {
    this.trigger.closeMenu();
  }

  doMenuItemCallback(subitem, $event) {
    if (subitem.callback) {
      subitem.callback($event);
    } else {
      console.warn('no callback defined');
    }
  };

  constructor(
    securityService: SecurityService,
    menuService: MenuService) {
    this.menus = menuService.getMenus();
    this.security = securityService;
  }

  ngOnInit() {
  }

}
