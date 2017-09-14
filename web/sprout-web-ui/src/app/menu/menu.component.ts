import { AuthenticationService } from '../security/authentication/authentication.service';
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
  authentication: any;

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
    authenticationService: AuthenticationService,
    menuService: MenuService) {
    this.menus = menuService.menus;
    this.authentication = authenticationService;
  }

  ngOnInit() {
  }

}
