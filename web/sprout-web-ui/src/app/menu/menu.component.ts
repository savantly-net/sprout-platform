import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService, Menu } from './menu.service';
import { AuthenticationService } from '../authentication/authentication.service';
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

  constructor(menuService: MenuService,
    authenticationService: AuthenticationService) {
    this.menus = menuService.menus;
    this.authentication = authenticationService;
  }

  ngOnInit() {
  }

}
